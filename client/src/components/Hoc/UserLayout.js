import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const links = [
  {
    name: "My account",
    linkTo: "/user/dashboard"
  },
  {
    name: "Order history",
    linkTo: "/user/order_history"
  },
  {
    name: "My cart",
    linkTo: "/user/cart"
  }
];

const admin = [
  {
    name: "Site info",
    linkTo: "/admin/site_info"
  },
  {
    name: "Add products",
    linkTo: "/admin/add_products"
  },
  {
    name: "Manage categories",
    linkTo: "/admin/manage_categories"
  }
];

class UserLayout extends React.Component {
  render() {
    const { profile } = this.props.user;

    const generateLinks = links =>
      links.map((link, i) => (
        <Link to={link.linkTo} key={i}>
          {link.name}
        </Link>
      ));
    return (
      <div className="container">
        <div className="user_container">
          <div className="user_left_nav">
            <h3>My account</h3>
            <div className="links">{generateLinks(links)}</div>
            {profile && profile.isAdmin && (
              <div>
                <h3>Admin</h3>
                <div className="links">{generateLinks(admin)}</div>
              </div>
            )}
          </div>
          <div className="user_right">{this.props.children}</div>
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
