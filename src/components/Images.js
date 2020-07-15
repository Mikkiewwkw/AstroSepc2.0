import React from "react";
import ImageGallery from "./Gallery";

const Images = () => {
  return (
    <div>
      <h1>Images</h1>
      <p className="text-center">Gallery of images from this session</p>
      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-primary">
            <div className="panel-heading">Gallery</div>
            <div className="panel-body">
              <ImageGallery />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Images;
