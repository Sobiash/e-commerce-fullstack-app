import React from "react";
import Slider from "react-slick";

const HomeSlider = () => {
  const img1 = "/images/img1.jpeg";
  const img2 = "/images/img2.jpeg";
  const img3 = "/images/img3.jpeg";
  const img4 = "/images/img4.jpeg";
  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    autoplay: true,
    arrows: false
  };
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        height: "95vh",
        marginTop: "50px"
      }}
    >
      <div className="carrousel_wrapper">
        <Slider {...settings}>
          <div>
            <div
              className="carrousel_image"
              style={{
                background: `url(${img1})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
              }}
            />
          </div>
          <div>
            <div
              className="carrousel_image"
              style={{
                backgroundImage: `url(${img2})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
              }}
            />
          </div>
          <div>
            <div
              className="carrousel_image"
              style={{
                backgroundImage: `url(${img3})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
              }}
            />
          </div>
          <div>
            <div
              className="carrousel_image"
              style={{
                backgroundImage: `url(${img4})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
              }}
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default HomeSlider;
