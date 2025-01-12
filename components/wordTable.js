"use client"

import formStore from '@/store/formStore';
import wordStore from '@/store/wordStore';
import React, { useEffect } from 'react';

export default function WordTable () {

    const {words} = wordStore();
    
    useEffect(() => {}, [words])
    
    return (
        <div className="bg-white w-full mx-10">
            <h2 className="text-xl text-center font-semibold mb-4">WORDS</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Word</th>
                        <th className="border border-gray-300 px-4 py-2">Answer</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {words.map((sentence, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2 text-center">{sentence.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{sentence.original}</td>
                            <td className="border border-gray-300 px-4 py-2">{sentence.own}</td>
                            <td className="border border-gray-300 px-4 py-2">{sentence.translate}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{(sentence.similarity * 100).toFixed(2)}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}