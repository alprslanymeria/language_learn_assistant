"use server"

import { decrypt } from "@/app/lib/crypto"
import { prisma } from "@/app/lib/prisma"

export async function saveLiveSession(sessionId, userId) 
{
    try {

        const id = decrypt(userId)
        
        const result = await prisma.liveSession.create({
            data: {
                liveSessionId: sessionId,
                userId: id
            }
        })

        return {data: result, status:200}
        
    } catch (error) {
        
        return {data: null, status: 500, message: "LiveSession oluşturulurken bir hata oluştu", details: error.message}
    }

}

export async function DeleteLiveSession(userId, sessionId) {

    try {
        
        const result = await prisma.liveSession.delete({
            where: {
                liveSessionId: sessionId,
                userId: userId
            }
        })

        return {data: result, status:200}

    } catch (error) {
        
        return {data: null, status: 500, message: "LiveSession silinirken bir hata oluştu", details: error.message}
    }
}