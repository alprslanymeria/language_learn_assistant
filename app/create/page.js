import SliderComponent from "@/components/SliderComponent";
import NavbarComponent from "@/components/NavbarComponent";
import { useSearchParams } from "next/navigation";
import { useEffect , useState } from "react";
import { GetBooks } from "@/actions/book";
import { GetFilms } from "@/actions/film";


export default function Create() {

    const searchParams = useSearchParams();
    const practice = searchParams.get("practice")
    const language = searchParams.get("language")
    
    const [data, setData] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {   

        const GET = async () => {

            if(practice == 'reading' || practice == 'writing')
            {
                const response = await GetBooks(language, practice)

                if(response.status == 200)
                    setData(response.data)

                if(response.status == 500)
                    setError("")
            }

            if(practice == 'listening')
            {
                await GetFilms(language)

                if(response.status == 200)
                    setData(response.data)

                if(response.status == 500)
                    setError("")
            }

            if(practice == 'flashcards')
            {
                setData([
                    "/images/flashcards/englishDeckBox.png",
                    "/images/flashcards/turkishDeckBox.png",
                    "/images/flashcards/germanDeckBox.png",
                    "/images/flashcards/russianDeckBox.png",
                ])
            }
        }

        GET()

    }, [])

    return (
        <>
            <div className="container max-w-screen-xl mx-auto px-4">
                <NavbarComponent></NavbarComponent>
            </div>
            <SliderComponent data={data} practice={practice}/>
        </>
    )

}