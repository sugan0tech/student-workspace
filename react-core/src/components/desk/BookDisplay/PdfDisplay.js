import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./PdfDisplay.css";
import { Button } from "react-bootstrap";

const PdfDisplay = ({ pdf }) => {
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  const numberOfPages = (pdf) => {
    setNumPages(pdf?.numPages);
  };
  const handleNextButtonLeft = () => {
    if (pageNumber >= numPages) return;
    setPageNumber(pageNumber + 1);
  };
  const handleNextButtonRight = () => {
    if (pageNumber == 1) return;
    setPageNumber(pageNumber - +1);
  };
  return (
    <div className="PdfDisplay">
      <div className="pdf">
        <Document onLoadSuccess={numberOfPages} file={pdf}>
          <Page size="A4" pageNumber={pageNumber} />
        </Document>
      </div>
      <div className="Button">
        <Button onClick={handleNextButtonRight}>Left</Button>
        <Button onClick={handleNextButtonLeft}>Right</Button>
      </div>
      <hr />
    </div>
  );
};

export default PdfDisplay;
