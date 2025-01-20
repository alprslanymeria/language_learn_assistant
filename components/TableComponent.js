"use client"

import { deleteById } from "@/actions/crud";
import Delete from "@/public/svg/delete.svg"
import Edit from "@/public/svg/edit.svg"
import { useRouter } from "next/navigation"

export default function TableComponent({width, columns, contents, data, error, table}) {

    const router = useRouter();

    const handleDelete = async (id) => {

        const response = await deleteById(id, table)

        if(response.status == 200) router.refresh()
        if(response.status == 500) alert(response.message)
    }

    const handleEdit = (id) => {

        router.push(`http://localhost:3000/edit?id=${id}&table=${table}`)
    }

    const handleCreate = () => {

        router.push(`http://localhost:3000/add?table=${table}`)
    }

     return (
             <div className="container max-w-screen-xl mx-auto px-4">
                 {error && <div className="text-red-600 mb-4">{error}</div>}
                 <div className="flex justify-center">
                     <div className="overflow-x-auto">
                        <table style={{ width: `${width}px` }} className="table-auto bg-white border border-gray-300">
                             <thead>
                                 <tr className="bg-gray-100 text-gray-700">
     
                                     {columns.map((name) => (
                                         <th className="px-4 py-2 text-center">{name}</th>
                                     ))}
     
                                     {/* <th className="px-4 py-2 text-left" style={{ width: '75px' }}></th> */}
                                     <th className="px-4 py-2 text-left" style={{ width: '75px' }} colSpan={2}>
                                        <button 
                                            onClick={() => handleCreate()} 
                                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                                        >
                                            Create
                                        </button>
                                     </th>
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