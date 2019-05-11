import React, { Component } from "react";
import { connect } from "react-redux";
import {
  dressName,
  getDresses,
  clearCategories,
  getProducts
} from "../../actions/products_actions";
import CardBlock from "../utils/CardBlock";
import BreadCrumbs from "../utils/BreadCrumbs";

class DressCategory extends Component {
  componentDidMount() {
    const dress = this.props.match.params.dress;
    this.props.dressName(dress);

    const category = [this.props.location.state.category];
    const filters = {
      dress: [dress],
      category: category
    };
    this.props.getProducts(0, 0, filters);
  }

  render() {
    const products = this.props.products;

    return (
      // <BreadCrumbs detail={detail} />
      <div className="container">
        <h6 className="category">{this.props.products.dressName}</h6>
        <CardBlock
          grid=""
          list={products.articles}
          title=""
          class="card_block_shop"
          // toggleModal={props.toggleModal}
        />
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
  { dressName, getDresses, clearCategories, getProducts }
)(DressCategory);
