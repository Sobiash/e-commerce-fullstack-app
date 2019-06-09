import React from "react";
import MyButton from "../utils/button";
import img from "../../images/img4.jpeg";

const Promotions = () => {
  const promotion = {
    img: img,
    lineOne: "Sale",
    lineTwo: "Upto 40% off sale online and in stores",
    linkTitle: "Shop now",
    linkTo: "/shop"
  };
  const renderPromotion = () =>
    promotion && (
      <div
        className="home_promotion_img"
        style={{
          background: `url(${promotion.img})`
        }}
      >
        <div className="tag title">{promotion.lineOne}</div>
        <div className="tag low_title">{promotion.lineTwo}</div>
        <div>
          <MyButton
            type="default"
            title={promotion.linkTitle}
            linkTo={promotion.linkTo}
            addStyles={{
              margin: "10px 0 0 0"
            }}
          />
        </div>
      </div>
    );

  return (
    <div className="container">
      <div className="home_promotion">{renderPromotion()}</div>
    </div>
  );
};

export default Promotions;
