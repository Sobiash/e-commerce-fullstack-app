import React, { Component } from "react";
import UserLayout from "../Hoc/UserLayout";
import CartBlock from "./CartBlock";
import { connect } from "react-redux";
import { cartItems, removeCartItems } from "../../actions/user_actions";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";

class UserCart extends Component {
  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSuccess: false
  };

  componentDidMount() {
    let cartItem = [];
    let user = this.props.user;
    if (user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach(item => {
          cartItem.push(item.id);
        });
        this.props
          .dispatch(cartItems(cartItem, user.userData.cart))
          .then(() => {
            if (this.props.user.cartDetail.length > 0) {
              this.calculateTotal(this.props.user.cartDetail);
            }
          });
      } else {
      }
    }
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
    this.props.dispatch(removeCartItems(id)).then(() => {
      if (this.props.user.cartDetail.length <= 0) {
        this.setState({
          showTotal: false
        });
      } else {
        this.calculateTotal(this.props.user.cartDetail);
      }
    });
  };
  render() {
    return (
      <div class="container-table-cart">
        <div className="container">
          <h1>Cart</h1>
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
                user={this.props.user}
                type="cart"
                removeItem={id => this.removeFromCart(id)}
              />
            </table>
          </div>
          {this.state.showTotal ? (
            <div>
              <div className="user_cart_sum">
                <h4>Cart Totals</h4>
                <div>
                  <span>Subtotal:</span>
                  <span>${this.state.total}</span>
                </div>
                <div className="payment">
                  <div className="link_default">Proceed to Checkout</div>
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
          )}

          {this.state.showTotal ? (
            <div className="payment_button_container">pay</div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(UserCart);
