"use server"

import { v2 } from '@google-cloud/translate';

const { Translate, TranslateRequest } = v2;

//CLIENT
const translate = new Translate({
    key: process.env.GOOGLE_TRANSLATE_API_KEY,
});


export async function translateText(inputText, language, practice) {

    let target = '';

    if(practice == 'reading' || practice == 'listening')
    {
        if(language == 'english') {target = 'en';}
        if(language == 'turkish') {target = 'tr';}
        if(language == 'german') {target = 'de';}
        if(language == 'russian') {target = 'ru';}
    }

    if(practice == 'writing') {target = 'tr'}

    let [translations] = await translate.translate(inputText, target);
    translations = Array.isArray(translations) ? translations : [translations];

    return translations;
  }