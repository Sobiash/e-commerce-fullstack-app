import React from "react";
import { getUserProfile } from "../../actions/user_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class CartBlock extends React.Component {
  componentDidMount() {
    this.props.getUserProfile();
  }

  // renderCartImages = images => {
  //   if (images.length > 0) {
  //     return images[0].url;
  //   } else {
  //     return "/images/img1.jpeg";
  //   }
  // };

  renderCartItems = () =>
    this.props.cart
      ? this.props.cart.map(item => (
          <tr className="table-row" key={item._id}>
            <td className="column-1">
              {/* <div className="cart-img-product">
                <img
                  src={this.renderCartImages(item.images)}
                  alt="item"
                  className="image"
                />
              </div> */}
            </td>
            {/* <td className="column-2">{item.name}</td>
            <td className="column-3">{item.price}</td> */}
            <td class="column-4">{item.quantity}</td>
            <td class="column-5">
              <div style={{ display: "block" }}>
                <div
                  className="link_default"
                  style={{
                    display: "inline-block",
                    padding: "6px",
                    marginRight: "5px"
                  }}
                  // onClick={() => this.props.removeItem(item._id, item.quantity)}
                >
                  -
                </div>
                <div
                  className="link_default"
                  style={{ display: "inline-block", padding: "5px" }}
                >
                  +
                </div>

                <div
                  className="item btn "
                  style={{ display: "inline-block", padding: "5px" }}
                >
                  <div
                    className="cart_remove_btn link_default"
                    style={{ padding: "5px" }}
                    onClick={() => this.props.removeItem(item._id)}
                  >
                    Remove
                  </div>
                </div>
              </div>
            </td>
          </tr>
        ))
      : null;
  render() {
    return <React.Fragment>{this.renderCartItems()}</React.Fragment>;
  }
}

CartBlock.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { getUserProfile }
)(CartBlock);
