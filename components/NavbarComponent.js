"use client"

import { logout } from "@/actions/auth";
import { neuton } from "@/public/fonts"
import { userStore } from "@/store/userStore"
import Link from "next/link";
import { useState } from "react";

export default function NavbarComponent() {

    const { user } = userStore();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }

    const handleLogout = async () => {
        
        await logout();
    }

    return (

        <nav className="bg-[#F4CC15] px-5 py-5 my-10 rounded-lg">
            <div className="flex items-center justify-between">
                <p className={`text-lg sm:text-3xl md:text-5xl font-normal tracking-widest text-black text-left ${neuton.className}`}>
                    LANGUAGE LEARN ASSISTANT
                </p>

                <div className="flex items-center space-x-4">
                    {user.email === "" ? (
                        <>
                            <Link className="bg-blue-500 text-white px-4 py-2 rounded-lg" href="/login">Login</Link>
                            <Link className="bg-green-500 text-white px-4 py-2 rounded-lg" href="/signup">Signup</Link>
                        </>
                    ) : (
                        <div className="relative">
                            <button onClick={toggleDropdown} className="text-black px-4 py-2 rounded-lg">
                                {user.email}
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 bg-white border shadow-lg rounded-lg w-40 mt-2">
                                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200">
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>

        // <nav className="bg-[#F4CC15] px-5 py-5 my-10 rounded-lg">
        //     <p className={`text-lg sm:text-3xl md:text-5xl font-normal tracking-widest text-black text-left ${neuton.className}`}>
        //         LANGUAGE LEARN ASSISTANT
        //     </p>

        //     <div className="flex items-center space-x-4 mt-3">
        //         {user.email === "" ? (
        //             <>
        //                 <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Login</button>
        //                 <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Signup</button>
        //             </>
        //         ) : (
        //             <div className="relative">
        //                 <button onClick={toggleDropdown} className="text-black px-4 py-2 rounded-lg">
        //                     {user.email}
        //                 </button>
        //                 {dropdownOpen && (
        //                     <div className="absolute right-0 bg-white border shadow-lg rounded-lg w-40 mt-2">
        //                         <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200">
        //                             Logout
        //                         </button>
        //                     </div>
        //                 )}
        //             </div>
        //         )}
        //     </div>
        // </nav>
    )
}


// user.email == "" ise login ve signup butonlarını göster
// user.email != "" ise user.email i göster ve ona tıklanınca dropdown açılsın ve logout seçeneği olsun