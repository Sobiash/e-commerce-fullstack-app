import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getProducts,
  getDresses,
  dressName
} from "../../actions/products_actions";

import CategoryCard from "../utils/CategoryCard";
import { Link } from "react-router-dom";

class GenderCategory extends Component {
  componentDidMount() {
    const category = this.props.match.params.category;
    const filters = {
      category: [category]
    };
    this.props.getProducts(0, 0, filters);
    this.props.getDresses();
  }

  getArticles = (dress, category) => {
    const filters = { dress: [dress], category: [category] };
    this.props.getProducts(0, 0, filters);
  };

  render() {
    const products = this.props.products;
    const category = this.props.match.params.category;

    let articles = products.articles;
    let dresses = products.dresses;

    let dressArr = [];
    let articleArr = [];
    let finalarray = [];
    let dressNames = [];
    let output;

    dresses && dresses.forEach(item => dressArr.push(item._id));

    articles && articles.forEach(item => articleArr.push(item.dress));

    dressArr.forEach(e1 =>
      articleArr.forEach(e2 => {
        if (e1 === e2) {
          finalarray.push(e1);
        }
      })
    );

    finalarray.forEach(item =>
      dresses.forEach(e2 => {
        if (e2._id === item) {
          dressNames.push(e2);

          output = [...new Set(dressNames)];
        }
      })
    );

    const categories =
      output &&
      output.map(item => (
        <Link
          to={{
            pathname: `/shop/dress/${item._id}`,
            state: { category: category }
          }}
          key={item._id}
          onClick={() => this.getArticles(item._id, category)}
        >
          <CategoryCard card={item} />
        </Link>
      ));

    return (
      <div className="container">
        <div style={{ minHeight: "100vh" }}>
          <div style={{ display: "block" }}>{categories} </div>
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
  { getProducts, getDresses, dressName }
)(GenderCategory);
