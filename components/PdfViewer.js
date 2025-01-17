"use client"

//PDF VİEWER
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
//COMPONENTS
import SentencesTable from '@/components/SentencesTable';
import FormComponent from './FormComponent';

export default function PdfViewer({ file }) {

    //PDF VIEWER
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const url = "http://localhost:3000" + file;
    
    return (
        <>
            <div className="flex gap-8 bg-gray-50 ">
                {/* PDF Viewer Section */}
                <div className="w-1/2  bg-white overflow-hidden">
                    <div className="h-[600px] overflow-y-auto">
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                            <Viewer
                                fileUrl={url}
                                plugins={[defaultLayoutPluginInstance]}
                            />
                        </Worker>
                    </div>
                </div>

                {/* Form Section */}
                <FormComponent></FormComponent>
            </div>

            <div>
                <SentencesTable></SentencesTable>
            </div>
        </>
        
    );
}