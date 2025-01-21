"use server"

import { prisma } from "@/app/lib/prisma"
import { Storage } from "@google-cloud/storage"
import { redirect } from "next/navigation"
import { Vibrant } from "node-vibrant/node";
import sharp from "sharp"

//ZOD İLE VERİ KONTROLÜ YAPILIR

export async function addOrUpdate(prevState, formData){

    // GET FORM DATA'S
    const userId = formData.get("userId")
    const type = formData.get("type")
    const table = formData.get("table")
    const id = formData.get("id")
    const language = formData.get("language")
    const wordCategory = formData.get("wordCategory")
    const input1 = formData.get("input1")
    const input2 = formData.get("input2")
    const file1 = formData.get("file1")
    const file2 = formData.get("file2")


    try {

        const projectId = process.env.GCP_PROJECT_ID

        const storage = new Storage({
            projectId: projectId
        })
        const imageBucket = storage.bucket("language-learn-assistant-images")

        let oldFile1Url;
        let oldFile2Url;
        let bufferForFile1;
        let bufferForFile2;
        let existingRecord;
        let file1Url;
        let file2Url;
        let leftSideColor;

        const getLeftSideColor = async (bufferForFile1) => {

            try {
                const buffer = Buffer.from(bufferForFile1);
                
                // First get the processed buffer and its metadata
                const processedBuffer = await sharp(buffer)
                    .resize(300, 300, { fit: 'inside' })
                    .toBuffer();
                    
                // Get the metadata to access width and height
                const metadata = await sharp(processedBuffer).metadata();
                
                // Now use the metadata for the extraction
                const leftSideBuffer = await sharp(processedBuffer)
                    .extract({
                        left: 0,
                        top: 0,
                        width: Math.floor(metadata.width / 3),
                        height: metadata.height
                    })
                    .toBuffer();
                    
                // Analyze left side colors
                const leftSidePalette = await Vibrant.from(leftSideBuffer).getPalette();
                leftSideColor = leftSidePalette.Vibrant.hex;
                
                
            } catch (error) {
                console.log(error.message);
            }
        }


        if(file1 != null && file2 != null && (table == "book" || table == "film"))
        {
            bufferForFile1 = await file1.arrayBuffer()
            bufferForFile2 = await file2.arrayBuffer()
            await getLeftSideColor(bufferForFile1)
        }


        const handleCreate = async () => {

            if(file1 != null && file2 != null && (table == "book" || table == "film"))
            {
                // CREATE UNIQUE NAME FOR FILES
                const file1Name = `${Date.now()}_${file1.name}`;
                const file2Name = `${Date.now()}_${file2.name}`;

                // UPLOAD FILES TO GOOGLE CLOUD STORAGE
                const file1Upload = imageBucket.file(file1Name).createWriteStream({
                    resumable: false,
                    metadata: { contentType: file1.type }
                });

                const file2Upload = imageBucket.file(file2Name).createWriteStream({
                    resumable: false,
                    metadata: { contentType: file2.type }
                });

                // WRITE FILES TO GOOGLE CLOUD STORAGE
                file1Upload.end(Buffer.from(bufferForFile1))
                file2Upload.end(Buffer.from(bufferForFile2))

                // WAIT
                await new Promise((resolve, reject) => {
                    file1Upload.on('finish', resolve);
                    file1Upload.on('error', reject);
                    file2Upload.on('finish', resolve);
                    file2Upload.on('error', reject);
                });

                // GET FILE URL'S
                file1Url = imageBucket.file(file1Name).publicUrl();
                file2Url = imageBucket.file(file2Name).publicUrl();
            }

            // SAVE TO DATABASE
            switch(table){

                case "book":
                    await prisma.book.create({
                        data: {
                            userId: userId,
                            languageId: parseInt(language),
                            bookName: input1,
                            imagePath: file1Url,
                            leftSideColor: leftSideColor,
                            sourcePath: file2Url
                        }
                    })
                    break;
                case "film":
                    await prisma.film.create({
                        data: {
                            userId: userId,
                            languageId: parseInt(language),
                            filmName: input1,
                            imagePath: file1Url,
                            leftSideColor: leftSideColor,
                            sourcePath: file2Url
                        }
                    })
                    break;
                case "word":
                    await prisma.word.create({
                        data: {
                            userId: userId,
                            languageId: parseInt(language),
                            wordToLearn: input1,
                            translatedWord: input2,
                            categoryName: wordCategory
                        }
                    })
                    break;
                case "flashcardCategory":
                    await prisma.flashcardCategory.create({
                        data: {
                            userId: userId,
                            languageId: parseInt(language),
                            categoryName: input1
                        }
                    })
                    break;
            }
        }

        const handleEdit = async () => {

            if(file1 != null && file2 != null && (table == "book" || table == "film"))
            {
                // GET OLD FILE INFO'S
                await getExistingRecord();
                oldFile1Url = existingRecord.imagePath;
                oldFile2Url = existingRecord.sourcePath;
            }
            

            if(file1 != null && file2 != null && (table == "book" || table == "film"))
            {
                // CREATE UNIQUE NAME FOR FILES
                const file1Name = `${Date.now()}_${file1.name}`;
                const file2Name = `${Date.now()}_${file2.name}`;

                // UPLOAD FILES TO GOOGLE CLOUD STORAGE
                const file1Upload = imageBucket.file(file1Name).createWriteStream({
                    resumable: false,
                    metadata: { contentType: file1.type }
                });

                const file2Upload = imageBucket.file(file2Name).createWriteStream({
                    resumable: false,
                    metadata: { contentType: file2.type }
                });

                // WRITE FILES TO GOOGLE CLOUD STORAGE
                file1Upload.end(Buffer.from(bufferForFile1))
                file2Upload.end(Buffer.from(bufferForFile2))

                // WAIT
                await new Promise((resolve, reject) => {
                    file1Upload.on('finish', resolve);
                    file1Upload.on('error', reject);
                    file2Upload.on('finish', resolve);
                    file2Upload.on('error', reject);
                });

                // GET FILE URL'S
                file1Url = imageBucket.file(file1Name).publicUrl();
                file2Url = imageBucket.file(file2Name).publicUrl();

            }

            // UPDATE DATABASE
            switch(table){
                case "book":
                    await prisma.book.update({
                        where: { id: parseInt(id) },
                        data: {
                            languageId: parseInt(language),
                            bookName: input1,
                            imagePath: file1Url,
                            sourcePath: file2Url
                        }
                    });
                    break;
                case "film":
                    await prisma.film.update({
                        where: { id: parseInt(id) },
                        data: {
                            languageId: parseInt(language),
                            filmName: input1,
                            imagePath: file1Url,
                            sourcePath: file2Url
                        }
                    });
                    break;
                case "word":
                    await prisma.word.update({
                        where: { id: parseInt(id) },
                        data: {
                            languageId: parseInt(language),
                            wordToLearn: input1,
                            translatedWord: input2,
                            categoryName: wordCategory
                        }
                    });
                    break;
                case "flashcardCategory":
                    await prisma.flashcardCategory.update({
                        where: { id: parseInt(id) },
                        data: {
                            languageId: parseInt(language),
                            categoryName: input1
                        }
                    });
                    break;
            }

            if(file1 != null && file2 != null && (table == "book" || table == "film"))
            {
                // DELETE OLD FILES
                if (oldFile1Url) {
                    const oldFile1Name = oldFile1Url.split('/').pop();
                    const isExist = await imageBucket.file(oldFile1Name).exists();
                    if(isExist)
                        await imageBucket.file(oldFile1Name).delete();
                }

                if (oldFile2Url) {
                    const oldFile2Name = oldFile2Url.split('/').pop();
                    const isExist = await imageBucket.file(oldFile2Name).exists();
                        await imageBucket.file(oldFile2Name).delete();
                }
            }
            
        }

        const getExistingRecord = async () => {

            switch(table) {
                case "book":
                    existingRecord = await prisma.book.findUnique({
                        where: {
                            id: parseInt(id)
                        }
                    })
                    break;
                case "film":
                    existingRecord = await prisma.film.findUnique({
                        where: {
                            id: parseInt(id)
                        }
                    })
                    break;
            }
        }


        switch(type){

            case "Create":
                await handleCreate()
                break;
            case "Edit":
                await handleEdit()
                break;
        }


    } catch (error) {

        return {status: 500, message: "Veriler eklenirken bir hata oluştu", details: error.message}
    }

    redirect(`/list/${table}`)
}


export async function deleteById(id, table){

    try {

        switch(table){

            case "book":
                await prisma.book.delete({
                    where: {
                        id: parseInt(id)
                    }
                })
                break;
            case "film":
                await prisma.film.delete({
                    where: {
                        id: parseInt(id)
                    }
                })
                break;
            case "word":
                await prisma.word.delete({
                    where: {
                        id: parseInt(id)
                    }
                })
                break;
            case "flashcardCategory":
                await prisma.flashcardCategory.delete({
                    where: {
                        id: parseInt(id)
                    }
                })
                break;
        }

        return {status: 200}


    } catch (error) {

        return {status: 500, message: error.message, details: error.message}

    }
}