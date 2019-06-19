import React, { Component } from "react";
import Lightbox from "react-images";
import PropTypes from "prop-types";

class ImageLightBox extends Component {
  state = {
    lightboxIsOpen: true,
    currentImage: this.props.position,
    images: []
  };

  static getDerivedStateFromProps(props, state) {
    const { images } = props;
    if (images) {
      const imagesArray = [];
      images.forEach(item => {
        imagesArray.push({ src: `${item}` });
      });
      return (state = {
        images: imagesArray
      });
    }
    return false;
  }

  handlePreviousImage = () => {
    const { currentImage } = this.state;
    this.setState({
      currentImage: currentImage - 1
    });
  };
  handleNextImage = () => {
    const { currentImage } = this.state;
    this.setState({
      currentImage: currentImage + 1
    });
  };

  closeLightBox = () => {
    const { onClose } = this.props;
    onClose();
  };

  render() {
    const { currentImage, images, lightboxIsOpen } = this.state;
    return (
      <div>
        <Lightbox
          currentImage={currentImage}
          images={images}
          isOpen={lightboxIsOpen}
          onClickPrev={() => this.handlePreviousImage()}
          onClickNext={() => this.handleNextImage()}
          onClose={() => this.closeLightBox()}
        />
      </div>
    );
  }
}

ImageLightBox.propTypes = {
  key: PropTypes.string,
  images: PropTypes.array.isRequired,
  open: PropTypes.func,
  position: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ImageLightBox;
