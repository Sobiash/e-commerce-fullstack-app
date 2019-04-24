import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getItems,
  getCategories,
  clearCategories
} from "../../actions/products_actions";
import CardBlock from "../utils/CardBlock";

class GenderCategory extends Component {
  componentDidMount() {
    const category = this.props.match.params.category;
    this.props.getItems(category);
  }

  componentWillReceiveProps(nextProps) {
    const category = nextProps.match.params.category;
    this.props.getItems(category);
  }

  render() {
    const products = this.props.products;

    return (
      <CardBlock
        grid=""
        list={products.getItems}
        title=""
        class="card_block_shop"
        // toggleModal={props.toggleModal}
      />
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
  { getItems, getCategories, clearCategories }
)(GenderCategory);
