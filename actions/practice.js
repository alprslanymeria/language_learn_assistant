"use server"

import { prisma } from '../app/lib/prisma'

export async function GetPractices(language) {

    try {
    
    const lang = await prisma.language.findUnique({
        where: {
            language: language
        }
    });
    
    const practices = await prisma.practice.findMany({
        where: {
            languages: {
                some: {
                    id: lang.id
                }
            }
        }
    });

    return {data: practices , status: 200};

  } catch (error) {

    return {data: null, status: 500, message: "Practice verileri alınırken bir hata oluştu", details: error.message};
  }
}