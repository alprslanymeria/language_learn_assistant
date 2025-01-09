"use server"

import { prisma } from "../app/lib/prisma";

export async function GetOldSessions(language, practice) {
    
    try {
        
        const oldSessions = await prisma.oldSession.findMany({
            where: {
                userId: userId,
                languageId: language,
                practiceId: practice,
            }
        })

        if (!oldSessions || oldSessions.length === 0)
            return {data: null, status: 400, message: "Session verileri bulunamadı"}

        return {data: oldSessions, status: 200}


    } catch (error) {
        
        return {data: null, status: 500, message: "oldSessions verileri çekilirken bir hata oluştu", details: error.message}
    }
}