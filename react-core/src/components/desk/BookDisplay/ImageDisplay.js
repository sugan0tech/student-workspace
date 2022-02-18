import React, { useState } from "react";
import getBase64 from "../../../base64";

const ImageDisplay = ({ image }) => {
  console.log(image);
  const [normalImage, setNormalImage] = useState(null);
  getBase64(image, (file, name) => {
    setNormalImage(file);
  });
  return (
    <div>
      <img src={normalImage} />
    </div>
  );
};

export default ImageDisplay;
