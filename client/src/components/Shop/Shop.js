import React, { Component } from "react";
import { connect } from "react-redux";
import ShopHeader from "../utils/ShopHeader";

class Shop extends Component {
  render() {
    const products = this.props.products;
    return (
      <div>
        <ShopHeader title="Browse Products" />

        <div className="container">
          <div className="shop_wrapper">
            <div className="left">left</div>
            <div className="right">right</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect()(Shop);
