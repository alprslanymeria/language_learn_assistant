"use client"

import NavbarComponent from "./NavbarComponent";
import PdfViewer from "./PdfViewer";

export default function Reading({file}) {
    return (
        <>
            <div className="container max-w-screen-xl mx-auto px-4">
                <NavbarComponent></NavbarComponent>
                <PdfViewer file={file}></PdfViewer>
            </div>
        </>
        
    );
}