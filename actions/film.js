"use server"
import { prisma } from "../app/lib/prisma";

export async function GetFilms(language){

    try {
        
        const lang = await prisma.language.findUnique({
            where: {
                language: language
            }
        })

        const films = await prisma.film.findMany({
            where: {
                languageId: lang.id
            }
        })

        return {data: films, status: 200}

    } catch (error) {
        
        return {data: null, status: 500, message: "Film verileri alınırken bir hata oluştu", details: error.message}
    }
}


export async function GetFilm(language, imagePath){

    try {
        
        // GET LANGUAGE ID
        const lang = await prisma.language.findUnique({
            where: {
                language: language
            }
        })

        const film = await prisma.film.findFirst({
            where: {
                languageId: lang.id,
                imagePath: imagePath
            }
        })

        return {data: film, status: 200}

    } catch (error) {
        
        return {data: null, status: 500, message: "Film verisi alınırken bir hata oluştu", details: error.message}
    }
}

