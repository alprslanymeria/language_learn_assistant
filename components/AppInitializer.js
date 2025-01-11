"use client"

import { encrypt } from "@/app/lib/crypto";
import FlagComponent from "@/components/FlagComponent";
import InfoMessageComponent from "@/components/InfoMessageComponent";
import NavbarComponent from "@/components/NavbarComponent";
import { userStore } from "@/store/userStore"
import { useEffect } from "react";

export default function AppInitializer({ userr }) {

    const {setUser} = userStore();

    useEffect(() => {

        if(userr != null)
        {
            const encryptedUserId = encrypt(userr.userId);
            const encryptedEmail = encrypt(userr.email);
            setUser({ userId: encryptedUserId, email: encryptedEmail });
        }
        
    }, [userr , setUser])

    return(
        <>
            <div className="container max-w-screen-xl mx-auto px-4">
                <NavbarComponent></NavbarComponent>
            </div>
            <InfoMessageComponent message="Please choose which language you would like to learn"></InfoMessageComponent>
            <FlagComponent></FlagComponent>
        </>
    )

}