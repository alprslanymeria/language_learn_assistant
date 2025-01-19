"use server"

import { prisma } from "@/app/lib/prisma"

export async function SaveSentences(sentences) {

    try {
        
        for (const item of sentences) {
            await prisma.sessionSentence.create({
                data: {
                    oldSessionId: item.oldSessionId,
                    userId: item.userId,
                    original: item.original,
                    own: item.own,
                    translate: item.translate,
                    similarity: item.similarity
                }
            });
        }

        return {status: 200, message: "Sentences başarıyla kaydedildi"}

    } catch (error) {
        
        return {status: 500, message: "Sentences kaydedilirken bir hata oluştu", details: error.message}
    }
}

export async function GetSentencesById(id) {

    try {
        

        //id ile oldSessionId bilgisini al
        const oldSession = await prisma.oldSession.findFirst({
            where: {
                id: Number(id)
            }
        })

        //Bu id bilgisini kullanarak sentence tablosundan verileri çek
        const sentences = await prisma.sessionSentence.findMany({
            where: {
                oldSessionId: oldSession.oldSessionId
            }
        })

        const transformedSentences = sentences.map(sentence => ({
            ...sentence,
            similarity: sentence.similarity ? sentence.similarity.toString() : null
        }));

        return {data: transformedSentences, imagePath:oldSession.imagePath , status: 200}

    } catch (error) {
        
        return {data: null, status: 500, message: "Sentences verileri çekilirken bir hata oluştu", details: error.message}
    }
}