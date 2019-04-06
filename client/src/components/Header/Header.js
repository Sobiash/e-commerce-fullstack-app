import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/auth_actions";
import {
  clearCurrentProfile,
  getUserProfile
} from "../../actions/user_actions";

import PropTypes from "prop-types";

class Header extends React.Component {
  state = {
    page: [
      {
        name: "Shop",
        linkTo: "/shop",
        public: true
      }
    ],
    user: [
      {
        name: "My Cart",
        icon: "/images/icons/icon-header-02.png",
        linkTo: "/user/cart",
        public: true
      },
      {
        name: "Sign Up",
        linkTo: "/register",
        public: true
      },
      {
        name: "My Profile",
        linkTo: "/user/dashboard",
        public: false
      },
      {
        name: "Log In",
        linkTo: "/register_login",
        public: true
      },
      {
        name: "Log out",
        linkTo: "/user/logout",
        public: false
      }
    ]
  };

  componentDidMount() {
    this.props.getUserProfile();
  }

  logoutHandler = () => {
    this.props.logoutUser();
    this.props.clearCurrentProfile();
    this.props.history.push("/register_login");
  };

  defaultLink = (item, i) =>
    item.name === "Log out" ? (
      <div
        className="log_out_link"
        key={i}
        onClick={() => this.logoutHandler()}
      >
        {item.name}
      </div>
    ) : (
      <Link to={item.linkTo} key={i} className="icon-login">
        {item.name}
      </Link>
    );

  cartLink = (item, i) => {
    const user = this.props.user.profile;
    return (
      <div className="cart_link" key={i}>
        <span>{user.cart ? user.cart.length : 0}</span>
        <Link to={item.linkTo} className="icon-cart">
          <img src={item.icon} alt="MY_CART" />
        </Link>
      </div>
    );
  };

  showLinks = type => {
    let list = [];
    if (this.props.auth) {
      type.forEach(item => {
        if (!this.props.auth.isAuthenticated) {
          if (item.public === true) {
            list.push(item);
          }
        } else {
          if (item.name !== "Log In" && item.name !== "Sign Up") {
            list.push(item);
          }
        }
      });
    }
    return list.map((item, i) => {
      if (item.name !== "My Cart") {
        return this.defaultLink(item, i);
      } else {
        return this.cartLink(item, i);
      }
    });
  };

  render() {
    return (
      <header className="header1">
        <div className="wrap_header">
          <Link to="/" className="logo">
            <img src="/images/icons/logo.png" alt="IMG-LOGO" />
          </Link>
          <div className="header-icons">
            <div>{this.showLinks(this.state.user)}</div>
            <div>{this.showLinks(this.state.page)}</div>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getUserProfile: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile, getUserProfile }
)(withRouter(Header));
