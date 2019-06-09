import React from "react";
import { connect } from "react-redux";
import MainImage from "./MainImage";
import Sale from "./Sale";
import Promotions from "./Promotions";
import Subscription from "./Subscription";
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
        <MainImage list={products.categories} />
        <Promotions />
        <Subscription />
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
