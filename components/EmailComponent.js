"use client"

// REACT & NEXT
import { useState } from "react";
import Link from "next/link";
// ACTIONS
import { logout } from "@/actions/auth";
// STORE
import { userStore } from "@/store/userStore";


export default function Email({email}){
    
    const { setUser} = userStore();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }

    const handleLogout = async () => {
        
        setUser({ userId: "", email: ""});
        await logout();
        router.push("/")
    }


    return(
        <div className="flex items-center space-x-4">
            {email === "empty" ? (
                <>
                    <Link className="bg-blue-500 text-white px-4 py-2 rounded-lg" href="/login">Login</Link>
                    <Link className="bg-green-500 text-white px-4 py-2 rounded-lg" href="/signup">Signup</Link>
                </>
            ) : (
                <div className="relative">
                    <button onClick={toggleDropdown} className="text-black px-4 py-2 rounded-lg">
                        {email}
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

    );
}