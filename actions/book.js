"use server"
import { prisma } from "../app/lib/prisma"

export async function GetBooks(language, practice){

    try {

        const lang = await prisma.language.findUnique({
            where: {
                language: language
            }
        })
        
        // FOR WRITING
        if(practice == 'writing')
        {
            const books = await prisma.book.findMany({
                where: {
                languageId: 2
                }
            })

            return {data: books, status: 200}
        }

        // FOR READING
        const books = await prisma.book.findMany({
            where: {
                languageId: lang.id
            }
        })

        return {data: books, status: 200}

    } catch (error) {
        
        return {data: null, status: 500, message: "Kitap verileri alınırken bir hata oluştu", details: error.message}
    }

}