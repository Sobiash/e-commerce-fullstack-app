import React, { Component } from "react";
import CartBlock from "./CartBlock";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getUserProfile,
  cartItems,
  removeCartItems,
  onSuccessBuy
} from "../../actions/user_actions";
import Payment from "./Payment";
import PopularCategories from "../PopularCategories/PopoularCategories";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";

class UserCart extends Component {
  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSuccess: false
  };

  componentDidMount() {
    this.props.getUserProfile();
    console.log(this.props.user);
  }

  calculateTotal = cartDetail => {
    let total = 0;
    cartDetail.forEach(item => {
      total += parseInt(item.price, 10) * item.quantity;
    });
    this.setState({
      total,
      showTotal: true
    });
  };
  showNotItems = () => (
    <div className="cart_no_items">
      <FontAwesomeIcon icon="frown" />
      <div>You have no items</div>
    </div>
  );
  removeFromCart = id => {
    this.props.removeCartItems(id);
    // if (this.props.user.profile.cart.length <= 0) {
    //   this.setState({
    //     showTotal: false
    //   });
  };
  // else {
  // this.calculateTotal(this.props.user.profile.cart);
  // }
  // };

  onTransactionSuccess = data => {
    this.props.onSuccessBuy({
      cartDetail: this.props.user.profile.cart,
      paymentData: data
    });

    if (this.props.user.successBuy) {
      this.setState({
        showTotal: false,
        showSuccess: true
      });
    }
  };

  render() {
    // console.log(this.props.user.profile.cart.length);
    // if (this.props.user.profile.cart) {
    //   let cartItem = [];

    //   if (this.props.user.profile.cart) {
    //     if (this.props.user.profile.cart.length > 0) {
    //       this.props.user.profile.cart.forEach(item => {
    //         cartItem.push(item.id);
    //       });

    //       this.props.cartItems(cartItem, this.props.user.profile.cart);

    //       if (this.props.user.cartDetail.length > 0) {
    //         this.calculateTotal(this.props.user.cartDetail);
    //       }
    //     } else {
    //       console.log("error");
    //     }
    //   }
    // }
    // const cart = this.props.user.profile.cart;
    // // const cartI = [];

    // const cartItme = cart.map(item => {
    //   return      <div className="wrap-table-shopping-cart ">
    //                 <table className="table-shopping-cart">
    //                   <tr className="table-head">
    //                     <th className="column-1" />
    //                     <th className="column-2">Product</th>
    //                     <th className="column-3">Price</th>
    //                     <th className="column-4 padding">Quantity</th>
    //                     <th className="column-5" />
    //                   </tr>
    //                     <CartBlock
    //                     user={this.props.user}
    //                     type="cart"
    //                     removeItem={id => this.removeFromCart(id)}
    //                   />
    //                   </table>
    //                   </div>
    // });

    return (
      <div>
        {!this.props.auth.isAuthenticated ? (
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
                  <h2>Shopping Bag, Sum</h2>
                  <div className="user_cart_info">
                    <p>
                      Proceed to the checkout - log in to use your Club offers
                      in the next step
                    </p>
                    <p>ORDER VALUE : $ 0.00</p>
                    <p>ORDER SUM: : $ 0.00</p>
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
                background: "url(/images/img4.jpeg)",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
              }}
            >
              <h2 className="l-text2 t-center">Cart</h2>
            </div>

            <div className="container-table-cart">
              <div className="container">
                {/* {cartItme} */}
                {/* {this.props.user.cartDetail &&
                this.props.user.cartDetail.length > 0 ? ( */}
                <div className="wrap-table-shopping-cart ">
                  <table className="table-shopping-cart">
                    <tr className="table-head">
                      <th className="column-1" />
                      <th className="column-2">Product</th>
                      <th className="column-3">Price</th>
                      <th className="column-4 padding">Quantity</th>
                      <th className="column-5" />
                    </tr>
                    <CartBlock
                      cart={this.props.user.profile.cart}
                      type="cart"
                      removeItem={id => this.removeFromCart(id)}
                    />
                  </table>
                </div>
                {/* ) : null} */}

                {/* {this.state.showTotal ? (
                  <div>
                    <div className="user_cart_sum">
                      <h2>Shopping Bag, Sum</h2>
                      <div className="user_cart_info">
                        <p>
                          Proceed to the checkout - log in to use your Club
                          offers in the next step
                        </p>
                        <p>ORDER VALUE : $ {this.state.total}</p>
                        <p>ORDER SUM: : $ {this.state.total}</p>
                        <div className="payment">
                          <Payment
                            amount={this.state.total}
                            email={this.props.user.profile.email}
                            onSuccess={data => this.onTransactionSuccess(data)}
                          >
                            <div className="link_default cart_link">
                              Proceed to checkout
                            </div>
                          </Payment>
                        </div>
                        <p>
                          Prices and delivery costs are not confirmed until you
                          have reached the checkout.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : this.state.showSuccess ? (
                  <div className="cart_success">
                    <FontAwesomeIcon icon="smile" />
                    <div>Thankyou for your purchases.</div>
                  </div>
                ) : (
                  this.showNotItems()
                )} */}
              </div>
            </div>
          </div>
        )}
        <PopularCategories />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { cartItems, onSuccessBuy, removeCartItems, getUserProfile }
)(UserCart);
