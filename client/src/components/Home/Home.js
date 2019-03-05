import React from "react";
import HomeSlider from "./Slider";
import Promotions from "./Promotions";
import PopularCategories from "../PopularCategories/PopoularCategories";

class Home extends React.Component {
  render() {
    return (
      <div>
        <HomeSlider />
        <Promotions />
        <PopularCategories />
      </div>
    );
  }
}

export default Home;
