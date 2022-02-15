import React from "react";
import { useParams } from "react-router-dom";

const BookDisplay = () => {
  const { id } = useParams();
  return (
    <div>
      <p>book id : {id}</p>
    </div>
  );
};

export default BookDisplay;
