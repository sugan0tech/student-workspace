import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./search.css";

const Search = () => {
  return (
    <div id="search-bar">
      <div id="search-icon">
        <FontAwesomeIcon icon="search" />
      </div>
      <div id="input">
        <input id="input-box" type="text" placeholder="Search for books" />
      </div>
      <div id="microphone-icon">
        <FontAwesomeIcon icon="microphone" />
      </div>
    </div>
  );
};

export default Search;
