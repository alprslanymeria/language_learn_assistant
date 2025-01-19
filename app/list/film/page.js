"use client"

import { GetAllFilms } from "@/actions/film";
import { decrypt } from "@/app/lib/crypto";
import { userStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import Image from "next/image";
import TableComponent from "@/components/TableComponent";

export default function ListFilm() {

    //STATE
    const [data, setData] = useState([]);
    const [error, setError] = useState("")

    //STORE
    const {user} = userStore();
    const userId = decrypt(user.userId)

    useEffect(() => {

        const GET = async () => {

            const response = await GetAllFilms(userId)
            if(response.status == 200) setData(response.data)
            if(response.status == 500) setError(response.message)
        }

        GET();

    }, [userId])

    const columnNames = ["Name", "Image"]
    const contents = [
        (item) => <span>{item.filmName}</span>,
        (item) => <Image width={100} height={100} src={item.imagePath}></Image>
    ];

    return(


        <TableComponent width={700} columns={columnNames} contents={contents} data={data} error={error} table="film"/>
    );
}