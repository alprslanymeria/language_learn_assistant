"use server"

import { prisma } from "@/app/lib/prisma";

export async function GetOldSessions(language, practice, userId) {
    
    try {

        const lang = await prisma.language.findFirst({
            where: {
                languageId: language
            }
        })

        const prac = await prisma.practice.findFirst({
            where: {
                practiceId: practice
            }
        })
        
        const oldSessions = await prisma.oldSession.findMany({
            where: {
                userId: userId,
                languageId: lang.id,
                practiceId: prac.id,
            }
        })

        if (!oldSessions || oldSessions.length === 0)
            return {data: null, status: 400, message: "Session verileri bulunamadı"}

        return {data: oldSessions, status: 200}


    } catch (error) {
        
        return {data: null, status: 500, message: "oldSessions verileri çekilirken bir hata oluştu", details: error.message}
    }
}

export async function SaveOldSession(row)
{
    try {

        const lang = await prisma.language.findFirst({
            where: {
                languageId: row.languageId
            }
        })

        const prac = await prisma.practice.findFirst({
            where: {
                practiceId: row.practiceId
            }
        })
        
        const result = await prisma.oldSession.create({
            data: {
                oldSessionId: row.oldSessionId,
                userId: row.userId,
                languageId: lang.id,
                practiceId: prac.id,
                rate: row.rate
            }
        })

        return {data: result, status: 200, message: "OldSession başarıyla kaydedildi"}

    } catch (error) {
        return {data: null, status: 500, message: "OldSession kaydedilirken bir hata oluştu", details: error.message}
    }
}