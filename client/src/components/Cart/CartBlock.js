import React from "react";
import { getUserProfile, getCartDetail } from "../../actions/user_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class CartBlock extends React.Component {
  componentDidMount() {
    this.props.getUserProfile();
    this.props.getCartDetail();
  }

  renderCartImages = images => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/img1.jpeg";
    }
  };

  renderCartItems = cart => {
    return (
      <tbody>
        <tr className="table-row" key={cart._id}>
          <td className="column-1">
            <div className="cart-img-product">
              <img
                src={this.renderCartImages(cart.images)}
                alt="item"
                className="image"
              />
            </div>
          </td>
          <td className="column-2">{cart.name}</td>
          <td className="column-3">{cart.price}</td>
          <td className="column-4">{cart.quantity}</td>
          <td className="column-5">
            <div style={{ display: "block" }}>
              <div
                className="link_default"
                style={{
                  display: "inline-block",
                  padding: "5px",
                  marginRight: "5px",
                  marginTop: "0"
                }}
                onClick={() => this.props.decreaseItem(cart.product)}
              >
                -
              </div>
              <div
                className="link_default"
                style={{
                  display: "inline-block",
                  padding: "4px",
                  marginTop: "0"
                }}
                onClick={() => this.props.increaseItem(cart.product)}
              >
                +
              </div>

              <div
                className="item btn "
                style={{
                  display: "inline-block",
                  padding: "4px",
                  marginTop: "0"
                }}
              >
                <div
                  className="cart_remove_btn link_default"
                  style={{ padding: "4px", marginTop: "0" }}
                  onClick={() => this.props.removeItem(cart.product)}
                >
                  Remove
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    );
  };

  render() {
    return (
      <React.Fragment>{this.renderCartItems(this.props.cart)}</React.Fragment>
    );
  }
}

CartBlock.propTypes = {
  cart: PropTypes.object.isRequired,
  getUserProfile: PropTypes.func.isRequired,
  getCartDetail: PropTypes.func.isRequired,
  increaseItem: PropTypes.func.isRequired,
  decreaseItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired
};

export default connect(
  null,
  { getUserProfile, getCartDetail }
)(CartBlock);
