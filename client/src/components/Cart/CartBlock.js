import React from "react";
import { getUserProfile, getCartDetail } from "../../actions/user_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import img from "../../images/img1.jpeg";

class CartBlock extends React.Component {
  componentDidMount() {
    const { getUserProfile, getCartDetail } = this.props;
    getUserProfile();
    getCartDetail();
  }

  renderCartImages = images => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return `${img}`;
    }
  };

  renderCartItems = cart => {
    const { decreaseItem, increaseItem, removeItem } = this.props;
    const { _id, product, quantity, selectedSize, selectedColor } = cart;
    const { name, price, images } = product;
    const { renderCartImages } = this;
    return (
      <tbody>
        <tr className="table-row" key={_id}>
          <td className="column-1">
            <div className="cart-img-product">
              <img
                src={renderCartImages(images)}
                alt="item"
                className="image"
              />
            </div>
          </td>
          <td className="column-2">{name}</td>
          <td className="column-3">{price * quantity}</td>
          <td className="column-4">{quantity}</td>
          <td className="column-4">{selectedSize}</td>
          <td className="column-4">{selectedColor}</td>
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
                onClick={() => decreaseItem(_id)}
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
                onClick={() => increaseItem(_id)}
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
                  onClick={() => removeItem(_id)}
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
    const { cart } = this.props;
    const { renderCartItems } = this;
    return <React.Fragment>{renderCartItems(cart)}</React.Fragment>;
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
