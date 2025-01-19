"use client"

import { GetAllBooks} from "@/actions/book";
import { decrypt } from "@/app/lib/crypto";
import { userStore } from "@/store/userStore";
import { useEffect, useState } from "react";

export default function ListBook() {
    
    //STATE
    const [data, setData] = useState([])
    const [error, setError] = useState("")

    //STORE
    const {user} = userStore();
    const userId = decrypt(user.userId)


    useEffect(() => {

        const GET = async () => {

            const response = await GetAllBooks(userId)

            if(response.status == 200) setData(response.data)

            if(response.status == 500) setError(response.message)
        }

        GET()
        
    }, [])

    //languageId, bookName, image, source_path, 
    
    return (

        <>
            
        </>
    );
}