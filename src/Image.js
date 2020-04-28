import React from "react";
import { Row } from "react-bootstrap";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import ActionSheet, { Item } from "devextreme-react/action-sheet";
import Camera from "react-html5-camera-photo";
import ImagePreview from "./ImagePreview";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const actionSheetItems = [{ text: "Take Photo" }, { text: "Photo Library" }];

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActionSheetVisible: false,
      actionSheetTarget: "",
      file: null,
      photoMode: false,
      fileMode: false,
      dataUri: "",
      textVisible: true,
      crop: {
        unit: "%",
        width: 30,
        aspect: 16 / 9,
      },
    };
  }

  handleButtonClick = (e) => {
    this.setState({
      isActionSheetVisible: true,
      actionSheetTarget: e.itemElement,
    });
  };

  onActionSheetItemClick = (e) => {
    this.setState({
      isActionSheetVisible: false,
    });
    if (e.itemData.text == "Photo Library") {
      console.log("File!");
      this.refs.fileUploader.click();
    } else if (e.itemData.text == "Take Photo") {
      console.log("Photo!");
      this.setState({ photoMode: true });
    }
  };

  handleTakePhoto = (dataUri) => {
    console.log("takePhoto");
    this.setState({
      dataUri: dataUri,
      textVisible: false,
    });
  };

  handleCancelClick = () => {
    this.setState({
      isActionSheetVisible: false,
    });
    console.log("Quit");
  };

  // handleFileUpload = (event) => {
  //   this.setState({
  //     file: URL.createObjectURL(event.target.files[0]),
  //     fileMode: true,
  //     textVisible: false,
  //   });
  // };

  handleFileUpload = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ file: reader.result })
      );
      this.setState({ fileMode: true, textVisible: false });
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  handleRestore = (event) => {
    this.setState({
      file: null,
      photoMode: false,
      fileMode: false,
      textVisible: true,
    });
  };

  handleCropping = (crop, percentCrop) => {
    this.setState({ crop: percentCrop });
  };

  onImageUploaded = (image) => {
    this.imageRef = image;
  };

  handleCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "CroppedImage.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
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
          //reject(new Error('Canvas is empty'));
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
                  <button
                    type="button"
                    className="btn-lg btn-default"
                    onClick={this.handleButtonClick}
                  >
                    File...
                  </button>
                  <ActionSheet
                    title="Choose action"
                    usePopover={true}
                    visible={this.state.isActionSheetVisible}
                    target={this.state.actionSheetTarget}
                    onItemClick={this.onActionSheetItemClick}
                    onCancelClick={this.handleCancelClick}
                  >
                    <Item text={"Take Photo"} />
                    <Item text={"Photo Library"} />
                  </ActionSheet>
                  <input
                    type="file"
                    id="file"
                    ref="fileUploader"
                    onChange={this.handleFileUpload}
                    style={{ display: "none" }}
                  />
                </div>
              )}
              <div>
                {this.state.photoMode &&
                  (this.state.dataUri ? (
                    <ImagePreview
                      dataUri={this.state.dataUri}
                      isFullscreen={false}
                    />
                  ) : (
                    <Camera
                      onTakePhoto={this.handleTakePhoto}
                      isFullscreen={false}
                    />
                  ))}
              </div>
              {this.state.file && (
                <ReactCrop
                  src={this.state.file}
                  crop={this.state.crop}
                  onChange={this.handleCropping}
                  onComplete={this.handleCropComplete}
                  onImageUploaded={this.onImageUploaded}
                />
              )}
              {this.state.croppedImageUrl && (
                <img
                  alt="Crop"
                  style={{ maxWidth: "100%" }}
                  src={this.state.croppedImageUrl}
                />
              )}
              {this.state.textVisible && (
                <p className="help-block">Take photo with lens attachment</p>
              )}
              <form className="form-inline">
                <div className="btn-toolbar">
                  <button type="button" className="btn btn-primary btn-lg">
                    Crop
                  </button>
                  <button type="button" className="btn btn-info btn-lg">
                    Spectrum
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-lg"
                    onClick={this.handleRestore}
                  >
                    Restore
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Row>
    );
  }
}

export default Image;
