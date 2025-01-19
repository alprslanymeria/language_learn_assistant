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
import DeckSvg from "@/components/svg/DeckSvg";
import FilmSvg from "@/components/svg/FilmSvg";
import BookSvg from "@/components/svg/BookSvg";

export default function Detail()
{
    // GET PARAMS VIA QUERY
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    // STATES
    const [error, setError] = useState("");
    const [image, setImage] = useState("");
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
                    setImage(response.imagePath)
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
                    setImage(response.imagePath)
                }
    
                if(response.status == 500)
                    setError(response.message)
            }
        }

        GET()

    }, [id])

    return (
        
        <div className="container max-w-screen-xl mx-auto flex flex-col md:flex-row px-4 gap-10">
            <div className="relative h-[450px] flex-none w-[300px] self-center md:self-start">

                {info.practice == 'flashcards'
                 ? <DeckSvg language={info.language} text={image}></DeckSvg>
                 : info.practice == 'listening'
                 ? <FilmSvg imagePath={image} index={0}></FilmSvg>
                 : <BookSvg imagePath={image}></BookSvg>}
                 
            </div>
            
            <div className="flex-[2]">
                {info.practice == "reading" || info.practice == "writing" ? <SentencesTable/> :
                info.practice == "flashcards" ? <WordTable/> : <p></p>}
            </div>
        </div>
    );
}