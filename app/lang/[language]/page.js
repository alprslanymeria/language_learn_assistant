"use client"

import Link from "next/link"
import { mitr } from "@/public/fonts"
import InfoMessageComponent from "@/components/InfoMessageComponent"
import NavbarComponent from "@/components/NavbarComponent"
import { useState, useEffect, use } from "react"
import { GetPractices } from "@/actions/practice"


export default function Language({params}) {

    const resolvedParams = use(params);
    const language = resolvedParams.language;

    const [practices, setPractices] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        const GET = async () => {

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
        <div className="container max-w-screen-xl mx-auto px-4">
            <NavbarComponent></NavbarComponent>
        </div>
        <InfoMessageComponent message="Please choose which practice you would like to do"></InfoMessageComponent>
        {
            practices.map((item,index) => {
                return (
                    <div key={index} className="flex justify-center">
                    <Link href={`/lang/${language}/${item.practice}`}>
                        <button
                        className={` ${mitr.className} w-64 text-xl mt-5 bg-[#B95DE5] text-white font-medium py-2 rounded-lg shadow-md shadow-[#ad49db] hover:bg-[#ad49db] transition-colors duration-300`}
                        >
                        {item.practice}
                        </button>
                    </Link>
                </div>
                )
            })
        }
        </>
    )
}