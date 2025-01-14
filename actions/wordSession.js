"use server"

import { prisma } from "@/app/lib/prisma"

export async function SaveWords(words){

    try {

        for (const item of words) {
            await prisma.wordSession.create({
                data: {
                    oldSessionId: item.oldSessionId,
                    word: item.word,
                    answer: item.answer,
                    status: item.status
                }
            });
        }

        return {status: 200, message: "Words başarıyla kaydedildi"}
    } catch (error) {

        return {status: 500, message: "Words kaydedilirken bir hata oluştu", details: error.message}
        
    }
}

export async function GetWordsById(id) {

    try {
        

        //id ile oldSessionId bilgisini al
        const oldSession = await prisma.oldSession.findFirst({
            where: {
                id: Number(id)
            }
        })

        //Bu id bilgisini kullanarak sentence tablosundan verileri çek
        const words = await prisma.wordSession.findMany({
            where: {
                oldSessionId: oldSession.oldSessionId
            }
        })

        return {data: words, imagePath:oldSession.imagePath , status: 200}

    } catch (error) {
        
        return {data: null, status: 500, message: "Words verileri çekilirken bir hata oluştu", details: error.message}
    }
}