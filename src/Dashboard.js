import React from "react";
import Picture from "./File";
import Spectrum from "./Spectrum";
import Tag from "./Tag";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      croppedImageUrl: null,
      croppedImage: null,
      fileSrc: null,
      SpectrumData: null,
      spectrum_existed: false,
    };
    // this.onRestore.bind(this);
  }

  // onCrop = () => {
  //   this.setState({ croppedImageUrl: null });
  // };

  onCropComplete = (crop) => {
    console.log("crop complete");
    this.makeClientCrop(crop);
  };

  onImageLoaded = (image) => {
    this.imageRef = image;
    // console.log(this.imageRef);
  };

  onRestore = (event) => {
    this.setState({ croppedImageUrl: null });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      // console.log("makeClientCrop!");
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "CroppedImage.jpeg"
      );
      // console.log("croppedImageUrl", croppedImageUrl);
      this.setState({ croppedImageUrl: croppedImageUrl });
      this.croppedImage = croppedImageUrl;
    }
  }

  getCroppedImg(image, crop, fileName) {
    console.log("get cropped image");
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    this.croppedImage_width = crop.width;
    this.croppedImage_height = crop.height;
    // canvas.width = image.width;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  median(values) {
    values.sort(function (a, b) {
      return a - b;
    });

    var half = Math.floor(values.length / 2);

    if (values.length % 2) return values[half];
    else return (values[half - 1] + values[half]) / 2.0;
  }

  onSpectrum = () => {
    console.log("spectrum");
    this.setSpectrumData();
    this.setState({ spectrum_existed: true });
  };

  setSpectrumData() {
    const spectrum_data = this.getSpectrumData();
    console.log("spectrum_data", spectrum_data);
    this.setState({ SpectrumData: spectrum_data });
  }

  getSpectrumData() {
    var image = new Image();
    image.src = this.croppedImage;
    image.height = 100;
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    // canvas.width = this.croppedImage.width;
    // canvas.height = this.croppedImage.height;
    var imW = Math.floor(this.croppedImage_width);
    console.log(imW);
    var imH = Math.floor(this.croppedImage_height);
    console.log(imH);
    var imgd = ctx.getImageData(0, 0, imW, imH);
    var pix = imgd.data;

    console.log("pix", pix);

    // collapse RGB to 1D map of all pixels
    var allPix = new Array(pix.length / 4);
    // console.log(allPix.length);
    for (var i = 0, j = 0; i < pix.length - 2; i += 4, j++) {
      allPix[j] = 0.3 * pix[i] + 0.59 * pix[i + 1] + 0.11 * pix[i + 2];
    }
    console.log(allPix); // no data after index 10002

    // Make array of arrays
    var spectrum = new Array(imW);
    for (var q = 0; q < imW; q++) {
      spectrum[q] = new Array(imH);
    }

    // Median along columns
    for (var z = 0; z < imW; z++) {
      for (var m = 0; m < imH; m++) {
        spectrum[z][m] = allPix[m * imW + z];
        if (z === 300) {
          console.log(spectrum[z][m]);
        }
      }
      spectrum[z] = this.median(spectrum[z]);
      // console.log(z, spectrum[z]);
    }

    var data = [];
    for (var d = 0; d < imW; d++) {
      data.push({
        x: d,
        y: spectrum[d],
      });
    }

    console.log(data.length);
    // return new Promise((resolve, reject) => {
    //   resolve(this.data);
    // });
    return data;
  }

  onSave = () => {};

  render() {
    return (
      <div>
        <Picture
          onImageLoaded={this.onImageLoaded}
          onCropComplete={this.onCropComplete}
          croppedImageUrl={this.state.croppedImageUrl}
          onSpectrum={this.onSpectrum}
          onRestore={this.onRestore}
          spectrum_existed={this.state.spectrum_existed}
          onSave={this.onSave}
        />
        <div className="row">
          <Spectrum
            croppedImageUrl={this.state.croppedImageUrl}
            SpectrumData={this.state.SpectrumData}
          />
          <Tag />
        </div>
      </div>
    );
  }
}

export default Dashboard;
