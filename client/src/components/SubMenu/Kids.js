import React, { Component } from "react";
import { connect } from "react-redux";
import { getItems } from "../../actions/products_actions";
import CardBlock from "../utils/CardBlock";

class Kids extends Component {
  componentDidMount() {
    const category = this.props.match.params.category;
    this.props.getItems(category);
  }
  render() {
    const products = this.props.products.getItems;

    return (
      <div>
        <CardBlock
          grid=""
          list={products}
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
  { getItems }
)(Kids);
