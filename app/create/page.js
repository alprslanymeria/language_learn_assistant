import SliderComponent from "@/app/components/SliderComponent";
import { getSecretKey } from "@/app/lib/jwt";
import { cookies } from "next/headers";

const BASE = process.env.NEXT_PUBLIC_API_URL

export default async function Create({searchParams}) {

    const practice = searchParams.practice
    const language = searchParams.language
    const {value: accessToken} = (await cookies()).get('accessToken') ?? {value: null}
    let data = []
    
    //FOR SLIDER COMPONENT
    const { payload } = await jwtVerify(accessToken, getSecretKey());
    const userId = payload.userId;

    //FETCH DATA
    if(practice == 'reading' || practice == 'writing'){

        const response = await fetch(`${BASE}/api/book?language=${language}&practice=${practice}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            }
        })

        data = await response.json()

    } else if(practice == 'listening'){

        const response = await fetch(`${BASE}/api/film?language=${language}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            }
        })

        data = await response.json()

    } else if(practice == 'flashcards'){

        data = [
            "/images/flashcards/englishDeckBox.png",
            "/images/flashcards/turkishDeckBox.png",
            "/images/flashcards/germanDeckBox.png",
            "/images/flashcards/russianDeckBox.png",
        ]
    }

    return (
        <SliderComponent data={data} practice={practice} userId={userId}/>
    )

}