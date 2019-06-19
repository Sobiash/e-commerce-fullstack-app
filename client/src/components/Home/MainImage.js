import React from "react";
import { Link } from "react-router-dom";

const HomeSlider = props => {
  const { list } = props;
  const renderCategories =
    list &&
    list.map(category => (
      <Link key={category._id} to={`/shop/category/${category._id}`}>
        <div
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
            <div className="links">{category.name}</div>
          </div>
        </div>
      </Link>
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
