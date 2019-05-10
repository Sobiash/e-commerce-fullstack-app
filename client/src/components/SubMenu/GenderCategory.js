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

  render() {
    const products = this.props.products;
    const dressCategory = this.props.match.params.category;

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

    const category =
      output &&
      output.map(item => <CategoryCard category={dressCategory} card={item} />);

    return (
      <div className="container">
        <div style={{ minHeight: "100vh" }}>
          <div style={{ display: "block" }}>{category} </div>
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
