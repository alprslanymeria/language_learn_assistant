"use server"
import { prisma } from "../app/lib/prisma"

export async function GetBooks(language, practice, userId){

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
                    languageId: 2,
                    userId: userId
                }
            })

            return {data: books, status: 200}
        }

        // FOR READING
        const books = await prisma.book.findMany({
            where: {
                languageId: lang.id,
                userId: userId
            }
        })

        return {data: books, status: 200}

    } catch (error) {
        
        return {data: null, status: 500, message: "Kitap verileri alınırken bir hata oluştu", details: error.message}
    }

}


export async function GetBook(practice, language, imagePath, userId){

    try {

        // GET LANGUAGE ID
        const lang = await prisma.language.findUnique({
            where: {
                language: language
            }
        })

        let book = null;
        
        if(practice == "reading")
        {
            book = await prisma.book.findFirst({
                where: {
                    languageId: lang.id,
                    imagePath: imagePath,
                    userId: userId
                }
            })
        }

        if(practice == "writing")
        {
            book = await prisma.book.findFirst({
                where: {
                    languageId: 2,
                    imagePath: imagePath,
                    userId: userId
                }
            })
        }

        return {data: book, status: 200}
        
    } catch (error) {
        
        return {data: null, status: 500, message: "Kitap verisi alınırken bir hata oluştu", details: error.message}
    }
}