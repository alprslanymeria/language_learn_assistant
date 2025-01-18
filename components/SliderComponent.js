"use client"

// REACT & NEXT
import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
// STORE
import { sessionStore } from "@/store/sessionStore";
import { userStore } from "@/store/userStore";
// ACTIONS
import { saveLiveSession } from "@/actions/liveSession";
// 3RD PARTY
import { encrypt } from "@/app/lib/crypto";
import { v4 as uuidv4 } from 'uuid';
import DeckSvg from "./svg/DeckSvg";

export default function SliderComponent({data, practice, language}) {
   
    //STORES
    const {user} = userStore();
    const {setInfo} = sessionStore();

    //HOOKS
    const router = useRouter();
    const [selectedImageUrl, setSelectedImageUrl] = useState(null)

    // FLASHCARDS SEÇİLDİ İSE O DİLE AİT KATEGORİLER VERİTABANINDAN ALINIR.
    // DAHA SONRA O RESMİN TEXT BÖLÜMÜNE KATEGORİ İSİMLERİ YAZILIR.

    //FUNCTIONS
    const getImageUrl = (item) => practice === 'flashcards' ? item : item.imagePath
    const buttonHandler = async (e) => {
        
        e.preventDefault();
        
        const sessionId = uuidv4();
        const response = await saveLiveSession(sessionId, user.userId);

        if(response.status != 200)
        {
            alert('ZATEN BİR SESSION HALİ HAZIRDA MEVCUT.. ANA SAYFAYA YÖNLENDİRİLİYORSUNUZ..');
            setTimeout(() => {
                router.push('/');
            }, 2000); 
        }

        //ENCRYPT FIRST
        const encryptedSessionId = encrypt(sessionId)
        //THEN ENCODE URL SAFE
        const safeUrl = encodeURIComponent(encryptedSessionId)

        if(practice == 'flashcards')
            setInfo({language: language, practice: practice, imagePath: `/images/flashcards/${language}DeckBox.png`, sessionId: encryptedSessionId});
        else
            setInfo({language: language, practice: practice, imagePath: selectedImageUrl, sessionId: encryptedSessionId});

        router.push(`http://localhost:3000/session?id=${safeUrl}`);

   }

   return (
    <>
        <div className="flex justify-center w-full">
            <div className="carousel rounded-box flex md:flex-row flex-col space-y-4 md:space-y-0 md:space-x-4 gap-5 h-[550px] overflow-y-auto items-center px-10">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className={`carousel-item flex-shrink-0 cursor-pointer transform transition-all duration-300 ${
                            practice === 'listening'
                                ? 'w-[400px] flex flex-col'
                                : 'w-[300px] h-[487px] relative'
                        } ${
                            selectedImageUrl === getImageUrl(item)
                            ? 'scale-110'
                            : 'hover:scale-102'
                        }`}
                        onClick={() => setSelectedImageUrl(getImageUrl(item))}
                    >
                        {practice === 'flashcards' ? (
                            <DeckSvg text={item} language={language}></DeckSvg>
                        ) : practice === 'listening' ? (
                            <>
                                <div className="relative h-[400px] w-full">
                                    <Image
                                        src={item.imagePath}
                                        fill
                                        alt={item.id}
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
                                alt={item.id}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="rounded-lg"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>

        <div className="w-full flex justify-center mb-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={buttonHandler}>CHOOSE</button>
        </div>
    </>
)
 
//    return (
//     <>
//         <div className="flex justify-center w-full">
//             <div className="carousel rounded-box flex md:flex-row flex-col space-y-4 md:space-y-0 md:space-x-4 gap-5 h-[550px] overflow-y-auto items-center px-10">
//                 {data.map((item,index) => (
//                     <div
//                         key={index}
//                         className={`carousel-item flex-shrink-0 cursor-pointer transform transition-all duration-300 ${
//                             practice === 'listening'
//                                 ? 'w-[400px] flex flex-col'
//                                 : 'w-[300px] h-[487px] relative'
//                         } ${
//                             selectedImageUrl === getImageUrl(item)
//                             ? 'scale-110'
//                             : 'hover:scale-102'
//                         }`}
//                         onClick={() => setSelectedImageUrl(getImageUrl(item))}
//                     >
//                         {practice === 'listening' ? (
//                             <>
//                                 <div className="relative h-[400px] w-full">
//                                     <Image
//                                         src={item.imagePath}
//                                         fill
//                                         alt={item.id}
//                                         className="rounded-lg"
//                                         sizes="(max-width: 768px) 100vw, 50vw"
//                                     />
//                                 </div>
//                                 <p className="text-center mt-2 text-lg font-medium">{item.filmName}</p>
//                             </>
//                         ) : (
//                             <Image
//                                 src={getImageUrl(item)}
//                                 fill
//                                 alt={item.id}
//                                 sizes="(max-width: 768px) 100vw, 50vw"
//                                 className={practice !== 'flashcards' ? "rounded-lg" : ""}
//                             />
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </div>

//         <div className="w-full flex justify-center mb-2">
//             <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={buttonHandler}>CHOOSE</button>
//         </div>
//     </>
       
//    )
}


