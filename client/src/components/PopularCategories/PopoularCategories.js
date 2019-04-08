import React from "react";
import { connect } from "react-redux";
import CardBlock from "../utils/CardBlock";
import {
  getProductsBySell,
  getProductsByArrival
} from "../../actions/products_actions";
import PropTypes from "prop-types";

class PopularCategories extends React.Component {
  componentDidMount() {
    this.props.getProductsBySell();
    this.props.getProductsByArrival();
  }

  render() {
    return (
      <div>
        <div>
          <CardBlock
            productList={this.props.products.byArrival}
            title="New Arrivals"
          />
        </div>
        <div>
          <CardBlock
            productList={this.props.products.bySell}
            title="Best Selling Products"
          />
        </div>
      </div>
    );
  }
}

PopularCategories.propTypes = {
  getProductsBySell: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    products: state.products,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { getProductsBySell, getProductsByArrival }
)(PopularCategories);
