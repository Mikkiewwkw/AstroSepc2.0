import React from "react";
import ImageGallery from "./Gallery";

const Images = () => {
  return (
    <div>
      <h1>Images</h1>
      <p className="text-center">Gallery of images from this session.</p>
      <ImageGallery />
    </div>
  );
};

export default Images;
