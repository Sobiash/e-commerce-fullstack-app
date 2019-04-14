import React from "react";
import MyButton from "../utils/button";

const HomeSlider = () => {
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
      lineOne: "Men Collection 2019",
      lineTwo: "New Arrivals",
      linkTitle: "Shop now",
      linkTo: "/shop"
    },
    {
      img: "/images/img3.jpeg",
      lineOne: "Awesome",
      lineTwo: "Discounts",
      linkTitle: "View offers",
      linkTo: "/shop"
    }
  ];
  const generateSlider = () =>
    slides &&
    slides.map((item, i) => (
      <div key={i}>
        <div
          className="wrapper_image"
          style={{
            background: `url(${item.img})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            marginTop: "25px"
          }}
        >
          <div className="featured_action">
            <div className="tags">
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
      </div>
    ));
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div className="container">
        <div className="wrapper">{generateSlider()}</div>
      </div>
    </div>
  );
};

export default HomeSlider;
