import React, { Component } from "react";
import UserLayout from "../Hoc/User";
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
      <UserLayout>
        <div>
          <h1>My Cart</h1>
          <div className="user_cart">
            <CartBlock
              user={this.props.user}
              type="cart"
              removeItem={id => this.removeFromCart(id)}
            />
            {this.state.showTotal ? (
              <div>
                <div className="user_cart_sum">
                  Total Amount: ${this.state.total}
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
          </div>
          {this.state.showTotal ? (
            <div className="payment_button_container">pay</div>
          ) : null}
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(UserCart);
