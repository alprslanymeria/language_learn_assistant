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
    const {setWords} = wordStore();

    useEffect(() => {   

        // CLEAR STATES
        setSelectedText("");
        setInputText("");
        setTranslatedText("");
        setShowTranslation(false);
        setSentences([]);
        setWords([])

        const GET = async () => {

            if(practice == 'reading' || practice == 'writing')
            {
                const response = await GetBooks(language, practice)

                if(response.status == 200)
                    setData(response.data)

                if(response.status == 500)
                    setError("")
            }

            if(practice == 'listening')
            {
                const response = await GetFilms(language)

                if(response.status == 200)
                    setData(response.data)

                if(response.status == 500)
                    setError("")
            }

            if(practice == 'flashcards')
            {
                setData([
                    "Verb",
                    "Adjective",
                    "Noun",
                    "Adverb"
                ])
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