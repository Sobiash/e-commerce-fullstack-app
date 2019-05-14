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
          style={{
            display: "inline-block",
            fontSize: "16px",
            margin: " 0 10px",
            cursor: "pointer"
          }}
          onClick={() => getArticles(category._id)}
        >
          <Link to={`/shop/category/${category._id}`}>
            <nav>{category.name}</nav>
          </Link>
        </div>
      ));
    return (
      <div className="page_top">
        <div className="container">
          <div style={{ display: "block", marginLeft: "400px" }}>
            <div
              style={{
                display: "inline-block",
                fontSize: "16px",
                margin: " 0 10px",
                cursor: "pointer"
              }}
            >
              <Link to="/shop">
                <nav>All</nav>
              </Link>
            </div>
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
