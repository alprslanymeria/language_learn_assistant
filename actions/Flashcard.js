"use server"

import { prisma } from "@/app/lib/prisma"

export async function GetCategories(language){

    try {
        
        //GET LANGUAGE ID
        const lang = await prisma.language.findFirst({
            where: {
                language: language
            }
        })

        let names = []

        const categories = await prisma.category.findMany({
            where:{

                languageId: lang.id
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