"use client"

import { useRouter } from 'next/navigation';
import React from 'react';
//STORES
import formStore from '@/store/formStore';
import { userStore } from '@/store/userStore';
import oldSessionStore from '@/store/oldSessionStore';
import { sessionStore } from '@/store/sessionStore';
//UTILS
import { decrypt } from '@/app/lib/crypto';
//ACTIONS
import { translateText } from '@/actions/translate';
import { rate } from '@/actions/rate';
import { GetOldSessions, SaveOldSession } from '@/actions/oldSessions';
import { SaveSentences } from '@/actions/sentences';
import { DeleteLiveSession } from '@/actions/liveSession';

export default function FormComponent(){

    const router = useRouter();

    //STORES
    const {selectedText, inputText, translatedText, showTranslation, sentences} = formStore();
    const {setSelectedText, setInputText, setTranslatedText, setShowTranslation, setSentences} = formStore();
    const {oldSessions, setOldSessions} = oldSessionStore();
    const {info} = sessionStore();
    const {user} = userStore();
    const oldSessionId = decrypt(info.sessionId)
    const userId = decrypt(user.userId)
    const language = info.language
    const practice = info.practice
    const imagePath = info.imagePath

    //FUNCTIONS
    const handleTextSelection = () => {
        const selected = window.getSelection().toString();
        setSelectedText(selected);
        setShowTranslation(false);
    };

    const handleTranslate= async () => {
        const translations = await translateText(inputText, language, practice);
        setTranslatedText(translations);
        setShowTranslation(true);
    };

    const calculateRate = async () => {

        //CHECK
        if (!selectedText || !translatedText) {
            alert('Gerekli alanları doldurunuz.');
            return;
        }

        //CALCULATE SIMILARITY
        const similarity = await rate(selectedText, translatedText.at(0))
        alert(`Benzerlik oranı: ${(similarity * 100).toFixed(2)}%`);

        //SAVED TO STATE
        const sentence = {
            oldSessionId: oldSessionId,
            original: selectedText,
            own: inputText,
            translate: translatedText.at(0),
            similarity: similarity
        }
        setSentences([...sentences, sentence])

        //CLEAR STATES
        setSelectedText('');
        setInputText('');
        setTranslatedText('');
        setShowTranslation(false);
    }

    const closeAndSave = async () => {

        //CALCULATE AVARAGE RATE
        const totalRate = sentences.reduce((acc, item) => acc + item.similarity, 0)
        const averageRate = totalRate / sentences.length;

        //SAVE TO OLDSESSIONS TABLE
        const row = {
            oldSessionId: oldSessionId,
            userId: userId,
            language: language,
            practice: practice,
            rate: (averageRate * 100).toFixed(2),
            imagePath: imagePath
        }
        const result = await SaveOldSession(row)

        if(result.status != 200)
        {
            alert(result.details)
            return
        }

        //SAVE TO SENTENCES TABLE
        const response = await SaveSentences(sentences)

        if(response.status != 200)
        {
            alert(response.message)
            return
        }

        //DELETE LİVE SESSION FROM TABLE
        const deleteResult = await DeleteLiveSession(userId, oldSessionId)

        if(deleteResult.status != 200)
        {
            alert(deleteResult.message)
            return
        }

        //UPDATE OLDSESSIONS
        const oldSessionResult = await GetOldSessions(language, practice, userId)
        if(oldSessionResult.status != 200)
        {
            alert(oldSessionResult.message)
            return
        }

        setOldSessions([oldSessionResult.data])

        //CLEAR STATES
        setSelectedText('');
        setInputText('');
        setTranslatedText('');
        setShowTranslation(false);
        setSentences([])

        //REDIRECT TO HOME PAGE
        router.push('/')
    }

    return (

        <div className="w-1/2">
            <div className="bg-white">
                <div className="space-y-4">
                    <textarea
                        readOnly
                        value={selectedText}
                        placeholder="Selected text will appear here"
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type your text here"
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                
                    {showTranslation && (
                        <textarea
                            readOnly
                            value={translatedText}
                            placeholder="Translation will appear here"
                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    )}

                    <div className='flex gap-4'>
                        <button onClick={handleTextSelection} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">Select Text</button>
                        <button onClick={handleTranslate} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">Translate</button>
                        <button onClick={calculateRate} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">Calculate</button>
                        <button onClick={closeAndSave} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">Close & Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}