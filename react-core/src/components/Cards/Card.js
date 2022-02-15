import React from "react";
import Image from "react-bootstrap/Image";
import "./Card.css";

const Card = ({ src, title, handleCreateClick }) => {
  return (
    <div
      className="Card"
      onClick={handleCreateClick ? handleCreateClick : null}
    >
      <Image className="image" src={src} fluid />
      <p className="title">{title}</p>
    </div>
  );
};

export default Card;
