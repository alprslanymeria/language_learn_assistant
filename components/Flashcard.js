"use client"

// REACT & NEXT
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// ACTIONS
import { SaveOldSession } from "@/actions/oldSessions";
import { SaveWords } from "@/actions/wordSession";
import { DeleteLiveSession } from "@/actions/liveSession";
// STORE
import { sessionStore } from "@/store/sessionStore";
import wordStore from "@/store/wordStore";
import { userStore } from "@/store/userStore";
// COMPONENTS
import WordTable from "@/components/wordTable";
// 3RD PARTY
import { decrypt } from "@/app/lib/crypto";
import DeckHalfSvg from "./svg/DeckHalfSvg";
import DeckFullSvg from "./svg/DeckFull";


export default function Flashcard({data}) {

    const router = useRouter();

    const {info} = sessionStore()
    const {user} = userStore();
    const userId = decrypt(user.userId)
    const oldSessionId = decrypt(info.sessionId)
    const {words, setWords, index, setIndex} = wordStore();

    const [isShow, setIsShow] = useState(true)
    const [text1, setText1] = useState("")
    const [text2, setText2] = useState("")


    const [showNextButton, setShowNextButton] = useState(false)
    const [showCloseButton, setShowCloseButton] = useState(false)

    

    useEffect(() => {

        setText1(data.at(index).wordToLearn)
        setText2(data.at(index).translatedWord)
    }, [])

    
    const handleClick = (status) => {

        setIndex(index+1)
        setIsShow(!isShow)
        setShowNextButton(true)

        const word = {
            oldSessionId: oldSessionId,
            userId: userId,
            word: text1,
            answer: text2,
            status: status
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
            imagePath: info.categoryName,
            rate: 0,
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
            alert(deleteResult.details)
            return
        }

        //REDIRECT TO HOME PAGE
        router.push('/')
    }

    
    return (

    
        <div className="container flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto px-4">
            
            <div className="flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto px-4">

                <div className="flex justify-between items-end h-[373px] sm:h-[486px] md:h-[600px]">
                    {isShow  ? <DeckHalfSvg language={info.language} text1={text1} category={info.categoryName}/> : <DeckFullSvg language={info.language} text1={text1} text2={text2} category={info.categoryName}/> }
                </div>

                <div className="flex flex-row md:flex-col my-6 md:my-0 justify-center gap-5 items-center md:items-center h-full ml-4">
                    {showCloseButton ? <button onClick={handleCloseClick} className="h-full px-4 py-2 bg-yellow-500 text-white rounded min-w-[70px]">Close</button> 
                    
                    : showNextButton ? <button onClick={handleNextClick} className="h-full px-4 py-2 bg-blue-500 text-white rounded min-w-[70px]">Next</button> 
                    :
                    <>
                        <button onClick={()=> handleClick(true)} className="h-1/2 px-4 py-2 bg-green-500 text-white rounded min-w-[70px]">YES</button>
                        <button onClick={() => handleClick(false)} className="h-1/2 px-4 py-2 bg-red-500 text-white rounded min-w-[70px]">NO</button>
                    </>
                    }
                    
                </div>

            </div>
            <WordTable/>
        </div>
    );
}