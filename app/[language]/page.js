import Link from "next/link"
import { mitr } from "@/public/fonts"
import InfoMessageComponent from "../components/InfoMessageComponent"

const BASE = process.env.NEXT_PUBLIC_API_URL

export default async function Language({params}) {

    const language = (await params).language
    const response = await fetch(`${BASE}/api/practice`,
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const practices = await response.json()

    return (
        <>
        <InfoMessageComponent message="Please choose which practice you would like to do"></InfoMessageComponent>
        {
            practices.map((item,index) => {
                return (
                    <div key={index} className="flex justify-center">
                    <Link href={`/${language}/${item.practice}`}>
                        <button
                        className={` ${mitr.className} w-64 text-xl mt-5 bg-[#B95DE5] text-white font-medium py-2 rounded-lg shadow-md shadow-[#ad49db] hover:bg-[#ad49db] transition-colors duration-300`}
                        >
                        {item.practice}
                        </button>
                    </Link>
                </div>
                )
            })
        }
        </>
    )
}