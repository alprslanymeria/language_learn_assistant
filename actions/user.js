"use server"

import { prisma } from "@/app/lib/prisma"

export async function GetUserById(userId){

    try {
        
        const user = await prisma.user.findUnique({
            where: {
              userId: userId,
            },
          });

        return {data: user, status: 200};

    } catch (error) {
        
        return {data: null, status: 500, message: "User bilgisi çekilrken bir hata oluştu", details: error.message};
    }
}