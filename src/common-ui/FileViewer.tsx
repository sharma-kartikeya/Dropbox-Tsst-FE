import React, { useEffect, useState } from 'react';

import { pdfjs, Document, Page } from "react-pdf";
import { useLazyGetLinkQuery } from '../redux/network';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export type FileViewerProps = {
    fileId: string
}

const FileViewer: React.FunctionComponent<FileViewerProps> = ({ fileId }) => {
    const [fetchFileLink, { data }] = useLazyGetLinkQuery();

    useEffect(() => {
        fetchFileLink(fileId)
    }, []);

    const [pageNums, setPageNums] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);

    // if (file.type.includes('image')) {
    //     const url = URL.createObjectURL(file);
    //     return <img src={url} />
    // } else if (file.type.includes('.txt') || file.type.includes('.csv') || file.type.includes('.json')) {
    //     const text = file.text();
    //     return <p>{text}</p>;
    // } else if (file.type.includes("video")) {
    //     const url = URL.createObjectURL(file);
    //     return (
    //         <video controls style={{ width: "300px" }}>
    //             <source src={url} type="video/mp4" />
    //             Your browser does not support the video tag.
    //         </video>
    //     )
    // } else if (file.type.includes("audio")) {
    //     const url = URL.createObjectURL(file);
    //     return (
    //         <audio controls>
    //             <source src={url} type="audio/mpeg" />
    //             Your browser does not support the audio tag.
    //         </audio>
    //     )
    // } else if (file.type.includes("pdf")) {
    //     const url = URL.createObjectURL(file);
    //     return (
    //         <div>
    //             <button disabled={pageNumber <= 1} onClick={(e) => {
    //                 e.preventDefault();
    //                 setPageNumber(pageNumber - 1)
    //             }}>prev</button>
    //             <button disabled={pageNums === undefined || pageNumber >= pageNums} onClick={(e) => {
    //                 e.preventDefault();
    //                 setPageNumber(pageNumber + 1);
    //             }}>next</button>
    //             <Document file="somefile.pdf" onLoadSuccess={({ numPages }) => {
    //                 setPageNums(numPages)
    //             }}>
    //                 <Page pageNumber={pageNumber} />
    //             </Document>
    //             <p>
    //                 {`Page ${pageNumber} of ${pageNums}`}
    //             </p>
    //         </div>
    //     )
    // }

    return data?.data ? (
        <div>{data.data}</div>
    ) : null
}

export default FileViewer;