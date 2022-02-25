import React, { useEffect } from "react";
import BookListHeading from "./BookListHeading";
import Book from "./Book";
import StudyImage from "../../media/stydy_image.png";
import "./BookList.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getBookDisplay } from "../desk/BookCreate/BookDisplaySlice";

const BookList = () => {
  const books = useSelector((state) => state.booksDisplay);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getBookDisplay({}));
  });

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
