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
          <Link to="/user/payment_data">
            <h3> Payment Details</h3>
          </Link>
          <p>
            If you have saved your PAYMENT DATA, you can see your cards, delete
            them and choose your main card for future purchases from here.
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
          <Link to="/user/access_data">
            <h3>Access Details</h3>
          </Link>

          <p>
            You can change your access details (e-mail and password ). Remember
            that the security of your personal details is important. You should
            use a secure password and change it from time to time.
          </p>
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
