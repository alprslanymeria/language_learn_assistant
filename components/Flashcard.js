"use client"

import { sessionStore } from "@/store/sessionStore";
import { useEffect, useState } from "react";
import NavbarComponent from "@/components/NavbarComponent";
import TurkishHalf from "./svg/turkishHalf";
import TurkishFull from "./svg/turkishFull";
import EnglishHalf from "./svg/englishHalf";
import EnglishFull from "./svg/englishFull";
import GermanHalf from "./svg/germanHalf";
import GermanFull from "./svg/germanFull";
import RussianHalf from "./svg/russianHalf";
import WordTable from "./wordTable";

export default function Flashcard({words}) {

    const {info} = sessionStore()
    const [isEnglish , setIsEnglish] = useState(false)
    const [isTurkish , setIsTurkish] = useState(false)
    const [isGerman , setIsGerman] = useState(false)
    const [isRussian , setIsRussian] = useState(false)
    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
        info.imagePath.includes("english") ? setIsEnglish(true) : setIsEnglish(false);
        info.imagePath.includes("turkish") ? setIsTurkish(true) : setIsTurkish(false);
        info.imagePath.includes("german") ? setIsGerman(true) : setIsGerman(false);
        info.imagePath.includes("russian") ? setIsRussian(true) : setIsRussian(false);
    }, [])
    
    return (

        <>
            <div className="container max-w-screen-xl mx-auto px-4">
                <NavbarComponent />
            </div>
            <div className="container flex justify-between max-w-screen-xl mx-auto px-4">

                <div className="flex justify-between items-end h-[600px]">

                    {isEnglish ? (isShow ? <EnglishHalf /> : <EnglishFull />) :
                        isTurkish ? (isShow ? <TurkishHalf /> : <TurkishFull />) :
                            isGerman ? (isShow ? <GermanHalf /> : <GermanFull />) :
                                isRussian ? (isShow ? <RussianHalf /> : <RussianHalf />) : null}

                </div>

                {/* <div className="flex flex-col items-start space-y-4">
                    <button onClick={() => setIsShow(!isShow)} className="px-4 py-2 bg-blue-500 text-white rounded">Buton 1</button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded">Buton 2</button>
                </div> */}
                <WordTable/>

            </div>
        </>

    );
}