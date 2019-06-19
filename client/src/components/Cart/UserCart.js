import React, { Component } from "react";
import CartBlock from "./CartBlock";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getUserProfile,
  getCartDetail,
  removeCartItems,
  increaseItem,
  decreaseItem,
  onSuccessBuy
} from "../../actions/user_actions";
import { calculateTotal } from "../utils/helper";
import img from "../../images/img4.jpeg";
import Payment from "./Payment";
import PopularCategories from "../PopularCategories/PopoularCategories";

class UserCart extends Component {
  state = {
    showSuccess: false
  };

  componentDidMount() {
    const { getUserProfile, getCartDetail } = this.props;
    getUserProfile();
    getCartDetail();
  }

  showNotItems = () => (
    <div className="container">
      <div style={{ marginTop: "40px", marginLeft: "350px" }}>
        You have no items!!
      </div>
    </div>
  );

  removeFromCart = id => {
    this.props.removeCartItems(id);
  };
  increaseItem = id => {
    this.props.increaseItem(id);
  };
  decreaseItem = id => {
    this.props.decreaseItem(id);
  };

  onTransactionSuccess = data => {
    const { cartDetail, successBuy } = this.props.user;
    this.props.onSuccessBuy({
      cartDetail: cartDetail,
      paymentData: data
    });
    if (successBuy) {
      this.setState({
        showSuccess: true
      });
    }
  };

  render() {
    const { cartDetail } = this.props.user;
    const { email } = this.props.user.profile;
    const { isAuthenticated } = this.props.auth;
    const CartItem =
      cartDetail.length > 0 &&
      cartDetail.map(item => {
        return (
          <CartBlock
            key={item._id}
            cart={item}
            type="cart"
            removeItem={id => this.removeFromCart(id)}
            increaseItem={id => this.increaseItem(id)}
            decreaseItem={id => this.decreaseItem(id)}
          />
        );
      });

    return (
      <div>
        {!isAuthenticated ? (
          <div className="container">
            <div className="shopping_cart">
              <h1>Shopping Bag</h1>

              <div className="shopping_bag">
                <div className="shopping_bag_left">
                  <div className="login_info">
                    <h2>Your shopping bag is empty!</h2>
                    <div className="login_info_detail">
                      <p>
                        Log in to save or access already saved items in your
                        shopping bag.
                      </p>

                      <Link to="/register_login">
                        <span>SIGN IN</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="user_cart_sum">
                  <h2 style={{ marginTop: "20px" }}>Shopping Bag, Sum</h2>
                  <div className="user_cart_info">
                    <p>
                      Proceed to the checkout - log in to use your Club offers
                      in the next step
                    </p>
                    <p>ORDER VALUE : $ 0.00</p>
                    <div className="link_default cart_link ">
                      Proceed to checkout
                    </div>
                    <p>
                      Prices and delivery costs are not confirmed until you have
                      reached the checkout.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div
              className="bg-title-page"
              style={{
                background: `url(${img})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
              }}
            >
              <h2 className="l-text2 t-center">Cart</h2>
            </div>

            <div className="container-table-cart">
              <div className="container">
                {cartDetail.length > 0 ? (
                  <div className="wrap-table-shopping-cart ">
                    <table className="table-shopping-cart">
                      <tbody>
                        <tr className="table-head">
                          <th className="column-1" />
                          <th className="column-2">Product</th>
                          <th className="column-3">Price</th>
                          <th className="column-4 padding">Quantity</th>
                          <th className="column-4 padding">Size</th>
                          <th className="column-4 padding">Color</th>
                          <th className="column-5" />
                        </tr>
                      </tbody>
                      {CartItem}
                    </table>
                    <br />
                    <Link to="/shop">
                      <div className="link_default">Continue shopping</div>
                    </Link>
                  </div>
                ) : (
                  this.showNotItems()
                )}
              </div>

              {cartDetail.length > 0 && (
                <div
                  className="user_cart_sum"
                  style={{ width: "350px", marginRight: "250px" }}
                >
                  <h2 style={{ marginTop: "20px" }}>Shopping Bag, Sum</h2>
                  <div className="user_cart_info">
                    <p>ORDER VALUE : $ {calculateTotal(cartDetail)}</p>
                    <div className="payment">
                      <Payment
                        amount={calculateTotal(cartDetail)}
                        email={email}
                        cart={cartDetail[0].images[0].url}
                        onSuccess={data => this.onTransactionSuccess(data)}
                      >
                        <div
                          className="bag_link"
                          style={{ margin: "30px 0px" }}
                        >
                          Proceed to Checkout
                        </div>
                      </Payment>
                    </div>
                    <p>
                      Prices and delivery costs are not confirmed until you have
                      reached the checkout.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {!isAuthenticated && <PopularCategories />}
      </div>
    );
  }
}

UserCart.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getUserProfile: PropTypes.func.isRequired,
  getCartDetail: PropTypes.func.isRequired,
  increaseItem: PropTypes.func.isRequired,
  decreaseItem: PropTypes.func.isRequired,
  removeCartItems: PropTypes.func.isRequired,
  onSuccessBuy: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  {
    onSuccessBuy,
    removeCartItems,
    getCartDetail,
    increaseItem,
    decreaseItem,
    getUserProfile
  }
)(UserCart);
