import React from "react";
import { Row, Image } from "react-bootstrap";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
// import ActionSheet, { Item } from "devextreme-react/action-sheet";
// import Camera from "react-html5-camera-photo";
// import ImagePreview from "./ImagePreview";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const Msg = () => (
//   <div>
//     Lorem ipsum dolor
//     <button>Retry</button>
//     <button>Close</button>
//   </div>
// );

// An alternate is to use aside tag for cropped image preview
class Picture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // isActionSheetVisible: false,
      actionSheetTarget: "",
      fileSrc: null,
      // photoMode: false,
      fileMode: false,
      // dataUri: "",
      textVisible: true,
      crop: { x: 100, y: 100, width: 150, height: 50 },
      croppedImage: null,
      croppedInteracted: false,
    };
    // this.onRestore.bind(this);
  }

  // handleButtonClick = (e) => {
  //   this.setState({
  //     isActionSheetVisible: true,
  //     actionSheetTarget: e.itemElement,
  //   });
  // };

  handleButtonClick = (e) => {
    console.log("File!");
    this.refs.fileUploader.click();
    // this.refs.fileUploader.click();
  };

  // onActionSheetItemClick = (e) => {
  //   this.setState({
  //     isActionSheetVisible: false,
  //   });
  //   if (e.itemData.text === "Photo Library") {
  //     console.log("File!");
  //     this.refs.fileUploader.click();
  //   } else if (e.itemData.text === "Take Photo") {
  //     console.log("Photo!");
  //     this.setState({ photoMode: true });
  //   }
  // };

  // handleTakePhoto = (dataUri) => {
  //   console.log("takePhoto");
  //   this.setState({
  //     dataUri: dataUri,
  //     textVisible: false,
  //   });
  // };

  // handleCancelClick = () => {
  //   this.setState({
  //     isActionSheetVisible: false,
  //   });
  //   console.log("Quit");
  // };

  // handleFileUpload = (event) => {
  //   this.setState({
  //     file: URL.createObjectURL(event.target.files[0]),
  //     fileMode: true,
  //     textVisible: false,
  //   });
  // };

  handleFileUpload = (event) => {
    console.log("file uploading", event.target.files[0]);
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      var img = document.createElement("img");
      reader.onload = (e) => {
        img.onload = () => {
          var canvas = document.createElement("canvas");
          // var ctx = canvas.getContext("2d");
          // ctx.drawImage(img, 0, 0);

          var MAX_WIDTH = 300; // original 300
          var MAX_HEIGHT = 400; // original 400
          var width = img.width; // 480px
          var height = img.height; // 360px
          console.log(width);
          console.log(height);

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          var dataurl = canvas.toDataURL("img/png");

          this.setState({ fileSrc: dataurl });
        };
        img.src = e.target.result;
        // img.width = 200;
        // img.height = 200;
      };
      reader.readAsDataURL(event.target.files[0]);
      // this.setState({ fileSrc: reader.result });
      // console.log(reader.result);
      this.setState({ fileMode: true, textVisible: false });
      // reader.readAsDataURL(event.target.files[0]);
      // localStorage["fileBase64"] = event.target.files[0];
      // console.debug("file stored", event.target.files[0]);
    }
  };

  onRestart = (event) => {
    this.setState({
      fileSrc: null,
      fileMode: false,
      textVisible: true,
      croppedInteracted: false,
      crop: { x: 100, y: 100, width: 100, height: 50 },
    });
    this.props.onRestart(event);
  };

  onRestore = (event) => {
    // toast.error(<Msg />);
    toast.info("Restore previous progress!", { pauseOnHover: false });
    this.setState({ croppedInteracted: false });
  };

  onCropChange = (crop, percentCrop) => {
    // could also use percentCrop here
    this.setState({ crop: crop });
  };

  // onImageLoaded = (image) => {
  //   this.imageRef = image;
  //   // console.log(this.imageRef);
  // };

  // onCropComplete = (crop) => {
  //   console.log("crop complete");
  //   this.makeClientCrop(crop);
  // };

  onCrop = () => {
    if (this.props.croppedImageUrl) {
      this.setState({
        croppedInteracted: true,
      });
    } else {
      toast.error("Please upload your image!", {
        autoClose: 3000,
        pauseOnHover: false,
      });
    }
  };

  onSpectrum = () => {
    if (this.state.croppedInteracted) {
      this.props.onSpectrum();
    } else {
      toast.error("Please crop the image first!", {
        autoClose: 3000,
        pauseOnHover: false,
      });
    }
  };

  render() {
    return (
      <Row>
        <div className="col-md-12 col-lg-12">
          <div className="panel panel-default">
            <div className="panel-heading">Image</div>
            <div className="panel-body">
              {this.state.textVisible && (
                <div>
                  <h3>Select image</h3>
                  {/*<ActionSheet
                    title="Choose action"
                    usePopover={true}
                    visible={this.state.isActionSheetVisible}
                    target={this.state.actionSheetTarget}
                    onItemClick={this.onActionSheetItemClick}
                    onCancelClick={this.handleCancelClick}
                  >
                    <Item text={"Take Photo"} />
                    <Item text={"Photo Library"} />
                  </ActionSheet>*/}
                  <input
                    type="file"
                    id="file"
                    accept="image/*"
                    ref="fileUploader"
                    onChange={this.handleFileUpload}
                    style={{ display: "none" }}
                  />
                  <div className="input-append">
                    <button
                      type="button"
                      className="btn-lg btn-default"
                      onClick={this.handleButtonClick}
                    >
                      File...
                    </button>
                  </div>
                </div>
              )}
              {this.state.fileSrc && !this.state.croppedInteracted && (
                <ReactCrop
                  ruleOfThirds={true}
                  src={this.state.fileSrc}
                  crop={this.state.crop}
                  onChange={this.onCropChange}
                  onComplete={this.props.onCropComplete}
                  onImageLoaded={this.props.onImageLoaded}
                />
              )}
              {this.props.croppedImageUrl && !this.state.croppedInteracted && (
                <aside>
                  <div className="image-wrapper">
                    <Image src={this.props.croppedImageUrl} thumbnail fluid />
                  </div>
                </aside>
              )}
              {this.state.croppedInteracted && (
                <div className="row image-wrapper">
                  <Image src={this.props.croppedImageUrl} fluid />
                </div>
              )}
              {this.state.textVisible && (
                <p className="help-block">Take photo with lens attachment</p>
              )}
              <ToastContainer />
              <div className="btn-toolbar">
                {!this.state.croppedInteracted && (
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={this.onCrop}
                  >
                    Crop
                  </button>
                )}
                {this.state.croppedInteracted && (
                  <button
                    type="button"
                    className="btn btn-info btn-lg"
                    onClick={this.onSpectrum}
                  >
                    Spectrum
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-danger btn-lg"
                  onClick={this.onRestart}
                >
                  Restart
                </button>
                {this.state.croppedInteracted && (
                  <button
                    type="button"
                    className="btn btn-warning btn-lg"
                    onClick={this.onRestore}
                  >
                    Restore
                  </button>
                )}
                {this.props.spectrum_existed && this.state.croppedInteracted && (
                  <button
                    type="button"
                    className="btn btn-success btn-lg"
                    onClick={this.props.onSave}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Row>
    );
  }
}

export default Picture;
