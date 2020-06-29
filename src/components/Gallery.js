import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
// import { photos } from "./photos";

function ImageGallery() {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const photos = [
    {
      src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
      width: 4,
      height: 3,
    },
    {
      src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
      width: 1,
      height: 1,
    },
  ];

  const spectrum = [
    { src: localStorage.getItem("lamp-3"), width: 4, height: 3 },
  ];

  return (
    <div>
      {localStorage.getItem("lamp-3") != null ? (
        <Gallery photos={spectrum} onClick={openLightbox} />
      ) : (
        <Gallery photos={photos} onClick={openLightbox} />
      )}
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map((x) => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}

export default ImageGallery;
