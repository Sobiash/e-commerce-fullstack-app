import React from "react";
import { connect } from "react-redux";
import HomeSlider from "./Slider";
import Promotions from "./Promotions";
import PopularCategories from "../PopularCategories/PopoularCategories";
import { getCategories } from "../../actions/products_actions";

class Home extends React.Component {
  componentDidMount() {
    this.props.getCategories();
  }
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

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(
  mapStateToProps,
  { getCategories }
)(Home);
