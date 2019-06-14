import React from "react";
import UserLayout from "../Hoc/UserLayout";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import {
  getUserProfile,
  deleteProfile,
  clearCurrentProfile,
  getCartDetail
} from "../../actions/user_actions";
import Spinner from "../UI/spinner";
import PropTypes from "prop-types";

class Userdashboard extends React.Component {
  componentDidMount() {
    this.props.getUserProfile();
    this.props.getCartDetail();
  }

  deleteProfile = e => {
    e.preventDefault();
    this.props.deleteProfile();
    this.props.clearCurrentProfile();
    this.props.history.push("/register_login");
  };

  render() {
    const { loading } = this.props.user;

    let dashboardContent;

    if (loading) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = (
        <div>
          <h2>My account </h2>
          <br />
          <Link to="/user/order_history">
            <h3> Orders and Returns</h3>
          </Link>

          <p>
            Check the status and information regarding your online orders. You
            can also cancel the order or request a refund.
          </p>

          <br />
          <Link to="/user/address">
            <h3>Address book</h3>
          </Link>
          <p>
            Use the address book to store as many addresses as you wish (your
            house, your office, your family residence, etc.). This means you
            won't have to fill in the shipping address each time you place an
            order.
          </p>
          <br />
          <Link to="/user/user_profile">
            <h3>Personal Details</h3>
          </Link>
          <p>
            You can access and modify your personal details (name, billing
            address, telephone number, etc.) in order to speed up your future
            purchases and notify us of changes in your contact details.
          </p>
          <br />
        </div>
      );
    }

    return <UserLayout>{dashboardContent}</UserLayout>;
  }
}

Userdashboard.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  getCartDetail: PropTypes.func.isRequired,
  deleteProfile: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { getUserProfile, deleteProfile, clearCurrentProfile, getCartDetail }
)(withRouter(Userdashboard));
