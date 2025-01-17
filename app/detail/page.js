"use client"

// REACT & NEXT
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
// ACTIONS
import { GetSentencesById } from "@/actions/sentences";
import { GetWordsById } from "@/actions/wordSession";
// COMPONENTS
import SentencesTable from "@/components/SentencesTable";
import WordTable from "@/components/wordTable";
// STORE
import { sessionStore } from "@/store/sessionStore";
import sentenceStore from "@/store/sentenceStore";
import wordStore from "@/store/wordStore";

export default function Detail()
{
    // GET PARAMS VIA QUERY
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    // STATES
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    // STORE
    const {info, setImagePath} = sessionStore();
    const {setSentences} = sentenceStore();
    const {setWords} = wordStore();

    useEffect(() => {

        const GET = async () => {

            if(info.practice == "reading" || info.practice == "writing")
            {
                const response = await GetSentencesById(id)

                if(response.status == 200)
                {
                    setSentences(response.data)
                    setImagePath(response.imagePath)
                }
    
                if(response.status == 500)
                    setError(response.message)
            }

            if(info.practice == "flashcards")
            {
                const response = await GetWordsById(id)

                if(response.status == 200)
                {
                    setWords(response.data)
                    setImagePath(response.imagePath)
                }
    
                if(response.status == 500)
                    setError(response.message)
            }
        }

        GET()

    }, [id])

    return(
        
        <>
            <div className="relative h-[450px] w-[300px] mx-auto">
                {info.imagePath == "" ? <p></p>
                    :
                    <Image 
                        src={info.imagePath}
                        fill
                        alt="Image"
                        className="rounded-lg"
                        sizes="(max-width: 768px) 100vw, 50vw">
                    </Image>
                }
                
            </div>
            
            {info.practice == "reading" || info.practice == "writing" ? <SentencesTable/> :
             info.practice == "flashcards" ? <WordTable/> : <p></p>}
        </>
    );
}