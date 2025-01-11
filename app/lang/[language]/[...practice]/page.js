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
    const practice = resolvedParams.practice
    
    const {oldSessions, setOldSessions} = oldSessionStore();
    const [error, setError] = useState("")

    const { user } = userStore();
    const userId = decrypt(user.userId);
    

    useEffect(() => {
        const GET = async () => {

            const response = await GetOldSessions(language, practice, userId)

            if(response.status == 200)
                setOldSessions(response.data)

            if(response.status == 500)
                setError(response.message)
        }
        
        GET()
        
    }, [])
    
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
                <div style={{ backgroundColor: '#003366', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
                    <h2 style={{ color: 'white', marginBottom: '20px' }}>Previous Sessions</h2>
                    {oldSessions.map((session, index) => (
                        <div
                            key={index}
                            style={{
                                backgroundColor: 'white',
                                padding: '15px',
                                marginBottom: '10px',
                                borderRadius: '5px',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <p style={{ margin: 0, fontWeight: 'bold' }}>{session.createdOn}</p>
                            <p style={{ margin: 0 }}>Rate: {session.rate}/100</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}