"use client"

import { GetAllCategories, GetCategories } from "@/actions/Flashcard";
import CrudFormComponent from "@/components/CrudFormComponent";
import editFormStore from "@/store/editFormStore";
import { userStore } from "@/store/userStore";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { decrypt } from "../lib/crypto";

export default function AddPage(){

    const searchParams = useSearchParams();
    const table = searchParams.get("table")

    const [formHeading, setFormHeading] = useState("")
    const [labelNames, setLabelNames] = useState([])
    const [isHidden, setIsHidden] = useState([])

    const {formData, setFormData} = editFormStore();
    const {user} = userStore();
    const userId = decrypt(user.userId)

    useEffect(() => {

        setFormData({language: "", wordCategory:"", input1: "", input2: "", file1: null, file2: null, wordOptions:[]})

        switch (table) {
            case "book":
                setFormHeading("Create Book")
                setLabelNames(["Language", "", "Book Name", "", "Book Image", "Book Pdf"])
                setIsHidden([true,false, true, false, true, true])
                break;
            case "film":
                setFormHeading("Create Film")
                setLabelNames(["Language", "", "Film Name", "", "Film Image", "Film Video"])
                setIsHidden([true,false, true, false, true, true])
                break;
            case "word":
                setFormHeading("Create New Word")
                setLabelNames(["Language","Deck", "Word", "Answer", "", ""])
                setIsHidden([true,true, true, true, false, false])
                break;
            case "flashcardCategory":
                setFormHeading("Create Deck Category")
                setLabelNames(["Deck","", "Category", "", "", ""])
                setIsHidden([true,false, true, false, false, false])
                break;
        }
    }, [])

    useEffect(() => {

        const GET = async () => {

            const response = await GetAllCategories(userId)
            if(response.status == 200) setFormData({wordOptions: response.data})
        }

        if(table == "word") GET()
            
    }, [userId])

    return (

        <>
            <CrudFormComponent formHeading={formHeading} labelNames={labelNames} hiddens={isHidden} type="Create" table={table} id=""/>
        </>
    );
}