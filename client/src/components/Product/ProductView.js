import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getProductDetail,
  clearProductDetail
} from "../../actions/products_actions";
import { addToCart, getUserProfile } from "../../actions/user_actions";
import ProductInfo from "./ProductInfo";
import PropTypes from "prop-types";
import ProductImages from "./ProductImages";

class ProductView extends Component {
  componentDidMount() {
    this.props.getUserProfile();

    const id = this.props.match.params.id;

    this.props.getProductDetail(id);
    if (!this.props.products) {
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
    const props = this.props.products.productDetail;
    return (
      <div>
        <div className="container">
          {props ? (
            <div className="product_detail_wrapper">
              <div className="left">
                <div style={{ width: "500px" }}>
                  <ProductImages detail={props} />
                </div>
              </div>
              <div className="right">
                <ProductInfo
                  detail={props}
                  addToCart={id => this.addToCartHandler(id)}
                  user={this.props.user.profile}
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

ProductView.propTypes = {
  addToCart: PropTypes.func.isRequired,
  getProductDetail: PropTypes.func.isRequired,
  clearProductDetail: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user,
    errors: state.errors
  };
};
export default connect(
  mapStateToProps,
  { getUserProfile, addToCart, getProductDetail, clearProductDetail }
)(ProductView);
