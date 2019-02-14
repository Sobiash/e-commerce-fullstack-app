import React, { Component } from "react";
import ShopHeader from "../utils/ShopHeader";
import { connect } from "react-redux";
import {
  getProductDetail,
  clearProductDetail
} from "../../actions/products_actions";
import { addToCart } from "../../actions/user_actions";
import ProductInfo from "./ProductInfo";
import ProductImages from "./ProductImages";

class ProductView extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.dispatch(getProductDetail(id)).then(response => {
      if (!this.props.products.productDetail) {
        this.props.history.push("/");
      }
    });
  }
  componentWillUnmount() {
    this.props.dispatch(clearProductDetail());
  }

  addToCartHandler = id => {
    this.props.dispatch(addToCart(id));
  };

  render() {
    return (
      <div>
        <ShopHeader title="Product detail" />
        <div className="container">
          {this.props.products.productDetail ? (
            <div className="product_detail_wrapper">
              <div className="left">
                <div style={{ width: "500px" }}>
                  <ProductImages detail={this.props.products.productDetail} />
                </div>
              </div>
              <div className="right">
                <ProductInfo
                  detail={this.props.products.productDetail}
                  addToCart={id => this.addToCartHandler(id)}
                />
              </div>
            </div>
          ) : (
            "Loading"
          )}
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
export default connect(mapStateToProps)(ProductView);
