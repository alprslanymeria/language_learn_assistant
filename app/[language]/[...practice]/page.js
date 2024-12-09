import { cookies } from 'next/headers';

export default async function Practice({params, req}) {

    //Bu parametreler query olarak gönderiliir
    const practice = (await params).practice
    const language = (await params).language
    const {value: token} = (await cookies()).get('token') ?? {value: null}


    const response = await fetch(`http://localhost:3000/api/oldsessions?language=${language}&practice=${practice}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        credentials: 'include',
      });


    //Burada alınan language ve practice bilgisi ile veritabanından userId ile birlikte o kullanıcıya ait veriler çekilir
    
    return (
        <>
            <h1>{practice}</h1>
            <h1>{language}</h1>
        </>
    );
}