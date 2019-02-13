import React, { Component } from "react";
import Lightbox from "react-images";

class ImageLightBox extends Component {
  state = {
    lightboxIsOpen: true,
    currentImage: this.props.position,
    images: []
  };

  static getDerivedStateFromProps(props, state) {
    if (props.images) {
      const images = [];
      props.images.forEach(item => {
        images.push({ src: `${item}` });
      });
      return (state = {
        images
      });
    }
    return false;
  }

  handlePreviousImage = () => {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  };
  handleNextImage = () => {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  };

  closeLightBox = () => {
    this.props.onClose();
  };

  render() {
    return (
      <div>
        <Lightbox
          currentImage={this.state.currentImage}
          images={this.state.images}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={() => this.handlePreviousImage()}
          onClickNext={() => this.handleNextImage()}
          onClose={() => this.closeLightBox()}
        />
      </div>
    );
  }
}

export default ImageLightBox;
