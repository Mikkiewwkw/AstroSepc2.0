import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
// import { photos } from "./photos";

function ImageGallery() {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [isGalleryEmpty, setGalleryEmpty] = useState(true);
  const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);
  // const [photos, setPhotos] = useState([]);
  const keyList = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "Incandescent",
    "Flourescent",
    "Halogen",
    "Sun",
  ];

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const onClearAll = () => {
    setConfirmDeleteAll(true);
  };

  const onConfirm = () => {
    for (var i = 0; i < keyList.length; i++) {
      var key = "lamp-" + keyList[i];
      if (localStorage.getItem(key) === null) {
        continue;
      }
      localStorage.removeItem(key);
    }
    photos = [];
    setGalleryEmpty(true);
  };

  var photos = [];
  for (var i = 0; i < keyList.length; i++) {
    var key = "lamp-" + keyList[i];
    if (localStorage.getItem(key) === null) {
      continue;
    }
    if (isGalleryEmpty) {
      setGalleryEmpty(false);
    }
    photos.push({
      src: localStorage.getItem(key),
      width: 3,
      height: 4,
      alt: key,
      title: key,
      sizes: ["(min-width: 480px) 50vw,(min-width: 1024px) 33.3vw,100vw"],
    });
  }
  // const photos = [
  //   {
  //     src: localStorage.getItem("lamp-1"),
  //     width: 1,
  //     height: 1,
  //   },
  //   {
  //     src: localStorage.getItem("lamp-2"),
  //     width: 1,
  //     height: 1,
  //   },
  // ];

  return (
    <div>
      {isGalleryEmpty ? (
        <div
          id="file-alert"
          className="alert alert-info alert-dismissable fade in"
          role="alert"
        >
          <button
            id="button-close"
            type="button"
            className="close"
            data-dismiss="alert"
          >
            <span aria-hidden="true">&times;</span>
            <span className="sr-only">Close</span>
          </button>
          <h3>
            <i className="fa fa-minus-circle"></i> No images found. Return to{" "}
            <strong>Dashboard</strong> and save your spectra
          </h3>
        </div>
      ) : (
        <div>
          <Gallery
            photos={photos}
            onClick={openLightbox}
            targetRowHeight={250}
          />
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
          <div className="btn-toolbar" role="toolbar" aria-label="Toolbar">
            <hr />
            <button
              type="button"
              className="btn btn-danger btn-lg"
              onClick={onClearAll}
            >
              Clear All
            </button>
            {confirmDeleteAll && (
              <button
                type="button"
                className="btn btn-success btn-lg"
                onClick={onConfirm}
              >
                Confirm
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
