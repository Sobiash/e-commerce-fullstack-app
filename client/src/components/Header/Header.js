import React from "react";
import { Link, withRouter } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import MiniSummary from "../Cart/MiniSummary";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/auth_actions";
import { onSuccessBuy, removeCartItems } from "../../actions/user_actions";
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
    if (nextProps.user.cartDetail.length !== cartDetail.length) {
      getCartDetail();
      this.setState({
        cartLength: nextProps.user.cartDetail.length
      });
    }
  }

  logoutHandler = () => {
    const { logoutUser, clearCurrentProfile, history } = this.props;
    logoutUser();
    clearCurrentProfile();
    history.push("/register_login");
  };

  removeFromCart = id => {
    const { removeCartItems } = this.props;
    removeCartItems(id);
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
      <Button key={i} onClick={() => logoutHandler()}>
        {item.name}
      </Button>
    ) : (
      <Link to={item.linkTo} key={i}>
        <Button>{item.name}</Button>
      </Link>
    );
  };

  cartLink = (item, i) => {
    const { onTransactionSuccess } = this;
    const { auth, user } = this.props;
    const { cartLength } = this.state;
    const { cartDetail, profile } = user;
    return (
      <MiniSummary
        empty={cartDetail.length === 0 && true}
        cart={cartDetail}
        cartLength={cartLength}
        item={item}
        email={profile.email}
        onTransactionSuccess={onTransactionSuccess}
        removeItem={id => this.removeFromCart(id)}
      />
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
    console.log(this.props.user.cartDetail.length);
    console.log(this.state.cartLength);
    const { user, page } = this.state;

    const { showLinks } = this;
    const useStyles = {
      root: {
        flexGrow: 1
      },
      text: {
        flexGrow: 1,
        color: "black"
      }
    };

    return (
      <div>
        <AppBar position="static">
          <Toolbar style={{ backgroundColor: "white" }}>
            <Typography variant="h6" style={useStyles.text}>
              <Link to="/">
                <img src={img2} alt="IMG-LOGO" />
              </Link>
            </Typography>
            {showLinks(user)}
            {showLinks(page)}
          </Toolbar>
        </AppBar>
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
  errors: PropTypes.object,
  removeCartItems: PropTypes.func.isRequired
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
    onSuccessBuy,
    removeCartItems
  }
)(withRouter(Header));
