import React, { Component } from "react";
import { Link } from "react-router-dom";

class SubMenu extends Component {
  render() {
    const renderList =
      this.props.list &&
      this.props.list.map(category => (
        <div key={category._id} className="main_menu">
          <Link to={`/shop/category/${category._id}`}>
            <nav>{category.name}</nav>
          </Link>{" "}
        </div>
      ));
    return (
      <div className="page_top">
        <div className="container">
          <div className="menu">
            <Link to="/shop">
              <div className="main_menu">All</div>
            </Link>
            {renderList}
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default SubMenu;
