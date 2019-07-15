import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import camera from "../../images/icons/add-photo.png";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";

class ImageUpload extends Component {
  state = {
    uploadedFiles: [],
    uploading: false
  };

  onDrop = files => {
    const { imagesHandler } = this.props;
    const { uploadedFiles } = this.state;

    this.setState({ uploading: true });
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" }
    };
    formData.append("file", files[0]);
    axios.post("/api/admin/upload-image", formData, config).then(response => {
      this.setState(
        {
          uploading: false,
          uploadedFiles: [...uploadedFiles, response.data]
        },
        () => {
          imagesHandler(uploadedFiles);
        }
      );
    });
  };

  onRemove = id => {
    const { uploadedFiles } = this.state;
    const { imagesHandler } = this.props;
    axios.get(`/api/admin/remove-image?public_id=${id}`).then(response => {
      let images = uploadedFiles.filter(item => {
        return item.public_id !== id;
      });

      this.setState(
        {
          uploadedFiles: images
        },
        () => {
          imagesHandler(images);
        }
      );
    });
  };

  showUploadedImages = () => {
    const { uploadedFiles } = this.state;
    const { onRemove } = this;

    return uploadedFiles.map(item => (
      <div
        className="dropzone_box"
        key={item.public_id}
        onClick={() => onRemove(item.public_id)}
      >
        <div
          className="wrap"
          style={{ background: `url(${item.url}) no-repeat` }}
        />
      </div>
    ));
  };

  static getDerivedStateFromProps(props, state) {
    if (props.reset) {
      return (state = {
        uploadedFiles: []
      });
    }
    return null;
  }

  render() {
    const { onDrop, showUploadedImages } = this;
    const { uploading } = this.state;
    return (
      <div className="dropzone">
        <section>
          <div className="dropzone_box">
            <Dropzone onDrop={e => onDrop(e)} multiple maxSize={8000000}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="wrap">
                    <img
                      src={camera}
                      alt="camera-image"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </div>
                </div>
              )}
            </Dropzone>

            {uploading && (
              <div className="dropzone_box">
                <CircularProgress style={{ color: "#00bcd4" }} thickness={5} />
              </div>
            )}
          </div>
        </section>
        <div />
        {showUploadedImages()}
      </div>
    );
  }
}

ImageUpload.propTypes = {
  reset: PropTypes.bool.isRequired,
  imagesHandler: PropTypes.func.isRequired
};

export default ImageUpload;
