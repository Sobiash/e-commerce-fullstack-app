import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/user_actions";

class Header extends React.Component {
  state = {
    page: [
      {
        name: "Home",
        linkTo: "/",
        public: true
      },
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
        linkTo: "user/cart",
        public: false
      },
      {
        name: "My Account",
        linkTo: "user/dashboard",
        public: false
      },
      {
        name: "Log in",
        icon: "/images/icons/icon-header-01.png",
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

  logoutHandler = () => {
    this.props.dispatch(logoutUser()).then(response => {
      if (response.payload.success) {
        this.props.history.push("/");
      }
    });
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
        {item.icon ? <img src={item.icon} alt="LOG_IN" /> : item.name}
      </Link>
    );

  cartLink = (item, i) => {
    const user = this.props.user.userData;
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
    if (this.props.user.userData) {
      type.forEach(item => {
        if (!this.props.user.userData.isAuth) {
          if (item.public === true) {
            list.push(item);
          }
        } else {
          if (item.name !== "Log in") {
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
          <div className="main_menu">
            <nav className="menu">middle nav</nav>
          </div>
          <div className="header-icons">
            <div>{this.showLinks(this.state.user)}</div>
            <div>{this.showLinks(this.state.page)}</div>
          </div>
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(withRouter(Header));
