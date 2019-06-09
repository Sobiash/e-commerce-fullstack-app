import React from "react";
import MyButton from "../utils/button";
import img from "../../images/joint.JPG";
import { Link } from "react-router-dom";

const HomeSlider = props => {
  const renderCategories =
    props.list &&
    props.list.map(category => (
      <div
        key={category._id}
        className="home-images"
        style={{
          backgroundImage: `url(${category.images[0].url})`,
          maxWidth: "1000%",
          width: "50%",
          height: "100vh",
          overflow: "hidden",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div style={{ position: "relative" }}>
          <Link to={`/shop/category/${category._id}`}>
            <div className="links">{category.name}</div>
          </Link>
        </div>
      </div>
    ));
  return (
    <div
      style={{
        maxWidth: "1000%",
        width: "auto",
        height: "100vh",
        display: "block",
        position: "relative"
      }}
    >
      {renderCategories}
    </div>
  );
};

export default HomeSlider;
