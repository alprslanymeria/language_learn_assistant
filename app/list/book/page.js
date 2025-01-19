"use client"

import { GetAllBooks} from "@/actions/book";
import { decrypt } from "@/app/lib/crypto";
import { userStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import Image from "next/image";
import TableComponent from "@/components/TableComponent";
import { useSearchParams } from "next/navigation";


export default function ListBook() {
    
    //STATE
    const [data, setData] = useState([])
    const [error, setError] = useState("")

    //STORE
    const {user} = userStore();
    const userId = decrypt(user.userId)

    useEffect(() => {

        const GET = async () => {

            const response = await GetAllBooks(userId)
            if(response.status == 200) setData(response.data)
            if(response.status == 500) setError(response.message)
        }

        GET()
        
    }, [userId])

    const columnNames = ["Name", "Image"]
    const contents = [
        (item) => <span>{item.bookName}</span>,
        (item) => <Image width={100} height={100} src={item.imagePath}></Image>
    ];
    
    return (
        
        <TableComponent width={700} columns={columnNames} contents={contents} data={data} error={error} table="book"/>
    );
}