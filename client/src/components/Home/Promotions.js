import React from "react";
import MyButton from "../utils/button";
import img from "../../images/icons/sale.png";

const Promotions = () => {
  return (
    <div className="container">
      <div className="home_promotion">
        <div
          className="home_promotion_img"
          style={{
            background: `url(${img})`,
            height: "500px",
            width: "auto",
            display: "block",
            marginBottom: "60px"
          }}
        >
          <div
            style={{
              display: "inline-block",
              position: "absolute",
              top: "460px",
              left: "500px"
            }}
          >
            women
          </div>
          <div
            style={{
              display: "inline-block",
              position: "absolute",
              top: "460px",
              right: "500px"
            }}
          >
            men
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotions;
