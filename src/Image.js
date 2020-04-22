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
      dataUri: "",
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
    });
  };

  handleCancelClick = () => {
    this.setState({
      isActionSheetVisible: false,
    });
    console.log("Quit");
  };

  handleFileUpload = (event) => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
    });
  };

  handleRestore = (event) => {
    this.setState({
      file: null,
      photoMode: false,
    });
  };

  render() {
    return (
      <Row>
        <div className="col-md-12 col-lg-12">
          <div className="panel panel-default">
            <div className="panel-heading">Image</div>
            <div className="panel-body">
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
              {!this.state.photoMode && (
                <div>
                  <img src={this.state.file} />
                </div>
              )}
              <ReactCrop src={this.state.file} />

              <p className="help-block">Take photo with lens attachment</p>
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
