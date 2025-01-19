"use client"

import BookSvg from "./svg/BookSvg";
import DeckSvg from "./svg/DeckSvg";
import FilmSvg from "./svg/FilmSvg";

export default function PracticeCard({ item, practice, language, index }) {
    console.log(item)
    switch (practice) {
      case 'reading':
      case 'writing':
        return <BookSvg imagePath={item}></BookSvg> 
      case 'flashcards':
        return <DeckSvg text={item} language={language} />;
      case 'listening':
        return <FilmSvg imagePath={item} index={index}></FilmSvg>
      default:
        return null;
    }
  };