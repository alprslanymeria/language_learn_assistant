"use client"
import { useState } from 'react';
import Image from 'next/image';
import { mitr } from '@/public/fonts';
import Link from 'next/link';

export default function FlagComponent() {

    //Seçilen resmin path i tutulur
    const [selected, setSelected] = useState("");

    return (
        <>
        <div className="flex flex-wrap justify-center gap-10">
            <div className="m-2">
                <Image 
                    src="/images/flags/tr.png" 
                    alt="Image 1" 
                    width={100} 
                    height={100} 
                    className={`object-contain ${selected === "turkish" ? "border-4 border-blue-500 rounded-full": ""}`}
                    onClick={() => setSelected("turkish")}
                />
            </div>
            <div className="m-2">
                <Image 
                    src="/images/flags/de.png" 
                    alt="Image 2" 
                    width={100} 
                    height={100} 
                    className={`object-contain ${selected === "german" ? "border-4 border-blue-500 rounded-full": ""}`}
                    onClick={() => setSelected("german")}
                />
            </div>
            <div className="m-2">
                <Image 
                    src="/images/flags/uk.png" 
                    alt="Image 3" 
                    width={100} 
                    height={100} 
                    className={`object-contain ${selected === "english" ? "border-4 border-blue-500 rounded-full": ""}`}
                    onClick={() => setSelected("english")}
                />
            </div>
            <div className="m-2">
                <Image 
                    src="/images/flags/rs.png" 
                    alt="Image 4" 
                    width={100} 
                    height={100} 
                    className={`object-contain ${selected === "russian" ? "border-4 border-blue-500 rounded-full": ""}`}
                    onClick={() => setSelected("russian")}
                />
            </div>
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


