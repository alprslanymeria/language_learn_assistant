"use client"

import { markazi } from "@/public/fonts"

export default function InfoMessageComponent({message}) {
    return (
        <p className={`${markazi.className} mb-20 px-4 text-[#CA5656] text-2xl font-normal text-center`}>{message}</p>
    )
}