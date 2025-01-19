"use client"

// REACT & NEXT
import { useEffect, useState, use } from 'react'
import Link from 'next/link'
// 3RD PARTY
import { decrypt } from '@/app/lib/crypto'
import { markazi } from "@/public/fonts"
// STORE
import { userStore } from '@/store/userStore'
import oldSessionStore from '@/store/oldSessionStore'
import { sessionStore } from '@/store/sessionStore'
// COMPONENTS
import InfoMessageComponent from '@/components/InfoMessageComponent'
// ACTIONS
import { GetOldSessions } from '@/actions/oldSessions'

export default function PracticeComponent({language, practice}) {

    // STORE
    const {oldSessions, setOldSessions} = oldSessionStore();
    const {setInfo} = sessionStore();
    const { user } = userStore();

    // STATES
    const [error, setError] = useState("")

    // CONSTANTS
    const userId = decrypt(user.userId);
    

    useEffect(() => {

        setInfo({language: language, practice: practice, imagePath: "" })
        const GET = async () => {
            
            const response = await GetOldSessions(language, practice, userId)

            if(response.status == 200)
                setOldSessions([response.data])

            if(response.status == 500)
                setError(response.details)
        }
        
        GET()
        
    }, [language, practice, userId])

    return (

        <>
            <InfoMessageComponent message="On this page, you can see the work you have done in previous sessions or open a new session."></InfoMessageComponent>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p className={`${markazi.className} mb-10 text-xl font-normal text-center`}>{oldSessions.length == 0 ? "You Dont Have Any! Create One" : "You Have Session! Create Another One"}</p>
                <Link href={`/create/?language=${language}&practice=${practice}`} passHref>
                    <button
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: '#007BFF',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Create New Session
                    </button>
                </Link>
            </div>

            {oldSessions.length != 0 ?

                <div className="container max-w-lg rounded-lg mx-auto bg-[#4D5B6C] p-5 mt-5">
                    <div>
                        {oldSessions.map(subArray => 
                        subArray.map((session, index) => (
                            <Link href={`/detail/?id=${session.id}`} passHref>
                                <div 
                                    key={index}
                                    className="flex justify-between bg-white p-4 mb-3 rounded shadow-sm"
                                    >
                                    <p className="text-gray-800">{session.createdOn}</p>
                                    <p className="text-gray-600 m-0">Rate: {session.rate}/100</p>
                                </div>
                            </Link>
                        ))
                        )}
                    </div>
                </div>
                : null
            }
        </>
    );
}