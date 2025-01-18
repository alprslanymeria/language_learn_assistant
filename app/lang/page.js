"use client"

import LanguageComponent from "@/components/LanguageComponent";
import PracticeComponent from "@/components/PracticeComponent";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Lang(){

    const searchParams = useSearchParams();
    const language = searchParams.get("language");
    const practice = searchParams.get("practice");

    //True ise language göster
    const [isShow, setIsShow] = useState(true);

    useEffect(() => {

        if(practice == "" || practice == null)
            setIsShow(true)
        else
            setIsShow(false)
    }, []);

    return (

        isShow 
        ? <LanguageComponent language={language}/> 
        : <PracticeComponent language={language} practice={practice}/>

    );
}