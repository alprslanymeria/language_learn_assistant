// "use client"

// import { GetAllCategories } from "@/actions/Flashcard";
// import { GetAllWords } from "@/actions/word";
// import { decrypt } from "@/app/lib/crypto";
// import TableComponent from "@/components/TableComponent";
// import { userStore } from "@/store/userStore";
// import { useEffect, useState } from "react";

// export default function ListFlashcard(){

//     //STATE
//     const [categoryData, setCategoryData] = useState([]);
//     const [worData, setWordData] = useState([]);
//     const [error, setError] = useState("");

//     //STORE
//     const {user} = userStore();
//     const userId = decrypt(user.userId)

//     useEffect(() => {

//         const GetCategories = async () => {

//             const response = await GetAllCategories(userId)

//             if(response.status == 200) setCategoryData(response.data)

//             if(response.status == 500) setError(response.message)
//         }

//         GetCategories()

//     }, [userId])

//     useEffect(() => {

//         const GetWords = async () => {
            
//             const response = await GetAllWords(userId)
            
//             if(response.status == 200) setWordData(response.data)

//             if(response.status == 500) setError(response.message)
//         }

//         GetWords()

//     }, [userId])

//     const columnNamesForCategory = ["Name", "Image"]
//     const contentsForCategory = [
//         (item) => <span>{item.categoryName}</span>
//     ];


//     const columnNamesForWord = ["Word to Learn", "Translation"]
//     const contentsForWord = [
//         (item) => <span>{item.wordToLearn}</span>,
//         (item) => <span>{item.translatedWord}</span>
//     ];

//     return (
        
//         <>
//             <TableComponent width={300} columns={columnNamesForCategory} contents={contentsForCategory} data={categoryData} error={error} />
//             <TableComponent width={300} columns={columnNamesForWord} contents={contentsForWord} data={worData} error={error} />
//         </>
//     );
// }

"use client"
import { GetAllCategories } from "@/actions/Flashcard";
import { GetAllWords } from "@/actions/word";
import { decrypt } from "@/app/lib/crypto";
import TableComponent from "@/components/TableComponent";
import { userStore } from "@/store/userStore";
import { useEffect, useState } from "react";

export default function ListFlashcard() {
    const [categoryData, setCategoryData] = useState([]);
    const [wordData, setWordData] = useState([]);
    const [error, setError] = useState("");
    
    const { user } = userStore();
    const userId = decrypt(user.userId);

    useEffect(() => {
        const GetCategories = async () => {
            const response = await GetAllCategories(userId)
            if(response.status == 200) setCategoryData(response.data)
            if(response.status == 500) setError(response.message)
        }
        GetCategories()
    }, [userId])

    useEffect(() => {
        const GetWords = async () => {
            const response = await GetAllWords(userId)
            if(response.status == 200) setWordData(response.data)
            if(response.status == 500) setError(response.message)
        }
        GetWords()
    }, [userId])

    const columnNamesForCategory = ["Name", "Image"]
    const contentsForCategory = [
        (item) => <span className="text-gray-800">{item.categoryName}</span>
    ];

    const columnNamesForWord = ["Word to Learn", "Translation"]
    const contentsForWord = [
        (item) => <span className="text-gray-800">{item.wordToLearn}</span>,
        (item) => <span className="text-gray-800">{item.translatedWord}</span>
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Categories</h2>
                    <div className="overflow-x-auto">
                        <TableComponent 
                            width={400} 
                            columns={columnNamesForCategory} 
                            contents={contentsForCategory} 
                            data={categoryData} 
                            error={error} 
                            table="flashcardCategory"
                        />
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Words</h2>
                    <div className="overflow-x-auto">
                        <TableComponent 
                            width={400} 
                            columns={columnNamesForWord} 
                            contents={contentsForWord} 
                            data={wordData} 
                            error={error} 
                            table="word"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}