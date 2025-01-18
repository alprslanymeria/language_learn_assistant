"use client"

// REACT & NEXT
import { useState, useEffect, use } from "react"
import Link from "next/link"
// ACTIONS
import { GetPractices } from "@/actions/practice"
// 3RD PARTY
import { mitr } from "@/public/fonts"
// COMPONENTS
import InfoMessageComponent from "@/components/InfoMessageComponent"
// STORE
import oldSessionStore from "@/store/oldSessionStore"

export default function LanguageComponent({language}) {

    // GET SLUGS
    // const resolvedParams = use(params);
    // const language = resolvedParams.language;

    // STATES
    const [practices, setPractices] = useState([])
    const [error, setError] = useState("")

    // STORE
    const {setOldSessions} = oldSessionStore();

    useEffect(() => {
        const GET = async () => {

            setOldSessions([])
            const response = await GetPractices(language)

            if(response.status == 200)
                setPractices(response.data)

            if(response.status == 500)
                setError(response.message)
        }
        
        GET()
        
    }, [])

    return (
        <>
            <InfoMessageComponent message="Please choose which practice you would like to do"></InfoMessageComponent>
            {practices.map((item,index) => {
                    return (
                        <div key={index} className="flex justify-center">
                            <a href={`/lang?language=${language}&practice=${item.practice}`}>
                                <button
                                className={` ${mitr.className} w-64 text-xl mt-5 bg-[#B95DE5] text-white font-medium py-2 rounded-lg shadow-md shadow-[#ad49db] hover:bg-[#ad49db] transition-colors duration-300`}
                                >
                                {item.practice}
                                </button>
                            </a>
                        </div>
                    )
                })
            }
        </>
    );
}