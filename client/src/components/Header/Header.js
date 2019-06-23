import React from "react";
import { Link, withRouter } from "react-router-dom";
import MiniSummary from "../Cart/MiniSummary";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/auth_actions";
import { onSuccessBuy } from "../../actions/user_actions";
import img from "../../images/icons/icon-header-02.png";
import img2 from "../../images/icons/logo.png";

import {
  clearCurrentProfile,
  getUserProfile,
  getCartDetail
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
        icon: img,
        linkTo: "/user/cart",
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
    ],
    isOpen: false,
    subMenuOpen: false,
    subMenuCategorySelected: "",
    openCartPreview: false,
    cartLength: 0,
    showSuccess: false
  };

  componentDidMount() {
    const { user, getUserProfile, getCartDetail } = this.props;
    getUserProfile();
    getCartDetail();
    this.setState({
      cartLength: user.cartDetail.length
    });
  }

  componentWillUpdate(nextProps, nextState) {
    const { user, getCartDetail } = this.props;
    const { cartDetail } = user;
    if (nextProps.user.cartDetail !== cartDetail) {
      getCartDetail();
      this.setState({
        cartLength: cartDetail.length
      });
    }
  }

  logoutHandler = () => {
    const { logoutUser, clearCurrentProfile, history } = this.props;
    logoutUser();
    clearCurrentProfile();
    history.push("/register_login");
  };

  onTransactionSuccess = data => {
    const { onSuccessBuy, user } = this.props;
    const { cartDetail, successBuy } = user;

    onSuccessBuy({
      cartDetail: cartDetail,
      paymentData: data
    });
    if (successBuy) {
      this.setState({
        showSuccess: true
      });
    }
  };

  defaultLink = (item, i) => {
    const { logoutHandler } = this;
    return item.name === "Log out" ? (
      <div className="log_out_link" key={i} onClick={() => logoutHandler()}>
        {item.name}
      </div>
    ) : (
      <Link to={item.linkTo} key={i} className="icon-login">
        {item.name}
      </Link>
    );
  };

  cartLink = (item, i) => {
    const { onTransactionSuccess } = this;
    const { auth, user } = this.props;
    const { cartLength, openCartPreview } = this.state;
    const { cartDetail, profile } = user;
    const { isAuthenticated } = auth;
    return (
      <div className="cart_link" key={i}>
        <span className="cart_link_span">{cartDetail && cartLength}</span>
        <img
          src={item.icon}
          alt="MY_CART"
          style={{ cursor: "pointer" }}
          onClick={() => this.setState({ openCartPreview: !openCartPreview })}
        />
        {openCartPreview && (
          <div
            style={{
              position: "fixed",
              width: "300px",
              minHeight: "150px",
              right: "15",
              top: "50",
              border: "solid 1px #3333",
              zIndex: "150",
              background: "white"
            }}
          >
            <MiniSummary
              empty={cartDetail.length === 0 && true}
              cart={cartDetail}
              email={profile.email}
              onTransactionSuccess={onTransactionSuccess}
            />
          </div>
        )}
      </div>
    );
  };

  showLinks = type => {
    const { defaultLink, cartLink } = this;
    const { auth } = this.props;
    const { isAuthenticated } = auth;
    let list = [];
    if (auth) {
      type.forEach(item => {
        if (!isAuthenticated) {
          if (item.public === true) {
            list.push(item);
          }
        } else {
          if (item.name !== "Log In") {
            list.push(item);
          }
        }
      });
    }
    return list.map((item, i) => {
      if (item.name !== "My Cart") {
        return defaultLink(item, i);
      } else {
        return cartLink(item, i);
      }
    });
  };

  render() {
    const { user, page } = this.state;
    const { showLinks } = this;
    return (
      <div>
        <header className="header1" style={{ maxWidth: "1300px" }}>
          <div className="wrap_header">
            <Link to="/" className="logo">
              <img src={img2} alt="IMG-LOGO" />
            </Link>
            <div className="header-icons">
              <div>{showLinks(user)}</div>
              <div>{showLinks(page)}</div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getUserProfile: PropTypes.func.isRequired,
  getCartDetail: PropTypes.func.isRequired,
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
  {
    logoutUser,
    clearCurrentProfile,
    getUserProfile,
    getCartDetail,
    onSuccessBuy
  }
)(withRouter(Header));
