import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getProductDetail,
  clearProductDetail,
  deleteProduct
} from "../../actions/products_actions";
import { addToCart, getUserProfile } from "../../actions/user_actions";
import ProductInfo from "./ProductInfo";
import Spinner from "../UI/spinner";
import PropTypes from "prop-types";
import ProductImages from "./ProductImages";

class ProductView extends Component {
  state = {
    selectedSize: "",
    selectedColor: "",
    sizeSelectionMissingRemark: "",
    colorSelectionMissingRemark: ""
  };

  componentDidMount() {
    const {
      getUserProfile,
      getProductDetail,
      products,
      history,
      match
    } = this.props;

    getUserProfile();
    const id = match.params.id;

    getProductDetail(id);

    if (!products) {
      history.push("/");
    }
  }

  componentWillUnmount() {
    const { clearProductDetail } = this.props;
    clearProductDetail();
  }

  addToCartHandler = (id, productDetail, selectedSize, selectedColor) => {
    const { addToCart } = this.props;
    addToCart(id, productDetail, selectedSize, selectedColor);
  };

  deleteProduct = id => {
    const { deleteProduct, history } = this.props;
    deleteProduct(id);
    if (window.confirm) {
      history.push("/shop");
    }
  };

  handleSizeSelection = selectedSize => this.setState({ selectedSize });

  handleColorSelection = selectedColor => this.setState({ selectedColor });

  validateSizeSelection = remark =>
    remark === "valid"
      ? this.setState({ sizeSelectionMissingRemark: "" })
      : this.setState({ sizeSelectionMissingRemark: remark });

  validateColorSelection = remark =>
    remark === "valid"
      ? this.setState({ colorSelectionMissingRemark: "" })
      : this.setState({ colorSelectionMissingRemark: remark });

  render() {
    const { user, auth, products } = this.props;
    const { profile } = user;
    const { isAuthenticated } = auth;
    const { productDetail } = products;
    const { selectedSize, selectedColor } = this.state;
    const {
      addToCartHandler,
      deleteProduct,
      handleSizeSelection,
      handleColorSelection,
      validateColorSelection,
      validateSizeSelection
    } = this;

    return (
      <div>
        <div className="container">
          {productDetail ? (
            <div className="product_detail_wrapper">
              <div className="left">
                <div style={{ width: "500px" }}>
                  <ProductImages detail={productDetail} />
                </div>
              </div>
              <div className="right">
                <ProductInfo
                  {...this.state}
                  detail={productDetail}
                  addToCart={id =>
                    addToCartHandler(
                      id,
                      productDetail,
                      selectedSize,
                      selectedColor
                    )
                  }
                  user={profile}
                  deleteProduct={id => deleteProduct(id)}
                  handleSizeSelection={handleSizeSelection}
                  handleColorSelection={handleColorSelection}
                  validateSizeSelection={validateSizeSelection}
                  validateColorSelection={validateColorSelection}
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
  auth: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    products: state.products,
    user: state.user,
    auth: state.auth
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
