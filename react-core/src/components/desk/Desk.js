import React from "react";

import Search from "../search/Search";
import Cards from "../Cards/Cards";
import BookList from "../bookList/BookList";
import "./Desk.css";

const Desk = () => {
  return (
    <div className="Desk">
      <Search className="deskSearch"></Search>
      <Cards className="deskCards"></Cards>

      <div className="deskBookListContainer">
        <BookList></BookList>
      </div>
    </div>
  );
};

export default Desk;
