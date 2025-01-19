"use client"

import { GetAllFilms } from "@/actions/film";
import { decrypt } from "@/app/lib/crypto";
import { userStore } from "@/store/userStore";
import { useEffect, useState } from "react";

export default function ListFilm() {

    //STATE
    const [data, setData] = useState([]);
    const [error, setError] = useState("")

    //STORE
    const {user} = userStore();
    const userId = decrypt(user.userId)

    useEffect(() => {

        const GET = async () => {

            const response = await GetAllFilms(userId)

            if(response.status == 200) setData(response.data)
            
            if(response.status == 500) setError(response.message)
        }

    }, [])

    return(

        <>
        </>
    );
}