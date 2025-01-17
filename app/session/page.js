"use client"

// REACT & NEXT
import { useEffect , useState} from 'react';
// COMPONENTS
import Reading from '@/components/Reading';
import Writing from '@/components/Writing';
import Listening from '@/components/Listening';
import Flashcard from '@/components/Flashcard';
// ACTIONS
import { GetBook } from '@/actions/book';
import { GetFilm } from '@/actions/film';
import { GetWords } from '@/actions/word';
// STORE
import { sessionStore } from '@/store/sessionStore';

export default function SessionPage() {

    // GET INFOS FROM ZUSTAND
    const {info} = sessionStore();

    const [activeComponent, setActiveComponent] = useState("")
    const [data, setData] = useState([])
    const [error, setError] = useState("")
    const [sourcePath, setSourcePath] = useState("")

    const componentMap = {
        reading: <Reading file={sourcePath} />,
        writing: <Writing file={sourcePath} />,
        listening: <Listening />,
        flashcards: <Flashcard data={data} />,
    }

    useEffect(() => {

        const GET = async () => {

            if(info.practice == "reading" || info.practice == "writing") {
                
                if(info.practice == "reading") setActiveComponent("reading")
                if(info.practice == "writing") setActiveComponent("writing")

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
                    setActiveComponent("listening")
                    setError(response.message)
                    return
                }

                setData(response.data)
                setActiveComponent("listening")
                setSourcePath(response.data.sourcePath)
            }

            if(info.practice == "flashcards"){

                const response = await GetWords(info.language);
                if(response.status != 200)
                {   
                    setActiveComponent("flashcards")
                    setError(response.message)
                    return
                }

                setData(response.data)
                setActiveComponent("flashcards")
            }
        }

        GET()
    }, [info])

    return (
        
        <div>
            {componentMap[activeComponent] || <div></div>}
        </div>
    );
}