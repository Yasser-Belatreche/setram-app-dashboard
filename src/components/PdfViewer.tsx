import React from 'react';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import fr_FR from '@react-pdf-viewer/locales/lib/fr_FR.json';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { LocalizationMap, Viewer, Worker } from '@react-pdf-viewer/core';

type Props = {
    link: string;
};

const PdfViewer: React.FC<Props> = ({ link }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <Worker workerUrl={'https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'}>
            <div
                style={{ height: '750px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}
            >
                <Viewer
                    fileUrl={link}
                    localization={fr_FR as unknown as LocalizationMap}
                    plugins={[defaultLayoutPluginInstance]}
                />
            </div>
        </Worker>
    );
};

export { PdfViewer };
