import React from "react";
import Slider from "react-slick";
import MyButton from "../utils/button";

const HomeSlider = props => {
  const slides = [
    {
      img: "/images/img1.jpeg",
      lineOne: "Women Collection 2019",
      lineTwo: "New Arrivals",
      linkTitle: "Shop now",
      linkTo: "/shop"
    },
    {
      img: "/images/img2.jpeg",
      lineOne: "Women Collection 2019",
      lineTwo: "New Arrivals",
      linkTitle: "Shop now",
      linkTo: "/shop"
    },
    {
      img: "/images/img3.jpeg",
      lineOne: "B-Stock",
      lineTwo: "Awesome discounts",
      linkTitle: "View offers",
      linkTo: "/shop"
    }
  ];
  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    autoplay: true,
    arrows: false,
    fade: true
  };
  const generateSlider = () =>
    slides
      ? slides.map((item, i) => (
          <div key={i}>
            <div
              className="carrousel_image"
              style={{
                background: `url(${item.img})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
              }}
            >
              <div className="featured_action">
                <div className="tag title">{item.lineOne}</div>
                <div className="tag low_title">{item.lineTwo}</div>
                <div>
                  <MyButton
                    type="default"
                    title={item.linkTitle}
                    linkTo={item.linkTo}
                    addStyles={{
                      margin: "10px 0 0 0"
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      : null;

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div className="carrousel_wrapper">
        <Slider {...settings}>{generateSlider()}</Slider>
      </div>
    </div>
  );
};

export default HomeSlider;
