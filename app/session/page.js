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
import { decrypt } from '../lib/crypto';
import { userStore } from '@/store/userStore';

export default function SessionPage() {

    // GET INFOS FROM ZUSTAND
    const {info} = sessionStore();
    const {user} = userStore();
    const userId = decrypt(user.userId)
    const practice = info.practice;
    const language = info.language;
    const imagePath = info.imagePath;
    const categoryName = info.categoryName;

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

            if(practice == "reading" || practice == "writing") {
                
                if(practice == "reading") setActiveComponent("reading")
                if(practice == "writing") setActiveComponent("writing")

                const response = await GetBook(practice, language, imagePath, userId)
                if(response.status != 200)
                {
                    setError(response.message)
                    return
                }

                setSourcePath(response.data.sourcePath)
            }

            if(practice == "listening"){

                const response = await GetFilm(language, imagePath, userId);
                if(response.status != 200)
                {
                    setActiveComponent("listening")
                    setError(response.message)
                    return
                }

                setActiveComponent("listening")
                setSourcePath(response.data.sourcePath)
            }

            if(practice == "flashcards"){

                const response = await GetWords(language, userId, categoryName);
                if(response.status != 200)
                {   
                    setActiveComponent("flashcards")
                    setError(response.details)
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
            {error != "" && <div>{error}</div>}
            {componentMap[activeComponent] || <div></div>}
        </div>
    );
}