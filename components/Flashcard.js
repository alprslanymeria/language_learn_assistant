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
import wordStore from "@/store/wordStore";
import { userStore } from "@/store/userStore";
import { decrypt } from "@/app/lib/crypto";
import { GetOldSessions, SaveOldSession } from "@/actions/oldSessions";
import { SaveWords } from "@/actions/wordSession";
import { DeleteLiveSession } from "@/actions/liveSession";
import oldSessionStore from "@/store/oldSessionStore";
import { useRouter } from "next/navigation";

export default function Flashcard({data}) {

    const router = useRouter();

    const {setOldSessions} = oldSessionStore();
    const {info} = sessionStore()
    const {user} = userStore();
    const userId = decrypt(user.userId)
    const oldSessionId = decrypt(info.sessionId)
    const {words, setWords} = wordStore();
    const [isEnglish , setIsEnglish] = useState(false)
    const [isTurkish , setIsTurkish] = useState(false)
    const [isGerman , setIsGerman] = useState(false)
    const [isRussian , setIsRussian] = useState(false)
    const [isShow, setIsShow] = useState(true)
    const [showNextButton, setShowNextButton] = useState(false)
    const [showCloseButton, setShowCloseButton] = useState(false)

    const [text1, setText1] = useState("")
    const [text2, setText2] = useState("")
    const [index, setIndex] = useState(0)

    useEffect(() => {

        setText1(data.at(index).wordToLearn)
        setText2(data.at(index).translatedWord)
        info.imagePath.includes("english") ? setIsEnglish(true) : setIsEnglish(false);
        info.imagePath.includes("turkish") ? setIsTurkish(true) : setIsTurkish(false);
        info.imagePath.includes("german") ? setIsGerman(true) : setIsGerman(false);
        info.imagePath.includes("russian") ? setIsRussian(true) : setIsRussian(false);
    }, [])

    

    const handleYesClick = () => {
        
        setIndex(index+1)
        setIsShow(!isShow)
        setShowNextButton(true)

        const word = {
            oldSessionId: oldSessionId,
            word: text1,
            answer: text2,
            status: true
        }
        setWords([...words, word])

    }

    const handleNoClick = () => {
        
        setIndex(index+1)
        setIsShow(!isShow)
        setShowNextButton(true)

        const word = {
            oldSessionId: oldSessionId,
            word: text1,
            answer: text2,
            status: false
        }
        setWords([...words, word])
    }

    const handleNextClick = () => {

        if(index == data.length) {

            alert("All words are done")
            setShowCloseButton(true)
            return
        }

        setText1(data.at(index).wordToLearn)
        setText2(data.at(index).translatedWord)

        setIsShow(!isShow)
        setShowNextButton(false)
    }

    const handleCloseClick = async () => {

        //SAVE TO OLDSESSIONS TABLE
        const row = {
            oldSessionId: oldSessionId,
            userId: userId,
            language: info.language,
            practice: info.practice,
            rate: 0,
            imagePath: info.imagePath
        }
        const result = await SaveOldSession(row)

        if(result.status != 200)
        {
            alert(result.details)
            return
        }

        //SAVE TO SENTENCES TABLE
        const response = await SaveWords(words)

        if(response.status != 200)
        {
            alert(response.details)
            return
        }

        //DELETE LİVE SESSION FROM TABLE
        const deleteResult = await DeleteLiveSession(userId, oldSessionId)

        if(deleteResult.status != 200)
        {
            alert(deleteResult.message)
            return
        }

        //UPDATE OLDSESSIONS
        const oldSessionResult = await GetOldSessions(info.language, info.practice, userId)
        if(oldSessionResult.status != 200)
        {
            alert(oldSessionResult.message)
            return
        }

        setOldSessions([oldSessionResult.data])

        //CLEAR STATES
        setWords([])

        //REDIRECT TO HOME PAGE
        router.push('/')
    }

    
    return (

        <>
            <div className="container max-w-screen-xl mx-auto px-4">
                <NavbarComponent />
            </div>
            <div className="container flex justify-between max-w-screen-xl mx-auto px-4">
                
                <div className="flex justify-between max-w-screen-xl mx-auto px-4">

                    <div className="flex justify-between items-end h-[600px]">

                        {isEnglish ? (isShow ? <EnglishHalf text1={text1}/> : <EnglishFull text1={text1} text2={text2}/>) :
                         isTurkish ? (isShow ? <TurkishHalf text1={text1}/> : <TurkishFull text1={text1} text2={text2}/>) :
                         isGerman ? (isShow ? <GermanHalf text1={text1}/> : <GermanFull text1={text1} text2={text2}/>) :
                         isRussian ? (isShow ? <RussianHalf text1={text1}/> : <RussianHalf text1={text1} text2={text2}/>) : null}

                    </div>
                    <div className="flex flex-col items-start h-full space-y-4 ml-4">
                        {showCloseButton ? <button onClick={handleCloseClick} className="h-full px-4 py-2 bg-yellow-500 text-white rounded min-w-[70px]">Close</button> 
                        
                        : showNextButton ? <button onClick={handleNextClick} className="h-full px-4 py-2 bg-blue-500 text-white rounded min-w-[70px]">Next</button> 
                        :
                        <>
                            <button onClick={handleYesClick} className="h-1/2 px-4 py-2 bg-green-500 text-white rounded min-w-[70px]">YES</button>
                            <button onClick={handleNoClick} className="h-1/2 px-4 py-2 bg-red-500 text-white rounded min-w-[70px]">NO</button>
                        </>
                        }
                        
                    </div>

                </div>
                <WordTable/>
            </div>
        </>

    );
}