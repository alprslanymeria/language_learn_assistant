"use client"

import EnglishFull from "@/components/svg/englishFull";
import EnglishHalf from "@/components/svg/englishHalf";
import GermanFull from "@/components/svg/germanFull";
import GermanHalf from "@/components/svg/germanHalf";
import RussianFull from "@/components/svg/russianFull";
import RussianHalf from "@/components/svg/russianHalf";
import TurkishFull from "@/components/svg/turkishFull";
import TurkishHalf from "@/components/svg/turkishHalf";
import { useState } from "react";

export default function Page() {

    const [selected, setSelected] = useState(false);

    return (

    <div className="flex justify-center items-end w-full h-[655px]">

        {/* {selected ? <EnglishHalf text1={"PLAY"}></EnglishHalf> : <EnglishFull text1={"PLAY"} text2={"OYNAMAK"}></EnglishFull>} */}
        {selected ? <TurkishHalf></TurkishHalf> : <TurkishFull></TurkishFull>}
        {/* {selected ? <RussianHalf></RussianHalf> : <RussianFull></RussianFull>} */}
        {/* {selected ? <GermanHalf></GermanHalf> : <GermanFull></GermanFull>} */}

      
        <button onClick={() => setSelected(!selected)}>Click me</button>
    </div>

    );
}


// FIRST



// // SECOND


// <svg className="h-[655px]" width="322" height="655" viewBox="0 0 645 1311" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path fill-rule="evenodd" clip-rule="evenodd" d="M113.653 1307.5L642 1248.22V563.827L113.653 642.213C113.653 642.213 46.2125 594.439 3 563.827C3 831.098 3 1248.22 3 1248.22L113.653 1307.5Z" fill="#D9D9D9"/>
//             <path d="M113.653 642.213L642 563.827L566.522 488.077L540.673 491.551V534.028L113.653 594.749V550.439L3 563.827L113.653 642.213Z" fill="white"/>
//             <path d="M113.653 642.213L642 563.827M113.653 642.213C113.653 642.213 46.2125 594.439 3 563.827M113.653 642.213V1307.5M113.653 642.213L3 563.827M113.653 1307.5L642 1248.22V563.827M113.653 1307.5L3 1248.22C3 1248.22 3 831.098 3 563.827M642 563.827L566.522 488.077L540.673 491.551M3 563.827C46.2125 558.599 113.653 550.439 113.653 550.439M3 563.827L113.653 550.439M540.673 534.028C540.673 534.028 540.673 508.139 540.673 491.551M540.673 534.028L113.653 594.749V550.439M540.673 534.028V491.551M540.673 491.551C540.673 387.652 540.673 3 540.673 3C373.911 21.9063 280.414 32.5063 113.653 51.4126V550.439" stroke="black" stroke-width="5"/>
//             <path d="M150.292 976.503V679.1L606.825 605.326V912.939M150.292 976.503V1273.91L606.825 1220.55V912.939M150.292 976.503L227.236 965.79C346.681 818.802 411.498 809.476 523.286 924.57L606.825 912.939" stroke="white" stroke-width="10"/>
//             <path d="M151.025 976.174V679.1L608.291 605.326V913.268M151.025 976.174V1273.25L608.291 1221.21V913.268M151.025 976.174L227.969 965.589C347.624 813.962 411.562 811.416 521.088 925.265L608.291 913.268" stroke="#FF0000" stroke-width="3"/>
//             <path d="M19.1216 1238.34V607.96L90.203 660.656V1280.49L19.1216 1238.34Z" stroke="white" stroke-width="10"/>
//             <path d="M17.656 1239V609.278L92.4014 662.633V1280.49L17.656 1239Z" stroke="#FF0000" stroke-width="3"/>
//             <text x="330" y="200" fill="black" font-size="40" font-family="Arial" text-anchor="middle" transform="rotate(-8, 330, 200)">PLAY</text>
//             <text x="330" y="400" fill="black" font-size="40" font-family="Arial" text-anchor="middle" transform="rotate(-7, 330, 200)">OYNAMAK</text>
//         </svg>

//         :
//         // YARIM HALİ
//         <svg className=" h-[530px]" width="322" height="530" viewBox="0 0 645 1061" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path fill-rule="evenodd" clip-rule="evenodd" d="M113.653 1057.99L642 998.704V314.314L113.653 392.7C113.653 392.7 46.2125 344.926 3 314.314C3 581.585 3 998.704 3 998.704L113.653 1057.99Z" fill="#D9D9D9"/>
//             <path d="M113.653 392.7L642 314.314L566.522 238.564L540.673 242.039V284.515L113.653 345.236V300.926L3 314.314L113.653 392.7Z" fill="white"/>
//             <path d="M113.653 392.7L642 314.314M113.653 392.7C113.653 392.7 46.2125 344.926 3 314.314M113.653 392.7V1057.99M113.653 392.7L3 314.314M113.653 1057.99L642 998.704V314.314M113.653 1057.99L3 998.704C3 998.704 3 581.585 3 314.314M642 314.314L566.522 238.564L540.673 242.039M3 314.314C46.2125 309.086 113.653 300.926 113.653 300.926M3 314.314L113.653 300.926M540.673 284.515C540.673 284.515 540.673 258.627 540.673 242.039M540.673 284.515L113.653 345.236V300.926M540.673 284.515V242.039M540.673 242.039C540.673 138.139 540.673 2.99988 540.673 2.99988C373.911 21.9062 280.414 32.5062 113.653 51.4125V300.926" stroke="black" stroke-width="5"/>
//             <path d="M150.292 726.99V429.587L606.826 355.813V663.426M150.292 726.99V1024.39L606.826 971.039V663.426M150.292 726.99L227.236 716.277C346.682 569.289 411.499 559.964 523.287 675.057L606.826 663.426" stroke="white" stroke-width="10"/>
//             <path d="M151.025 726.661V429.587L608.291 355.813V663.755M151.025 726.661V1023.73L608.291 971.698V663.755M151.025 726.661L227.969 716.076C347.624 564.449 411.562 561.903 521.088 675.752L608.291 663.755" stroke="#FF0000" stroke-width="3"/>
//             <path d="M19.1216 988.823V358.447L90.203 411.143V1030.98L19.1216 988.823Z" stroke="white" stroke-width="10"/>
//             <path d="M17.6562 989.482V359.765L92.4017 413.119V1030.98L17.6562 989.482Z" stroke="#FF0000" stroke-width="3"/>
//             <text x="330" y="200" fill="black" font-size="40" font-family="Arial" text-anchor="middle" transform="rotate(-7, 330, 200)">PLAY</text>
//         </svg>