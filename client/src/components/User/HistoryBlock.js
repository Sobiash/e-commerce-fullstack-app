import React from "react";
import UserLayout from "../Hoc/UserLayout";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUserProfile, getCartDetail } from "../../actions/user_actions";

class HistoryBlock extends React.Component {
  componentDidMount() {
    this.props.getUserProfile();
    this.props.getCartDetail();
  }

  render() {
    const history = this.props.user.profile.history;
    const renderHistory = () =>
      history &&
      history.map((product, i) => (
        <tr key={i}>
          <td>{product.purchaseOrder}</td>
          <td>{product.name}</td>
          <td>$ {product.price * product.quantity}</td>
          <td>{product.quantity}</td>
        </tr>
      ));
    return history && history.length > 0 ? (
      <UserLayout>
        <div className="user_nfo_panel">
          <div className="user_product_block_wrapper">
            <h3>History Purchases</h3>
            <div className="history_blocks">
              <table>
                <thead>
                  <tr>
                    <th>Order Number</th>
                    <th>Product name</th>
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
            <h3>History Purchases</h3>
            You have no history of purchases.
          </div>
        </div>
      </UserLayout>
    );

    // return <div>sobia</div>;
  }
}

HistoryBlock.propTypes = {
  history: PropTypes.array.isRequired
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
