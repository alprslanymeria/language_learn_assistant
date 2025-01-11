"use server"

import { prisma } from "@/app/lib/prisma"

export async function SaveSentences(sentences) {

    try {
        
        for (const item of sentences) {
            await prisma.sentence.create({
                data: {
                    oldSessionId: item.oldSessionId,
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