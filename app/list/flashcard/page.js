"use client"

import { GetAllCategories } from "@/actions/Flashcard";
import { GetAllWords } from "@/actions/word";
import { decrypt } from "@/app/lib/crypto";
import { userStore } from "@/store/userStore";
import { useEffect, useState } from "react";

export default function ListFlashcard(){

    //STATE
    const [categoryData, setCategoryData] = useState([]);
    const [worData, setWordData] = useState([]);
    const [error, setError] = useState("");

    //STORE
    const {user} = userStore();
    const userId = decrypt(user.userId)

    useEffect(() => {

        const GetCategories = async () => {

            const response = await GetAllCategories(userId)

            if(response.status == 200) setCategoryData(response.data)

            if(response.status == 500) setError(response.message)
        }

        GetCategories()

    }, [])

    useEffect(() => {

        const GetWords = async () => {
            
            const response = await GetAllWords(userId)
            
            if(response.status == 200) setWordData(response.data)

            if(response.status == 500) setError(response.message)
        }

        GetWords()

    }, [])

    return (
        <>
        </>
    );
}