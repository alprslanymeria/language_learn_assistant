"use server"

import stringSimilarity from 'string-similarity';

export async function rate(selectedText, translatedText) {
    if (typeof selectedText !== 'string' || typeof translatedText !== 'string') {
        throw new Error('Both selectedText and translatedText must be strings');
    }
    const similarity = stringSimilarity.compareTwoStrings(selectedText, translatedText);
    return similarity;
}