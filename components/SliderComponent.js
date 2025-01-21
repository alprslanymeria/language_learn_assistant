"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sessionStore } from "@/store/sessionStore";
import { userStore } from "@/store/userStore";
import { saveLiveSession } from "@/actions/liveSession";
import { encrypt } from "@/app/lib/crypto";
import { v4 as uuidv4 } from 'uuid';
import PracticeCard from "./PracticeCardComponent";


export default function SliderComponent({ data, practice, language }) {

  const router = useRouter();

  //STATE
  const [selectedItem, setSelectedItem] = useState(null);

  //STORE
  const { user } = userStore();
  const {setInfo} = sessionStore();


  const buttonHandler = async (e) => {
    e.preventDefault();
    
    const sessionId = uuidv4();
    const response = await saveLiveSession(sessionId, user.userId);

    if (response.status !== 200) {
      alert('ZATEN BİR SESSION HALİ HAZIRDA MEVCUT.. ANA SAYFAYA YÖNLENDİRİLİYORSUNUZ..');
      setTimeout(() => {
        router.push('/');
      }, 2000);
      return;
    }

    const encryptedSessionId = encrypt(sessionId);
    const safeUrl = encodeURIComponent(encryptedSessionId);

    // BURADAKİ BİLGİLERE SESSION SAYFASINDA İHTİYAÇ DUYULUR
    practice == 'flashcards'
    ? setInfo({categoryName: selectedItem, sessionId: encryptedSessionId})
    : setInfo({imagePath: selectedItem.imagePath, sessionId: encryptedSessionId})

    router.push(`http://localhost:3000/session?id=${safeUrl}`);
  };

  return (
    <>
      <div className="flex justify-center w-full">
        <div className="carousel rounded-box flex md:flex-row flex-col space-y-4 md:space-y-0 md:space-x-4 gap-5 h-[550px] overflow-y-auto items-center px-10">
          {data.map((item, index) => (
            <div
              key={index}
              className={`carousel-item flex-shrink-0 cursor-pointer transform transition-all duration-300 ${
                practice === 'listening'
                  ? 'w-[200px] sm:w-[300px] md:w-[400px] flex flex-col'
                  : 'w-[200px] h-[324px] sm:w-[250px] sm:h-[406px] md:w-[300px] md:h-[487px] relative'
              } ${
                selectedItem === item
                  ? 'scale-110'
                  : 'hover:scale-102'
              }`}
              onClick={() => setSelectedItem(item)}
            >
              <PracticeCard 
                index={index}
                item={item}
                practice={practice}
                language={language}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-center my-2">
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={buttonHandler}
        >
          CHOOSE
        </button>
      </div>
    </>
  );
}