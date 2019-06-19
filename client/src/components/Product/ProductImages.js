import React, { Component } from "react";
import ImageLightBox from "./ImageLightBox";
import img from "../../images/img1.jpeg";
import PropTypes from "prop-types";
import BreadCrumbs from "../utils/BreadCrumbs";

class ProductImages extends Component {
  state = {
    lightbox: false,
    imagePosition: 0,
    lightboxImages: []
  };

  componentDidMount() {
    const { images } = this.props.detail;
    if (images) {
      let lightboxImages = [];
      images.forEach(item => {
        lightboxImages.push(item.url);
      });
      this.setState({
        lightboxImages
      });
    }
  }

  renderImages = images => {
    if (images) {
      return images[0].url;
    } else {
      return `${img}`;
    }
  };

  handleLightBox = position => {
    const { lightboxImages } = this.state;
    if (lightboxImages.length > 0) {
      this.setState({
        lightbox: true,
        imagePosition: position
      });
    }
  };

  handleLightBoxClose = () => {
    this.setState({
      lightbox: false
    });
  };

  showThumbs = lightboxImages =>
    lightboxImages &&
    lightboxImages.map(
      (item, i) =>
        i > 0 && (
          <div
            key={i}
            onClick={() => this.handleLightBox(i)}
            className="thumb"
            style={{ background: `url(${item}) no-repeat` }}
          />
        )
    );
  render() {
    const { detail } = this.props;
    const { lightboxImages, lightbox, open, imagePosition } = this.state;

    return (
      <div className="product_image_container">
        {/* <BreadCrumbs detail={detail} /> */}
        <div className="main_pic">
          <div
            style={{
              backgroundSize: "cover",
              background: `url(${this.renderImages(detail.images)}) no-repeat`
            }}
            onClick={() => this.handleLightBox(0)}
          />
        </div>
        <div className="main_thumbs">{this.showThumbs(lightboxImages)}</div>
        {lightbox && (
          <ImageLightBox
            key={detail._id}
            images={lightboxImages}
            open={open}
            position={imagePosition}
            onClose={() => this.handleLightBoxClose()}
          />
        )}
      </div>
    );
  }
}

ProductImages.propTypes = {
  detail: PropTypes.object.isRequired
};

export default ProductImages;
