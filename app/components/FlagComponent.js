"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { mitr } from '@/public/fonts';
import Link from 'next/link';

export default function FlagComponent() {

    //Seçilen resmin path i tutulur
    const [selected, setSelected] = useState("");
    const [languages, setLanguages] = useState([]);

    useEffect(() => {

        const response = fetch('http://localhost:3000/api/language',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
        })
        .then(response => response.json())
        .then((data) => {   setLanguages(data)  })

    }, [])

    console.log(languages)

    return (
        <>
        <div className="flex flex-wrap justify-center gap-10">
            {
                languages.map((item, index) => {
                    return(
                        <div className="m-2">
                            <Image 
                                src={item.picture}
                                alt="Image 1" 
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
            <Link href={`/${selected}`}>
                <button
                className={` ${mitr.className} mt-20 bg-[#58CC02] text-white font-medium py-3 px-20 rounded-lg shadow-md shadow-[#58A700] hover:bg-[#58A700] transition-colors duration-300`}
                >
                BAŞLA
                </button>
            </Link>
        </div>
        </>
    );
}


