"use server"
import { prisma } from "@/app/lib/prisma"

export async function GetWords(language, userId, categoryName)
{
    try {
        
        //GET LANGUAGE ID
        const lang = await prisma.language.findFirst({
            where: {
                language: language
            }
        })

        const words = await prisma.word.findMany({
            where: {
                languageId: lang.id,
                userId: userId,
                categoryName: categoryName
            }
        })

        return {data: words, status: 200}

    } catch (error) {
        
        return {data: null,  status: 500, message:"Kelimeler alınırken bir hata oluştu" , details: error.message}
    }
}

export async function GetAllWords(userId)
{
    try {

        const words = await prisma.word.findMany({
            where: {
                userId: userId
            }
        })

        return {data: words, status: 200}

    } catch (error) {
        
        return {data: null,  status: 500, message:error.message , details: error.message}
    }
}

export async function GetWordById(id)
{
    try {
        const word = await prisma.word.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        return {data: word, status: 200}

    } catch (error) {
        
        return {data: null,  status: 500, message:"Kelime alınırken bir hata oluştu" , details: error.message}
    }
}   