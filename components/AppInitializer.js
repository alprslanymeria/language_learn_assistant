"use client"

import FlagComponent from "@/components/FlagComponent";
import InfoMessageComponent from "@/components/InfoMessageComponent";
import NavbarComponent from "@/components/NavbarComponent";
import { userStore } from "@/store/userStore"
import { useEffect } from "react";

export default function AppInitializer({ userr }) {

    const { user, setUser, setUserId, setEmail } = userStore();

    useEffect(() => {

        if(userr != null)
        {
            setUser({ userId: userr.id, email: userr.email });
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