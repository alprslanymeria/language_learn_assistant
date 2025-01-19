"use server"

import { prisma } from "@/app/lib/prisma"

export async function GetCategories(language, userId){

    try {
        
        //GET LANGUAGE ID
        const lang = await prisma.language.findFirst({
            where: {
                language: language
            }
        })

        let names = []

        const categories = await prisma.flashcardCategory.findMany({
            where:{
                languageId: lang.id,
                userId: userId
            }
        })

        categories.map((item) => {

            names.push(item.categoryName)
        })

        return {data: names, status: 200}

    } catch (error) {
        
        return {data: null, status: 500, message: "Kategoriler getirilirken bir hata oluştu..", details: error.message}
    }
}

export async function GetAllCategories(userId){

    try {

        const categories = await prisma.flashcardCategory.findMany({
            where:{
                userId: userId
            }
        })

        return {data: categories, status: 200}

    } catch (error) {
        
        return {data: null, status: 500, message: "Kategoriler getirilirken bir hata oluştu..", details: error.message}
    }
}