"use client"

import NavbarComponent from "@/components/NavbarComponent";
import PdfViewer from "@/components/PdfViewer";

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