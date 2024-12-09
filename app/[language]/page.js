import Link from "next/link";
import { mitr } from "@/public/fonts";
import InfoMessageComponent from "../components/InfoMessageComponent";

export default async function Language({params}) {

    const language = (await params).language
    const practices = [
        "Listening",
        "Reading",
        "Writing",
        "Flashcards"
    ]

    return (
        <>
        <InfoMessageComponent message="Please choose which practice you would like to do"></InfoMessageComponent>
        {
            practices.map(practice => {
                return (
                    <div className="flex justify-center">
                    <Link href={`/${language}/${practice}`}>
                        <button
                        className={` ${mitr.className} w-64 text-xl mt-5 bg-[#B95DE5] text-white font-medium py-2 rounded-lg shadow-md shadow-[#ad49db] hover:bg-[#ad49db] transition-colors duration-300`}
                        >
                        {practice}
                        </button>
                    </Link>
                </div>
                )
            })
        }
        </>
    );
}