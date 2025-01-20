"use client"

import CrudFormComponent from "@/components/CrudFormComponent";
import editFormStore from "@/store/editFormStore";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function AddPage(){

    const searchParams = useSearchParams();
    const table = searchParams.get("table")

    const [formHeading, setFormHeading] = useState("")
    const [labelNames, setLabelNames] = useState([])
    const [isHidden, setIsHidden] = useState([])

    const {formData, setFormData} = editFormStore();

    useEffect(() => {

        setFormData({language: "", input1: "", input2: "", file1: null, file2: null})

        switch (table) {
            case "book":
                setFormHeading("Create Book")
                setLabelNames(["Language", "Book Name", "", "Book Image", "Book Pdf"])
                setIsHidden([true, true, false, true, true])
                break;
            case "film":
                setFormHeading("Create Film")
                setLabelNames(["Language", "Film Name", "", "Film Image", "Film Video"])
                setIsHidden([true, true, false, true, true])
                break;
            case "word":
                setFormHeading("Create New Word")
                setLabelNames(["Language", "Word", "Answer", "", ""])
                setIsHidden([true, true, true, false, false])
                break;
            case "flashcardCategory":
                setFormHeading("Create Deck Category")
                setLabelNames(["Deck", "Category", "", "", ""])
                setIsHidden([true, true, false, false, false])
                break;
        }
    }, [])

    return (

        <>
            <CrudFormComponent formHeading={formHeading} labelNames={labelNames} hiddens={isHidden} type="Create" table={table} id=""/>
        </>
    );
}