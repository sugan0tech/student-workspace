import React from "react";
import "./BookListHeading.css";

const BookListHeading = () => {
  return (
    <div className="bookListHeading">
      <p className="textBooks">Books</p>
      <p className="textUploaded">Uploaded</p>
      <p className="textFileSize">File Size</p>
    </div>
  );
};

export default BookListHeading;
