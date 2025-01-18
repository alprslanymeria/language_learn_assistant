"use client"

// REACT & NEXT
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
// ACTIONS
import { GetLanguages } from '@/actions/language'
// 3RD PARTY
import { mitr } from '@/public/fonts'


export default function FlagComponent() {

    const [languages, setLanguages] = useState([])
    const [selected, setSelected] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {

        const GET = async () => {

            const response = await GetLanguages()
            
            if(response.status == 200)
                setLanguages(response.data)

            if(response.status == 500)
                setError(response.message)
        }

        GET()
    }, [])

    return (
        <>
            <div className="flex flex-wrap justify-center gap-10">
                {
                    languages.map((item, index) => {
                        return(
                            <div key={index} className="m-2">
                                <Image 
                                    src={item.picturePath}
                                    alt={item.language}
                                    width={100} 
                                    height={100} 
                                    className={`object-contain ${selected === item.language ? "border-4 border-blue-500 rounded-full": ""}`}
                                    onClick={() => setSelected(item.language)}
                                />
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex justify-center mt-4">
                <Link href={`/lang?language=${selected}`}>
                    <button
                    className={` ${mitr.className} mt-20 bg-[#58CC02] text-white font-medium py-3 px-20 rounded-lg shadow-md shadow-[#58A700] hover:bg-[#58A700] transition-colors duration-300`}
                    >
                    BAŞLA
                    </button>
                </Link>
            </div>
        </>
    )
}