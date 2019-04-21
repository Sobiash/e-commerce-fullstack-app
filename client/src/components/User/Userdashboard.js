import React from "react";
import UserLayout from "../Hoc/UserLayout";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  getUserProfile,
  deleteProfile,
  clearCurrentProfile,
  getCartDetail
} from "../../actions/user_actions";
import Spinner from "../utils/spinner";
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
    const { profile, loading } = this.props.user;

    let dashboardContent;

    if (loading) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = (
        <div>
          <div className="user_nfo_panel">
            <h3>User information</h3>
            <div>
              <span>{profile.name}</span>
              <span>{profile.lastname}</span>
              <span>{profile.email}</span>
            </div>
            <div style={{ display: "block" }}>
              <div
                className="link_default"
                style={{ display: "inline-block", marginRight: "20px" }}
              >
                <Link to="/user/user_profile">
                  <FontAwesomeIcon icon="pencil-alt" />
                </Link>
              </div>
              <div style={{ display: "inline-block" }}>
                <div
                  style={{ marginTop: "10px" }}
                  className="link_default"
                  onClick={event => this.deleteProfile(event)}
                >
                  <FontAwesomeIcon icon="trash-alt" />
                </div>
              </div>
            </div>
          </div>
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
