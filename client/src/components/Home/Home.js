import React from "react";
import HomeSlider from "./Slider";
import Promotions from "./Promotions";

class Home extends React.Component {
  render() {
    return (
      <div>
        <HomeSlider />
        <Promotions />
      </div>
    );
  }
}

export default Home;
