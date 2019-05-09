import React, { Component } from "react";
import { connect } from "react-redux";
import { genderCategories } from "../../actions/products_actions";
import CardBlock from "../utils/CardBlock";
import { Link } from "react-router-dom";

class GenderCategory extends Component {
  componentDidMount() {
    const category = this.props.match.params.category;
    this.props.genderCategories(category);
  }

  componentWillReceiveProps(nextProps) {
    const category = nextProps.match.params.category;
    this.props.genderCategories(category);
  }

  render() {
    const products = this.props.products;

    return (
      <div>
        <CardBlock
          grid=""
          list={products.genderCategories}
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
  { genderCategories }
)(GenderCategory);
