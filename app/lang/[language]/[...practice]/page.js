"use client"

import InfoMessageComponent from '@/components/InfoMessageComponent'
import NavbarComponent from '@/components/NavbarComponent'
import { markazi } from "@/public/fonts"
import Link from 'next/link'
import { useEffect, useState, use } from 'react'
import { GetOldSessions } from '@/actions/oldSessions'
import { userStore } from '@/store/userStore'
import { decrypt } from '@/app/lib/crypto'
import oldSessionStore from '@/store/oldSessionStore'

export default function Practice({params}) {

    const resolvedParams = use(params);
    const language = resolvedParams.language
    const practice = resolvedParams.practice.at(0)
    
    const {oldSessions, setOldSessions} = oldSessionStore();
    const [error, setError] = useState("")

    const { user } = userStore();
    const userId = decrypt(user.userId);
    

    useEffect(() => {
        const GET = async () => {
            
            setOldSessions([])

            const response = await GetOldSessions(language, practice, userId)

            if(response.status == 200)
                setOldSessions([response.data])

            if(response.status == 500)
                setError(response.message)
        }
        
        GET()
        
    }, [language, practice, userId])
    
    return (
        <>
            <div className="container max-w-screen-xl mx-auto px-4">
                <NavbarComponent></NavbarComponent>
            </div>
            <InfoMessageComponent message="On this page, you can see the work you have done in previous sessions or open a new session."></InfoMessageComponent>
            {oldSessions.length == 0 ? (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p className={`${markazi.className} mb-10 text-xl font-normal text-center`}>You Dont Have Any! Create One</p>
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
            ) : (
                <>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <p className={`${markazi.className} mb-10 text-xl font-normal text-center`}>You Have Session! Create Another One</p>
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
                </>
                
            )}
        </>
    )
}