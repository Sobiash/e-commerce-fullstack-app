import React, { Component } from "react";
import { connect } from "react-redux";
import {
  dressCategories,
  getDresses,
  clearCategories
} from "../../actions/products_actions";
import CardBlock from "../utils/CardBlock";

class DressCategory extends Component {
  componentDidMount() {
    const dress = this.props.match.params.dress;
    this.props.dressCategories(dress);
  }

  componentWillReceiveProps(nextProps) {
    const dress = nextProps.match.params.dress;
    this.props.dressCategories(dress);
  }

  render() {
    const products = this.props.products;

    return (
      <CardBlock
        grid=""
        list={products.dressCategories}
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
  { dressCategories, getDresses, clearCategories }
)(DressCategory);
