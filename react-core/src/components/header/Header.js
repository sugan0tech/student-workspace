import React from "react";
import { Link } from "react-router-dom";

import "./header.css";

const Header = () => {
  return (
    <div className="navBar">
      <h1 id="brand">
        <Link to="/">Student Workspace</Link>
      </h1>
      <ul className="nav-links">
        <Link to="/">
          <li className="link">Desk</li>
        </Link>
        <Link to="/assignment">
          <li className="link">Assignment</li>
        </Link>
        <Link to="/exam-time">
          <li className="link">Exam time</li>
        </Link>
        <Link to="/">
          <li className="link">Log out</li>
        </Link>
      </ul>
    </div>
  );
};

export default Header;
