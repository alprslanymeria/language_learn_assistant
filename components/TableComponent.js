"use client"

import Delete from "@/public/svg/delete.svg"
import Edit from "@/public/svg/edit.svg"
import { useRouter } from "next/navigation"

export default function TableComponent({width, columns, contents, data, error, table}) {

    const router = useRouter();

    const handleDelete = () => {

    }

    const handleEdit = (id) => {

        router.push(`http://localhost:3000/edit?id=${id}&table=${table}`)
    }

     return (
             <div className="container max-w-screen-xl mx-auto px-4">
                 {error && <div className="text-red-600 mb-4">{error}</div>}
                 <div className="flex justify-center">
                     <div className="overflow-x-auto">
                         <table className={`w-[${width}px] table-auto bg-white border border-gray-300`}>
                             <thead>
                                 <tr className="bg-gray-100 text-gray-700">
     
                                     {columns.map((name) => (
                                         <th className="px-4 py-2 text-center">{name}</th>
                                     ))}
     
                                     <th className="px-4 py-2 text-left" style={{ width: '75px' }}></th>
                                     <th className="px-4 py-2 text-left" style={{ width: '75px' }}></th>
                                 </tr>
                             </thead>
     
                             <tbody>
                                 {data.length > 0 ? (
                                     data.map((item, index) => (
                                         <tr key={index} className="hover:bg-gray-50">
     
                                             {contents.map((content) => (
                                                 <td className="px-4 py-2 border-b text-center">{content(item)}</td>
                                             ))}
     
                                             <td className="px-4 py-2 border-b text-center">
                                                 <button className="w-[30px]" onClick={() => handleEdit(item.id)}>
                                                     <Edit className="text-blue-500"></Edit>
                                                 </button>
                                             </td>
                                             <td className="px-4 py-2 border-b text-center">
                                                 <button className="w-[30px]" onClick={() => handleDelete(item.id)}>
                                                     <Delete className="text-red-500" ></Delete>
                                                 </button>
                                             </td>
                                         </tr>
                                     ))
                                 ) : (
                                     <></>
                                 )}
                             </tbody>
                         </table>
                     </div>
                 </div>
             </div>
         );
}