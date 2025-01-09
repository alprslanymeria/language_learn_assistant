"use client"

import { login } from '@/actions/auth';
import { useActionState } from "react";
import Link from 'next/link';
import NavbarComponent from "@/components/NavbarComponent";

export default function Login() {

    const [state, loginAction] = useActionState(login, undefined);

    return (
        <>
            <div className="container max-w-screen-xl mx-auto px-4">
                <NavbarComponent></NavbarComponent>
            </div>
            <div className="flex items-center justify-center">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                    <h2 className="text-2xl font-bold text-center">Login</h2>
                    <form action={loginAction} className="space-y-4">
                    <input type="hidden" name="returnUrl"></input>
                        <div>
                            {state?.errors?.email && <p className="text-sm text-red-500">{state.errors.email}</p>}
                            {state?.errors?.password && <p className="text-sm text-red-500">{state.errors.password}</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                        Login
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account? <Link href="/signup">Sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
        
    );
}