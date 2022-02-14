import React from "react";
import Image from "react-bootstrap/Image";
import "./Book.css";

const Book = ({ src, title, lastOpened, fileSize }) => {
  return (
    <div className="Book">
      <Image className="bookImage" src={src} fit />
      <p className="bookTitle">{title}</p>
      <p className="lastOpened">{lastOpened}</p>
      <p className="fileSize">{fileSize}</p>
    </div>
  );
};

export default Book;
