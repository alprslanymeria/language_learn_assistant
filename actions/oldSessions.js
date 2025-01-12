"use server"

import { prisma } from "@/app/lib/prisma";

export async function GetOldSessions(language, practice, userId) {
    
    try {

        const lang = await prisma.language.findFirst({
            where: {
                language: language
            }
        })

        const prac = await prisma.practice.findFirst({
            where: {
                practice: practice
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

        const transformedSessions = oldSessions.map(session => ({
            ...session,
            createdOn: session.createdOn ? session.createdOn.toLocaleString() : null,
            rate: session.rate ? session.rate.toString() : null
        }));

        return {data: transformedSessions, status: 200}

    } catch (error) {
        
        return {data: null, status: 500, message: "oldSessions verileri çekilirken bir hata oluştu", details: error.message}
    }
}

export async function SaveOldSession(row)
{
    try {

        const lang = await prisma.language.findFirst({
            where: {
                language: row.language
            }
        })

        const prac = await prisma.practice.findFirst({
            where: {
                practice: row.practice
            }
        })
        
        const result = await prisma.oldSession.create({
            data: {
                oldSessionId: row.oldSessionId,
                userId: row.userId,
                languageId: lang.id,
                practiceId: prac.id,
                rate: row.rate,
                imagePath: row.imagePath
            }
        })

        return {data: result, status: 200, message: "OldSession başarıyla kaydedildi"}

    } catch (error) {
        return {data: null, status: 500, message: "OldSession kaydedilirken bir hata oluştu", details: error.message}
    }
}