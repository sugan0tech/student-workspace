import React, { useState } from "react";
import getBase64 from "../../../base64";
import "./ImageDisplay.css";

const ImageDisplay = ({ image }) => {
  const [normalImage, setNormalImage] = useState(null);
  const [name, setName] = useState("");
  getBase64(image, (file, name) => {
    setNormalImage(file);
    setName(name);
  });
  return (
    <div className="ImageDisplay">
      <img src={normalImage} />
      <p>{name}</p>
    </div>
  );
};

export default ImageDisplay;
