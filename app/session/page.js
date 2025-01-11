"use client"

import { decrypt } from '@/app/lib/crypto';
import { sessionStore } from '@/store/sessionStore';
import { useSearchParams } from 'next/navigation';
import { GetBook } from '@/actions/book';
import { useEffect , useState} from 'react';
import { GetFilm } from '@/actions/film';
import Reading from '@/components/Reading';
import Writing from '@/components/Writing';
import Listening from '@/components/Listening';
import Flashcard from '@/components/Flashcard';

export default function SessionPage({params}) {

    const searchParams  = useSearchParams();
    const safeUrl = searchParams.get('id');

    // GET INFOS FROM ZUSTAND
    const {info} = sessionStore();

    // DECRYPT THE SESSION ID
    const encryptedSessionId = decodeURIComponent(safeUrl)
    const sessionId = decrypt(encryptedSessionId)

    const [data, setData] = useState([])
    const [error, setError] = useState("")
    const [isReading, setIsReading] = useState(false)
    const [isWriting, setIsWriting] = useState(false)
    const [isListening, setIsListening] = useState(false)
    const [isFlashcard, setIsFlashcard] = useState(false)
    const [sourcePath, setSourcePath] = useState("")

    useEffect(() => {

        const GET = async () => {

            if(info.practice == "reading" || info.practice == "writing") {
                
                if(info.practice == "reading") setIsReading(true)
                if(info.practice == "writing") setIsWriting(true)

                const response = await GetBook(info.practice, info.language, info.imagePath)
                if(response.status != 200)
                {
                    setError(response.message)
                    return
                }

                setData(response.data)
                setSourcePath(response.data.sourcePath)
            }

            if(info.practice == "listening"){

                const response = await GetFilm(info.language, info.imagePath);
                if(response.status != 200)
                {
                    setIsListening(true)
                    setError(response.message)
                    return
                }

                setData(response.data)
                setIsListening(true)
                setSourcePath(response.data.sourcePath)
            }

            if(info.practice == "flashcard"){

                // Tablodan kelime verileri çekilecek
                setIsFlashcard(true)
            }
        }

        GET()
    }, [info])

    return (
        <div>
            
            {
                isReading ?
                <Reading file={sourcePath}></Reading>
                :
                isWriting ?
                <Writing></Writing>
                :
                isListening ?
                <Listening></Listening>
                :
                isFlashcard ?
                <Flashcard></Flashcard>
                :
                <div></div>
            }
        </div>

    );
}