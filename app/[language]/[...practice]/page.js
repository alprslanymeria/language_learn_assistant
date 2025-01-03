import InfoMessageComponent from '@/app/components/InfoMessageComponent'
import { redirect } from 'next/dist/server/api-utils'
import { cookies } from 'next/headers'
import { markazi } from "@/public/fonts"
import Link from 'next/link'

const BASE = process.env.NEXT_PUBLIC_API_URL

export default async function Practice({params}) {

    const language = (await params).language
    const practice = (await params).practice
    const {value: accessToken} = (await cookies()).get('accessToken') ?? {value: null}
    let data = []

    const response = await fetch(`${BASE}/api/oldsessions?language=${language}&practice=${practice}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken,
      },
      credentials: 'include',
    })


    if(response.status == 401)
        redirect('/')
    else if(response.status == 200)
    {
        data = await response.json()
    }
    
    return (
        <>
            <InfoMessageComponent message="On this page, you can see the work you have done in previous sessions or open a new session."></InfoMessageComponent>
            {data.length == 0 ? (
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
                    {data.map((session, index) => (
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