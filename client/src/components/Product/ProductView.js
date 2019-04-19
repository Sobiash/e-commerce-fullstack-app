import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getProductDetail,
  clearProductDetail,
  deleteProduct
} from "../../actions/products_actions";
import { addToCart, getUserProfile } from "../../actions/user_actions";
import ProductInfo from "./ProductInfo";
import Spinner from "../utils/spinner";
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

  addToCartHandler = (id, name, price, images) => {
    this.props.addToCart(id, name, price, images);
  };

  deleteProduct = id => {
    this.props.deleteProduct(id);
    this.props.history.push("/shop");
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
                  addToCart={id =>
                    this.addToCartHandler(
                      id,
                      props.name,
                      props.price,
                      props.images
                    )
                  }
                  user={this.props.user.profile}
                  deleteProduct={id => this.deleteProduct(id)}
                />
              </div>
            </div>
          ) : (
            <Spinner />
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
  products: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user
  };
};
export default connect(
  mapStateToProps,
  {
    getUserProfile,
    addToCart,
    getProductDetail,
    clearProductDetail,
    deleteProduct
  }
)(ProductView);
