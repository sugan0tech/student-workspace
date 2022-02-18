import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

const PdfDisplay = ({ pdf }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const handleNextButton = () => {
    console.log("next button clicked");
    setPageNumber(pageNumber + 1);
  };
  return (
    <div>
      <Document className="pdf" file={pdf}>
        <Page size="C10" pageNumber={1} />
      </Document>
    </div>
  );
};

export default PdfDisplay;
