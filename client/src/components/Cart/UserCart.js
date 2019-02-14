import React, { Component } from "react";
import UserLayout from "../Hoc/User";
import CartBlock from "./CartBlock";
import { connect } from "react-redux";
import { cartItems } from "../../actions/user_actions";
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
          .then(() => {});
      } else {
      }
    }
  }
  removeFromCart = () => {};
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
          </div>
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
