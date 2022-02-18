import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectBook } from "../BookCreate/BookCreateSlice";
import "./BookDisplay.css";
import PdfDisplay from "./PdfDisplay";
import ImageDisplay from "./ImageDisplay";
const BookDisplay = () => {
  const { id } = useParams();
  const books = useSelector(selectBook);
  let book = null;
  for (let item of books) {
    if (item.id === id) {
      book = item;
    }
  }
  const { title, links, pdfs, images } = book;
  return (
    <div className="BookDisplay">
      <h1 className="title">{title}</h1>
      <div className="links">
        <h3>Links</h3>
        <ul>
          {links.map((link, id) => {
            return (
              <li key={id}>
                <a href={link}>{link}</a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pdfs">
        <h3>PDFs</h3>
        <>
          {pdfs.map((pdf) => {
            return <PdfDisplay pdf={pdf} />;
          })}
        </>
      </div>
      <div className="images">
        <h3>Images</h3>
        <>
          {images.map((image) => {
            return <ImageDisplay image={image} />;
          })}
        </>
      </div>
    </div>
  );
};

export default BookDisplay;
