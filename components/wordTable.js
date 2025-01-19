"use client"

import wordStore from '@/store/wordStore';
import React, { useEffect } from 'react';
import CheckIcon from '@/public/svg/check.svg';
import FailIcon from '@/public/svg/fail.svg';

export default function WordTable () {

    const {words} = wordStore();
    
    useEffect(() => {}, [words])
    
    return (
        <div className="mt-8 w-full bg-white">
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Word</th>
                        <th className="border border-gray-300 px-4 py-2">Answer</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {words.map((word, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2 text-center">{word.word}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{word.answer}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{word.status ? <CheckIcon></CheckIcon> : <FailIcon></FailIcon>}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}