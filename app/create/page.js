"use client"

// REACT & NEXT
import { useEffect , useState } from "react";
import { useSearchParams } from "next/navigation";
// ACTIONS
import { GetBooks } from "@/actions/book";
import { GetFilms } from "@/actions/film";
// COMPONENTS
import SliderComponent from "@/components/SliderComponent";
// STORE
import sentenceStore from "@/store/sentenceStore";
import wordStore from "@/store/wordStore";
import { sessionStore } from "@/store/sessionStore";
import { decrypt } from "../lib/crypto";
import { userStore } from "@/store/userStore";
import { GetCategories } from "@/actions/Flashcard";

export default function Create() {

    // GET PARAMS VIA QUERY
    const searchParams = useSearchParams();
    const practice = searchParams.get("practice")
    const language = searchParams.get("language")
    
    // STATES
    const [data, setData] = useState([])
    const [error, setError] = useState("")

    //STORE
    const {setSelectedText, setInputText, setTranslatedText, setShowTranslation, setSentences} = sentenceStore();
    const {setWords, setIndex} = wordStore();
    const {user} = userStore();
    const userId = decrypt(user.userId);

    useEffect(() => {   

        // CLEAR STATES
        setSelectedText("");
        setInputText("");
        setTranslatedText("");
        setShowTranslation(false);
        setSentences([]);
        setWords([])
        setIndex(0)


        const GET = async () => {

            if(practice == 'reading' || practice == 'writing')
            {
                const response = await GetBooks(language, practice, userId)

                if(response.status == 200)
                    setData(response.data)

                if(response.status == 500)
                    setError("")
            }

            if(practice == 'listening')
            {
                const response = await GetFilms(language, userId)

                if(response.status == 200)
                    setData(response.data)

                if(response.status == 500)
                    setError("")
            }

            if(practice == 'flashcards')
            {
                const response = await GetCategories(language, userId)

                if(response.status == 200) setData(response.data)

                if(response.status == 500) setError("")
            }
        }

        GET()

    }, [])

    return (
        <>
            <SliderComponent data={data} practice={practice} language={language}/>
        </>
    )
}