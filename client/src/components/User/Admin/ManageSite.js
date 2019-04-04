import React from "react";
import UserLayout from "../../Hoc/UserLayout";
import UpdateSiteInfo from "./UpdateSiteInfo";
import { getUserProfile } from "../../../actions/user_actions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class ManageSite extends React.Component {
  componentDidMount() {
    this.props.getUserProfile();
  }
  render() {
    return (
      <UserLayout>
        <UpdateSiteInfo />
      </UserLayout>
    );
  }
}

ManageSite.propTypes = {
  getUserProfile: PropTypes.func.isRequired,
  site: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    site: state.site,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { getUserProfile }
)(ManageSite);
