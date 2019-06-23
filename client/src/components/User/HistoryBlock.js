import React from "react";
import UserLayout from "../Hoc/UserLayout";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUserProfile, getCartDetail } from "../../actions/user_actions";

class HistoryBlock extends React.Component {
  componentDidMount() {
    const { getUserProfile, getCartDetail } = this.props;
    getUserProfile();
    getCartDetail();
  }

  render() {
    const { history } = this.props.user.profile;
    const renderHistory = () =>
      history &&
      history.map((product, i) => {
        const {
          name,
          dateOfPurchase,
          purchaseOrder,
          selectedSize,
          selectedColor,
          price,
          quantity
        } = product;
        return (
          <tr key={i}>
            <td>{dateOfPurchase}</td>
            <td>{purchaseOrder}</td>
            <td>{name}</td>
            <td>
              {selectedSize} {selectedColor}
            </td>
            <td>$ {price * quantity}</td>
            <td>{quantity}</td>
          </tr>
        );
      });
    return history && history.length > 0 ? (
      <UserLayout>
        <div className="user_nfo_panel">
          <div className="user_product_block_wrapper">
            <h2>Orders</h2>
            <p>
              Check the status and information regarding your online orders. You
              can also cancel the order or request a refund.
            </p>
            <br />
            <div className="history_blocks">
              <table>
                <thead>
                  <tr>
                    <th>Order Date</th>
                    <th>Order Number</th>
                    <th>Product name</th>
                    <th>Product size&color</th>
                    <th>Price paid</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>{renderHistory()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </UserLayout>
    ) : (
      <UserLayout>
        <div className="user_nfo_panel">
          <div className="user_product_block_wrapper">
            <h2>Orders</h2>
            <p>
              Check the status and information regarding your online orders. You
              can also cancel the order or request a refund.
            </p>
          </div>
        </div>
      </UserLayout>
    );
  }
}

HistoryBlock.propTypes = {
  user: PropTypes.object.isRequired,
  history: PropTypes.array.isRequired,
  getUserProfile: PropTypes.func.isRequired,
  getCartDetail: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { getUserProfile, getCartDetail }
)(withRouter(HistoryBlock));
