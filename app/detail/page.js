"use client"

import { GetSentencesById } from "@/actions/sentences";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import { sessionStore } from "@/store/sessionStore";
import DetailTable from "@/components/DetailTable";
import NavbarComponent from "@/components/NavbarComponent";
import { useSearchParams } from "next/navigation";

export default function Detail()
{
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const {info, setImagePath} = sessionStore();

    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {

        const GET = async () => {

            const response = await GetSentencesById(id)

            if(response.status == 200)
            {
                setData(response.data)
                setImagePath(response.imagePath)
            }

            if(response.status == 500)
                setError(response.message)
        }

        GET()

    }, [id])

    return(
        
        <>
            <div className="container max-w-screen-xl mx-auto px-4">
                <NavbarComponent></NavbarComponent>
            </div>
            <div className="relative h-[400px] w-[300px] mx-auto">
                <Image 
                    src={info.imagePath}
                    fill
                    alt="Book"
                    className="rounded-lg"
                    sizes="(max-width: 768px) 100vw, 50vw">
                </Image>
            </div>
            
            <DetailTable sentences={data}></DetailTable>
        </>
    );
}