import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import CircularProgress from "@material-ui/core/CircularProgress";

class ImageUpload extends Component {
  state = {
    uploadedFiles: [],
    uploading: false
  };

  onDrop = files => {
    this.setState({ uploading: true });
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" }
    };
    formData.append("file", files[0]);
    axios.post("/api/users/upload-image", formData, config).then(response => {
      this.setState(
        {
          uploading: false,
          uploadedFiles: [...this.state.uploadedFiles, response.data]
        },
        () => {
          this.props.imagesHandler(this.state.uploadedFiles);
        }
      );
    });
  };

  onRemove = id => {
    axios.get(`/api/users/remove-image?public_id=${id}`).then(response => {
      let images = this.state.uploadedFiles.filter(item => {
        return item.public_id !== id;
      });

      this.setState(
        {
          uploadedFiles: images
        },
        () => {
          this.props.imagesHandler(images);
        }
      );
    });
  };

  showUploadedImages = () =>
    this.state.uploadedFiles.map(item => (
      <div
        className="dropzone_box"
        key={item.public_id}
        onClick={() => this.onRemove(item.public_id)}
      >
        <div
          className="wrap"
          style={{ background: `url(${item.url}) no-repeat` }}
        />
      </div>
    ));

  static getDerivedStateFromProps(props, state) {
    if (props.reset) {
      return (state = {
        uploadedFiles: []
      });
    }
    return null;
  }

  render() {
    return (
      <div className="dropzone">
        <section>
          <div className="dropzone_box">
            <Dropzone onDrop={e => this.onDrop(e)} multiple maxSize={8000000}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="wrap">
                    <FontAwesomeIcon icon="plus-circle" />
                  </div>
                </div>
              )}
            </Dropzone>

            {this.state.uploading ? (
              <div className="dropzone_box">
                <CircularProgress style={{ color: "#00bcd4" }} thickness={5} />
              </div>
            ) : null}
          </div>
        </section>
        <div />
        {this.showUploadedImages()}
      </div>
    );
  }
}

export default ImageUpload;
