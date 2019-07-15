import React from "react";
import { Link } from "react-router-dom";

const HomeSlider = ({ list }) => {
  // const renderCategories =
  // list &&
  // list.map(category => (
  //   <Link key={category._id}>
  //     <div
  //       className="home-images"
  //       style={{
  //         // background: `url(${category.images[0].url})`,
  //         maxWidth: "1200%",
  //         width: "50%",
  //         height: "100vh",
  //         overflow: "hidden",
  //         backgroundSize: "cover",
  //         backgroundRepeat: "no-repeat"
  //       }}
  //     >
  //       <div style={{ position: "relative" }}>
  //         <div className="links"></div>
  //       </div>
  //     </div>
  //   </Link>
  // ));
  return (
    <div
      style={{
        maxWidth: "1000%",
        width: "auto",
        height: "100vh",
        display: "block"
      }}
    >
      {/* {renderCategories} */}
    </div>
  );
};

export default HomeSlider;
