import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const links = [
  {
    name: "MY ACCOUNT",
    linkTo: "/user/dashboard"
  },
  {
    name: "ORDERS",
    linkTo: "/user/order_history"
  },
  {
    name: "PERSONAL DETAILS",
    linkTo: "/user/user_profile"
  }
];

const admin = [
  {
    name: "ADD PRODUCTS",
    linkTo: "/admin/add_products"
  },
  {
    name: "MANAGE CATEGORIES",
    linkTo: "/admin/manage_categories"
  }
];

class UserLayout extends React.Component {
  render() {
    const { user, children } = this.props;
    const { profile } = user;

    const generateLinks = links =>
      links.map((link, i) => (
        <div>
          <Link to={link.linkTo} key={i}>
            {link.name}
          </Link>
        </div>
      ));
    return (
      <div className="container">
        <div className="user_container">
          <div className="user_left_nav">
            <div>{generateLinks(links)}</div>
            {profile && profile.isAdmin && (
              <div>
                <br />
                <h3>ADMIN</h3>
                <div>{generateLinks(admin)}</div>
              </div>
            )}
          </div>
          <div className="user_right">{children}</div>
        </div>
      </div>
    );
  }
}

UserLayout.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(UserLayout);
