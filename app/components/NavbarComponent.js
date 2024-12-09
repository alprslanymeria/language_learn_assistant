import { neuton } from "@/public/fonts"

export default function NavbarComponent() {
    return (
        <nav className="bg-[#F4CC15] px-5 py-5 my-10 rounded-lg">
            <p className={`text-lg sm:text-3xl md:text-5xl font-normal tracking-widest text-black text-left ${neuton.className}`}>
                LANGUAGE LEARN ASSISTANT
            </p>
        </nav>
    )
}
