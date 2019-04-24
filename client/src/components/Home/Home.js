import React from "react";
import { connect } from "react-redux";
import SubMenu from "../SubMenu/SubMenu";
import HomeSlider from "./Slider";
import Promotions from "./Promotions";
import PopularCategories from "../PopularCategories/PopoularCategories";
import { getCategories } from "../../actions/products_actions";

class Home extends React.Component {
  componentDidMount() {
    this.props.getCategories();
  }
  render() {
    const products = this.props.products;
    return (
      <div>
        {/* <SubMenu list={products.categories} /> */}
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
