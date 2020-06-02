import React from "react";
import { Row, Image } from "react-bootstrap";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import ActionSheet, { Item } from "devextreme-react/action-sheet";
import Camera from "react-html5-camera-photo";
import ImagePreview from "./ImagePreview";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

// An alternate is to use aside tag for cropped image preview
class Picture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActionSheetVisible: false,
      actionSheetTarget: "",
      fileSrc: null,
      photoMode: false,
      fileMode: false,
      dataUri: "",
      textVisible: true,
      crop: {
        unit: "%",
      },
      croppedImage: null,
      croppedInteracted: false,
    };
    // this.onRestore.bind(this);
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
    if (e.itemData.text === "Photo Library") {
      console.log("File!");
      this.refs.fileUploader.click();
    } else if (e.itemData.text === "Take Photo") {
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
      reader.addEventListener("load", () => {
        this.setState({ fileSrc: reader.result });
        console.log(reader.result);
      });
      this.setState({ fileMode: true, textVisible: false });
      reader.readAsDataURL(event.target.files[0]);
      localStorage["fileBase64"] = event.target.files[0];
      console.debug("file stored", event.target.files[0]);
    }
  };

  onRestore = (event) => {
    this.setState({
      fileSrc: null,
      photoMode: false,
      fileMode: false,
      textVisible: true,
      croppedInteracted: false,
    });
    this.props.onRestore(event);
  };

  onCropChange = (crop, percentCrop) => {
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
    this.setState({
      fileSrc: this.props.croppedImageUrl,
      croppedInteracted: true,
    });
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
                    accept="image/*"
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
                  <Image src={this.props.croppedImageUrl} thumbnail fluid />
                </aside>
              )}
              {this.state.croppedInteracted && (
                <div className="row">
                  <Image src={this.props.croppedImageUrl} fluid />
                </div>
              )}
              {this.state.textVisible && (
                <p className="help-block">Take photo with lens attachment</p>
              )}
              <form className="form-inline">
                <div className="btn-toolbar">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={this.onCrop}
                  >
                    Crop
                  </button>
                  <button
                    type="button"
                    className="btn btn-info btn-lg"
                    onClick={this.props.onSpectrum}
                  >
                    Spectrum
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-lg"
                    onClick={this.onRestore}
                  >
                    Restore
                  </button>
                  {this.props.spectrum_existed && (
                    <button
                      type="button"
                      className="btn btn-success btn-lg"
                      onClick={this.props.onSave}
                    >
                      Save
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </Row>
    );
  }
}

export default Picture;
