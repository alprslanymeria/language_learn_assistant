"use server"
import { prisma } from "../app/lib/prisma";

export async function GetFilms(language, userId){

    try {
        
        const lang = await prisma.language.findUnique({
            where: {
                language: language
            }
        })

        let imagePaths = []

        const films = await prisma.film.findMany({
            where: {
                languageId: lang.id,
                userId: userId
            }
        })

        films.map((item) => {
            console.log(item.imagePath)
            imagePaths.push(item.imagePath)
        })

        return {data: imagePaths, status: 200}

    } catch (error) {
        
        return {data: null, status: 500, message: "Film verileri alınırken bir hata oluştu", details: error.message}
    }
}


export async function GetAllFilms(userId){

    try {

        const films = await prisma.film.findMany({
            where: {
                userId: userId
            }
        })

        return {data: films, status: 200}

    } catch (error) {
        
        return {data: null, status: 500, message: "Film verileri alınırken bir hata oluştu", details: error.message}
    }
}


export async function GetFilm(language, imagePath, userId){

    try {
        
        // GET LANGUAGE ID
        const lang = await prisma.language.findUnique({
            where: {
                language: language,
                userId: userId
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

