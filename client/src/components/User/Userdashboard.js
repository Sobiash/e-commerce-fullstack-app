import React from "react";
import UserLayout from "../Hoc/UserLayout";
import HistoryBlock from "./HistoryBlock";
import MyButton from "../utils/button";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getUserProfile,
  deleteProfile,
  clearCurrentProfile
} from "../../actions/user_actions";
import Spinner from "../utils/spinner";
import PropTypes from "prop-types";

class Userdashboard extends React.Component {
  componentDidMount() {
    this.props.getUserProfile();
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

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <div className="user_nfo_panel">
              <h3>User information</h3>
              <div>
                <span>{profile.name}</span>
                <span>{profile.lastname}</span>
                <span>{profile.email}</span>
              </div>

              <MyButton
                type="default"
                title="Edit info"
                linkTo="/user/user_profile"
              />
              <div
                style={{ marginTop: "10px", padding: "10px 12px" }}
                className="link_default"
                onClick={event => this.deleteProfile(event)}
              >
                Delete my account
              </div>
            </div>

            {profile.history ? (
              <div className="user_nfo_panel">
                <h3>History Purchases</h3>
                <div className="user_product_block_wrapper">
                  <HistoryBlock products={profile.history} />
                </div>
              </div>
            ) : null}
          </div>
        );
      }
    }

    return (
      <UserLayout>
        <h3>Dashboard</h3>
        {dashboardContent}
      </UserLayout>
    );
  }
}

Userdashboard.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  deleteProfile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { getUserProfile, deleteProfile, clearCurrentProfile }
)(withRouter(Userdashboard));
