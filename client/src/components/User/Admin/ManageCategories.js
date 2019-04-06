import React from "react";
import UserLayout from "../../Hoc/UserLayout";
import ManageDresses from "./ManageDresses";
import ManageColors from "./ManageColors";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUserProfile } from "../../../actions/user_actions";
import PropTypes from "prop-types";

class ManageCategories extends React.Component {
  componentDidMount() {
    this.props.getUserProfile();
  }
  render() {
    return (
      <UserLayout>
        <ManageDresses />
        <ManageColors />
      </UserLayout>
    );
  }
}

ManageCategories.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { getUserProfile }
)(withRouter(ManageCategories));
