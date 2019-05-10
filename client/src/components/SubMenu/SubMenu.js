import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../actions/products_actions";
import { connect } from "react-redux";

class SubMenu extends Component {
  render() {
    const getArticles = category => {
      const filters = { category: [category] };
      this.props.getProducts(0, 0, filters);
    };
    const renderList =
      this.props.list &&
      this.props.list.map(category => (
        <div
          key={category._id}
          className="main_menu"
          onClick={() => getArticles(category._id)}
        >
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

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(
  mapStateToProps,
  { getProducts }
)(SubMenu);
