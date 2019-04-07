import React, { Component } from "react";
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
    this.props.getProductDetail(id);
    if (!this.props.products.productDetail) {
      this.props.history.push("/");
    }
  }

  componentWillUnmount() {
    this.props.clearProductDetail();
  }

  addToCartHandler = id => {
    this.props.addToCart(id);
  };

  render() {
    const props = this.props.products;
    console.log(props);
    return (
      <div>
        <div className="container">
          {props.productDetail ? (
            <div className="product_detail_wrapper">
              <div className="left">
                {/* <div style={{ width: "500px" }}>
                  <ProductImages detail={props.productDetail} />
                </div> */}
              </div>
              <div className="right">
                <ProductInfo
                  detail={props.productDetail}
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
export default connect(
  mapStateToProps,
  { addToCart, getProductDetail, clearProductDetail }
)(ProductView);
