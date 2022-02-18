import React from "react";
import BookListHeading from "./BookListHeading";
import Book from "./Book";
import StudyImage from "../../media/stydy_image.png";
import "./BookList.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const BookList = () => {
  const books = useSelector((state) => state.booksDisplay);
  const history = useHistory();

  return (
    <div className="BookList">
      <BookListHeading />
      <hr></hr>
      {books.map((book) => (
        <div
          className="BookListBook"
          onClick={() => history.push(`desk/display/${book.id}`)}
        >
          <Book
            key={book.id}
            src={StudyImage}
            title={`${book.title}`}
            lastOpened={book.date}
            fileSize={
              book.size >= 0.1
                ? `${book.size.toFixed(1)} mb`
                : `${book.size * 1000} kb`
            }
          />
          <hr></hr>
        </div>
      ))}
    </div>
  );
};

export default BookList;
