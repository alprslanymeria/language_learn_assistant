import SliderComponent from "@/app/components/SliderComponent";

export default async function Create({params}) {

    const what = (await params).what
    let data = []

    if(what == 'Reading' || what == 'Writing'){

        const response = await fetch('http://localhost:3000/api/book', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            }
        })

        data = await response.json()

    } else if(what == 'Listening'){

        const response = await fetch('http://localhost:3000/api/film', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            }
        })

        data = await response.json()

    } else if(what == 'Flashcards'){

        data = [
            "/images/flashcards/englishDeckBox.png",
            "/images/flashcards/turkishDeckBox.png",
            "/images/flashcards/germanDeckBox.png",
            "/images/flashcards/russianDeckBox.png",
        ]
    }

    return (
        <SliderComponent data={data} practice={what}/>
    )

}