"use client"

import Image from "next/image"
import { useState } from "react"

export default function SliderComponent({data, practice}) {
   
   const [selectedImageUrl, setSelectedImageUrl] = useState(null)

   const getImageUrl = (item) => practice === 'flashcards' ? item : item.imagePath
 
   return (
       <div className="flex justify-center w-full">
           <div className="carousel rounded-box flex md:flex-row flex-col space-y-4 md:space-y-0 md:space-x-4 gap-5 h-[550px] overflow-y-auto items-center px-10">
               {data.map((item,index) => (
                   <div
                       key={index}
                       className={`carousel-item flex-shrink-0 cursor-pointer transform transition-all duration-300 ${
                           practice === 'listening'
                               ? 'w-[400px] flex flex-col'
                               : 'w-[300px] h-[487px] relative'
                       } ${
                           selectedImageUrl === getImageUrl(item)
                           ? 'scale-110 shadow-lg'
                           : 'hover:scale-102'
                       }`}
                       onClick={() => setSelectedImageUrl(getImageUrl(item))}
                   >
                       {practice === 'listening' ? (
                           <>
                               <div className="relative h-[400px] w-full">
                                   <Image
                                       src={item.imagePath}
                                       fill
                                       className="rounded-lg"
                                       sizes="(max-width: 768px) 100vw, 50vw"
                                   />
                               </div>
                               <p className="text-center mt-2 text-lg font-medium">{item.filmName}</p>
                           </>
                       ) : (
                           <Image
                               src={getImageUrl(item)}
                               fill
                               sizes="(max-width: 768px) 100vw, 50vw"
                               className={practice !== 'flashcards' ? "rounded-lg" : ""}
                           />
                       )}
                   </div>
               ))}
           </div>
       </div>
   )
}