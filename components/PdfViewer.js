"use client"

import { useState, useEffect } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import SentencesTable from '@/components/SentencesTable';
import FormComponent from './FormComponent';

export default function PdfViewer({ file }) {
    const [pdfData, setPdfData] = useState(null);
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    useEffect(() => {
        const fetchPdf = async () => {
            try {
                const response = await fetch(file);
                const blob = await response.blob();
                
                const base64Data = await convertBlobToBase64(blob);
                setPdfData(base64Data);
            } catch (error) {
                console.error('Error fetching PDF:', error);
            }
        };

        if (file) {
            fetchPdf();
        }
    }, [file]);

    const convertBlobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    return (
        <>
            <div className="flex flex-col items-center lg:flex-row lg:items-start gap-8 bg-gray-50">
                {/* PDF Viewer Section */}
                <div className="w-[300px] sm:w-[400px] md:w-[600px] lg:w-1/2 bg-white overflow-hidden">
                    <div className="h-[600px] overflow-y-auto">
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                            {pdfData && (
                                <Viewer
                                    fileUrl={pdfData}
                                    plugins={[defaultLayoutPluginInstance]}
                                />
                            )}
                        </Worker>
                    </div>
                </div>
                {/* Form Section */}
                <FormComponent />
            </div>
            <div>
                <SentencesTable />
            </div>
        </>
    );
}