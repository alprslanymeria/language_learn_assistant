"use client"

import PdfViewer from "@/components/PdfViewer";

export default function Reading({file}) {
    return (
        <>
            <div className="container max-w-screen-xl mx-auto px-4">
                <PdfViewer file={file}></PdfViewer>
            </div>
        </>
        
    );
}