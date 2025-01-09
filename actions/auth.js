"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/app/lib/prisma"
import { v4 as uuidv4 } from 'uuid';
import { hashPassword, comparePassword } from "@/app/utils/utils";
import { createSession , deleteSession } from "@/app/lib/session";

const signupSchema = z.object({
  email: z.string().email({ message: "Hatalı E-mail formatı girdiniz" }).trim(),
  password: z
    .string()
    .min(8, { message: "Şifre minimum 8 karakter uzunluğunda olmalıdır" })
    .trim(),
});

const loginSchema = z.object({
    email: z.string().email({ message: "Hatalı E-mail formatı girdiniz" }).trim(),
    password: z
      .string()
      .min(8, { message: "Şifre minimum 8 karakter uzunluğunda olmalıdır" })
      .trim(),
  });

export async function signup(prevState, formData)
{

    const result = signupSchema.safeParse(Object.fromEntries(formData));

    if(!result.success)
    {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    const { email, password} = result.data;
    const hashedPassword = await hashPassword(password);
    const returnUrl = formData.get("returnUrl");
    const userId = uuidv4();

    // Check if user already exists
    const hasUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

    if (hasUser != null) {
        return {
            errors: {
              email: ["Bu e-mail adresi ile kayıtlı bir kullanıcı zaten var"],
            },
          };
    }

    // Save user to database
    const newUser = await prisma.user.create({
        data: {
          userId: userId,
          email: email,
          password: hashedPassword,
        },
      });

    if(returnUrl === "")
        redirect("/login");

    redirect(`/login?returnUrl=${returnUrl}`);
}

export async function login(prevState, formData) {
  
    const result = loginSchema.safeParse(Object.fromEntries(formData));

    if(!result.success)
    {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    const { email, password} = result.data;
    const returnUrl = formData.get("returnUrl");

    // Check user credentials
    const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

    if (user == null) 
      {
        return {
            errors: {
              email: ["Invalid email or password"],
            },
          };
      }

    const isPasswordMatch = await comparePassword(password, user.password);
    
    if (!isPasswordMatch) 
      {
        return {
            errors: {
              email: ["Invalid email or password"],
            },
          };
      }


    if (user == null || !isPasswordMatch) 
    {
      return {
          errors: {
            email: ["Invalid email or password"],
          },
        };
    }

  await createSession(user.userId);

  if(returnUrl == "")
    redirect("/");

  redirect(`${returnUrl}`);
}


export async function logout() {
  await deleteSession();
  redirect("/login");
}