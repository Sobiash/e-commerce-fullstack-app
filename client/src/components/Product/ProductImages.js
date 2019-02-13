import React, { Component } from "react";
import ImageLightBox from "../utils/ImageLightBox";

class ProductImages extends Component {
  state = {
    lightbox: false,
    imagePosition: 0,
    lightboxImages: []
  };

  componentDidMount() {
    if (this.props.detail.images.length > 0) {
      let lightboxImages = [];
      this.props.detail.images.forEach(item => {
        lightboxImages.push(item.url);
      });
      this.setState({
        lightboxImages
      });
    }
  }

  renderImages = images => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/img1.jpeg";
    }
  };

  handleLightBox = position => {
    if (this.state.lightboxImages.length > 0) {
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
  showThumbs = () =>
    this.state.lightboxImages.map((item, i) =>
      i > 0 ? (
        <div
          key={i}
          onClick={() => this.handleLightBox(i)}
          className="thumb"
          style={{ background: `url(${item}) no-repeat center` }}
        />
      ) : null
    );
  render() {
    const { detail } = this.props;
    return (
      <div className="product_image_container">
        <div className="main_pic">
          <div
            style={{
              backgroundSize: "cover",
              background: `url(${this.renderImages(detail.images)}) no-repeat`
            }}
            onClick={() => this.handleLightBox(0)}
          />
        </div>
        <div className="main_thumbs">{this.showThumbs(detail)}</div>
        {this.state.lightbox ? (
          <ImageLightBox
            id={detail.id}
            images={this.state.lightboxImages}
            open={this.state.open}
            position={this.state.imagePosition}
            onClose={() => this.handleLightBoxClose()}
          />
        ) : null}
      </div>
    );
  }
}

export default ProductImages;
