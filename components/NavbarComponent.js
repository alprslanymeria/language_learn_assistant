"use client"

// REACT & NEXT
import { useEffect, useState } from "react";
// 3RD PARTY
import { decrypt } from "@/app/lib/crypto";
import { neuton } from "@/public/fonts"
// STORE
import { userStore } from "@/store/userStore"
// COMPONENTS
import Email from "@/components/EmailComponent";

export default function NavbarComponent() {


    const { user} = userStore();
    const [email, setLocalEmail] = useState("");
    

    useEffect(() => {

        if(user.email != "")
        {
            setLocalEmail(decrypt(user.email))
        }

        if(user.email == "")
        {
            setLocalEmail("empty")
        }
            
    }, [user])

    return (

        <nav className="bg-[#F4CC15] px-5 py-5 my-5 rounded-lg">
            <div className="flex items-center justify-between">
                <p className={`text-lg sm:text-3xl md:text-5xl font-normal tracking-widest text-black text-left ${neuton.className}`}>
                    LANGUAGE LEARN ASSISTANT
                </p>
                <Email email={email}></Email>
            </div>
        </nav>
    )
}