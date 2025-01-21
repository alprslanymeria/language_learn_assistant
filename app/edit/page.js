"use client"

import { GetBookById } from "@/actions/book";
import { GetFilmById } from "@/actions/film";
import { GetAllCategories, GetCategoryById } from "@/actions/Flashcard";
import { GetWordById } from "@/actions/word";
import CrudFormComponent from "@/components/CrudFormComponent";
import editFormStore from "@/store/editFormStore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { set } from "zod";
import { decrypt } from "../lib/crypto";
import { userStore } from "@/store/userStore";

export default function EditPage(){

    const searchParams = useSearchParams();
    const table = searchParams.get("table")
    const id = searchParams.get("id")

    const [error, setError] = useState("")
    const {formData, setFormData} = editFormStore();
    const {user} = userStore();
    const userId = decrypt(user.userId)

    const handler = (veri, type) => {
        
        switch(type){
            case "book":
                setFormData({language: veri.languageId, input1: veri.bookName})
                break;
            case "film":
                setFormData({language: veri.languageId, input1: veri.filmName})
                break;
            case "word":
                setFormData({language: veri.languageId, input1: veri.wordToLearn, input2: veri.translatedWord, wordCategory: veri.categoryName})
                break;
            case "flashcardCategory":
                setFormData({language: veri.languageId, input1: veri.categoryName})
                break;
        }
    }

    useEffect(() => {

        const GET = async () => {

            let response = null
            switch (table) {
                case "book":
                    response = await GetBookById(id)
                    if(response.status == 200) handler(response.data, "book")
                    if(response.status == 500) setError(response.message)
                    break;
                case "film":
                    response = await GetFilmById(id)
                    if(response.status == 200) handler(response.data, "film")
                    if(response.status == 500) setError(response.message)
                    break;
                case "word":
                    response = await GetWordById(id)
                    if(response.status == 200) handler(response.data, "word")
                    if(response.status == 500) setError(response.message)
                    const result = await GetAllCategories(userId)
                    if(result.status == 200) setFormData({wordOptions: result.data})
                    break;
                case "flashcardCategory":
                    response = await GetCategoryById(id)
                    if(response.status == 200) handler(response.data, "flashcardCategory")
                    if(response.status == 500) setError(response.message)
                    break;
                default:
                    break;
            }
        }

        GET()


    }, [table, id])

    const [formHeading, setFormHeading] = useState("")
    const [labelNames, setLabelNames] = useState([])
    const [isHidden, setIsHidden] = useState([])

    useEffect(() => {

        switch (table) {
            case "book":
                setFormHeading("Book Edit")
                setLabelNames(["Language", "", "Book Name", "", "Book Image", "Book Pdf"])
                setIsHidden([true, false, true, false, true, true])
                break;
            case "film":
                setFormHeading("Film Edit")
                setLabelNames(["Language","", "Film Name", "", "Film Image", "Film Video"])
                setIsHidden([true, false, true, false, true, true])
                break;
            case "word":
                setFormHeading("Word Edit")
                setLabelNames(["Language", "Deck", "Word", "Answer", "", ""])
                setIsHidden([true,true, true, true, false, false])
                break;
            case "flashcardCategory":
                setFormHeading("Flashcard Category Edit")
                setLabelNames(["Deck", "", "Category", "", "", ""])
                setIsHidden([true, false, true, false, false, false])
                break;
        }
    }, [])

    return(
        <>
            <CrudFormComponent formHeading={formHeading} labelNames={labelNames} hiddens={isHidden} type="Edit" table={table} id={id}/>
        </>
    );

}