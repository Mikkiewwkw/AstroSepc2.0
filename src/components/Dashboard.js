import React from "react";
import Picture from "./File";
// import Spectrum from "./Spectrum";
// import Tag from "./Tag";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { select_options } from "../assets/options";
import CanvasJSReact from "../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class FileExisted extends React.Component {
  render() {
    return (
      <div>
        <h3>File already exists!</h3>
        <p>Select new lamp number or confirm overwrite</p>
        <p>
          <button className="btn btn-warning" onClick={this.props.onOverwrite}>
            Overwrite
          </button>
        </p>
      </div>
    );
  }
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      croppedImageUrl: null,
      croppedImage: null,
      croppedImagePercent: null,
      fileSrc: null,
      SpectrumData: null,
      spectrum_existed: false,
      spectrum_url: null,
      saved_canvas: null,
      selectedOption: null,
    };
    // this.onRestore.bind(this);
  }

  // onCrop = () => {
  //   this.setState({ croppedImageUrl: null });
  // };

  onCropComplete = (crop, percentCrop) => {
    console.log("crop complete");
    this.setState({ croppedImagePercent: percentCrop });
    this.makeClientCrop(crop);
  };

  onImageLoaded = (image) => {
    this.imageRef = image;
    // console.log(this.imageRef);
  };

  onRestart = (event) => {
    this.setState({ croppedImageUrl: null, SpectrumData: null });
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
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            console.error("Canvas is empty");
            return;
          }
          blob.name = fileName;
          window.URL.revokeObjectURL(this.fileUrl);
          this.fileUrl = window.URL.createObjectURL(blob);
          resolve(this.fileUrl);
        },
        "image/jpeg",
        1
      );
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
    // document.body.appendChild(image);
    // image.height = 100;
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    // canvas.width = this.croppedImage.width;
    // canvas.height = this.croppedImage.height;
    var imW = Math.floor(this.croppedImage_width);
    console.log("imW", imW);
    var imH = Math.floor(this.croppedImage_height);
    console.log("imH", imH);
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
        // if (z === 300) {
        //   console.log(spectrum[z][m]);
        // }
      }
      console.log(spectrum[z]);
      spectrum[z] = this.median(spectrum[z]);
      // console.log(z, spectrum[z]);
      console.log(spectrum[z]);
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

  handleSelectChange = (selectedOption) => {
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
    this.selectedOption = selectedOption;
    console.log(this.selectedOption);
  };

  // GetImage = (ref) => {
  //   console.log(ref);
  //   this.setState({ spectrum: ref });
  //   // window.localStorage.setItem("spectrum", ref);
  //   // ref.exportChart({ format: "png" });
  //   let spectrum_url = ref.exportChart({ toDataURL: true });
  //   console.log(spectrum_url);
  //   this.setState({ spectrum_url: spectrum_url });
  //   // let spectrum = window.localStorage.getItem("spectrum");
  //   // console.log(spectrum.exportChart({ toDataURL: true }));
  //   // // console.log(spectrum_url);
  //   // window.localStorage.setItem("somejson", spectrum);
  // };

  onOverwrite = () => {
    localStorage.removeItem(this.key);
    localStorage[this.key] = this.value;
    // console.log(this.toast_id);
    // toast.update(this.toast_id, {
    //   render: "File Saved!",
    //   type: toast.TYPE.SUCCESS,
    //   autoClose: 5000,
    // });
    toast.dismiss(this.toast_id);
    toast.success("File saved!", { pauseOnHover: false, delay: 500 });
  };

  onSave = () => {
    // this.previewSavedCanvas();
    console.log(this.spectrum);
    let spectrum_url = this.spectrum.exportChart({ toDataURL: true });
    this.setState({ spectrum_url: spectrum_url });

    if (!this.selectedOption) {
      toast.error("Please select a tag first!", {
        pauseOnHover: false,
        autoClose: 2000,
      });
      this.key = "Invalid";
    } else {
      this.key = "lamp-" + this.selectedOption["value"];
    }
    this.value = spectrum_url;

    // If already stored, throw alert
    if (localStorage.getItem(this.key) != null && this.key !== "Invalid") {
      this.toast_id = toast.error(({ closeToast }) => (
        <FileExisted onOverwrite={this.onOverwrite} />
      ));
    } else {
      localStorage[this.key] = this.value;
      if (this.key !== "Invalid") {
        toast.success("File saved!", { pauseOnHover: false });
      }
    }
  };

  // async previewSavedCanvas() {
  //   // console.log(this.spectrum);
  //   const saved_canvas = await this.getSavedCanvas();
  //   this.setState({ saved_canvas: saved_canvas });
  // }
  //
  // getSavedCanvas() {
  //   console.log(this.spectrum);
  //   let spectrum_url = this.spectrum.exportChart({ toDataURL: true });
  //   this.setState({ spectrum_url: spectrum_url });
  //   let spec_width = this.spectrum.get("width");
  //   let spec_height = this.spectrum.get("height");
  //
  //   var image = new Image();
  //   image.src = spectrum_url;
  //   // image.width = spec_width;
  //   // image.height = spec_height;
  //   // console.log(image.width);
  //   // console.log(image.height);
  //   // console.log(image);
  //
  //   console.log(spec_width);
  //   console.log(spec_height);
  //   var canvas = document.createElement("canvas");
  //   canvas.width = spec_width;
  //   canvas.height = spec_height;
  //   var context = canvas.getContext("2d");
  //   // Set background white
  //   // context.fillStyle = "#FFFFFF";
  //   // context.fillRect(0, 0, canvas.width, canvas.height);
  //   context.drawImage(image, 0, 0, spec_width, spec_height);
  //
  //   if (!this.selectedOption) {
  //     toast.error("Please select a tag first!", {
  //       pauseOnHover: false,
  //       autoClose: 2000,
  //     });
  //     this.key = "Invalid";
  //   } else {
  //     this.key = "lamp-" + this.selectedOption["value"];
  //   }
  //   console.log(this.key);
  //   // this.value = JSON.stringify(canvas.toDataURL());
  //   this.value = spectrum_url;
  //
  //   // If already stored, throw alert
  //   if (localStorage.getItem(this.key) != null && this.key !== "Invalid") {
  //     this.toast_id = toast.error(({ closeToast }) => (
  //       <FileExisted onOverwrite={this.onOverwrite} />
  //     ));
  //   } else {
  //     localStorage[this.key] = this.value;
  //     if (this.key !== "Invalid") {
  //       toast.success("File saved!", { pauseOnHover: false });
  //     }
  //   }
  //
  //   return new Promise((resolve, reject) => {
  //     canvas.toBlob(
  //       (blob) => {
  //         if (!blob) {
  //           reject(new Error("Canvas is empty"));
  //           console.error("Canvas is empty");
  //           return;
  //         }
  //         blob.name = this.key;
  //         window.URL.revokeObjectURL(this.fileUrl);
  //         this.fileUrl = window.URL.createObjectURL(blob);
  //         resolve(this.fileUrl);
  //       },
  //       "image/jpeg",
  //       1
  //     );
  //   });
  // }

  render() {
    const spec_options = {
      animationEnabled: true,
      title: {
        text: "Spectrum",
      },
      axisX: {},
      axisY: {
        includeZero: true,
      },
      data: [
        {
          type: "spline",
          dataPoints: this.state.SpectrumData,
        },
      ],
      exportEnabled: true,
    };

    return (
      <div>
        <div>
          <h1>AST 1001: AstroSpec</h1>
          <p className="text-center">
            Compute one-dimensional cut across images and display spectrum.
          </p>
        </div>
        {/*this.state.saved_canvas && (
          <aside>
            <div className="image-wrapper">
              <img
                alt="saved_canvas"
                src={localStorage.getItem("lamp-1")}
                height="200"
                width="200"
              />
            </div>
          </aside>
        )*/}
        {/*this.state.spectrum_url && (
          <img
            alt="spectrum"
            src={this.state.spectrum_url}
            height="200"
            width="200"
          />
        )*/}
        <Picture
          onImageLoaded={this.onImageLoaded}
          onCropComplete={this.onCropComplete}
          croppedImageUrl={this.state.croppedImageUrl}
          onSpectrum={this.onSpectrum}
          onRestart={this.onRestart}
          spectrum_existed={this.state.spectrum_existed}
          onSave={this.onSave}
        />
        <div className="row">
          {/*<Spectrum
            croppedImageUrl={this.state.croppedImageUrl}
            SpectrumData={this.state.SpectrumData}
            onSave={this.GetImage}
          />*/}
          <div className="col-md-8">
            <div className="panel panel-primary">
              <div className="panel-heading">Spectrum</div>
              <div className="panel-body">
                {/*<img
                  id="SpecImage"
                  src={this.props.croppedImageUrl}
                  className="img-responsive"
                  alt="spectrual line"
                />
                <div id="myfirstchart" style={{ height: "250px" }}></div>
                <canvas id="CanInvis" className="hidden"></canvas>*/}
                {this.state.SpectrumData && (
                  <CanvasJSChart
                    options={spec_options}
                    onRef={(ref) => (this.spectrum = ref)}
                  />
                )}
              </div>
            </div>
          </div>
          {/*<Tag />*/}
          <div className="col-md-4">
            <div className="panel panel-warning">
              <div className="panel-heading">Tag</div>
              <div className="panel-body">
                <div className="form-group">
                  <label>Choose a tag associated with the spectrum:</label>
                  <Select
                    value={this.state.selectedOption}
                    onChange={this.handleSelectChange}
                    options={select_options}
                  />
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    );
  }
}

export default Dashboard;
