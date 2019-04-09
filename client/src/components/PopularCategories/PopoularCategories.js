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
            list={this.props.products.byArrival}
            title="New Arrivals"
            class="card_block"
            grid=""
          />
        </div>
        <div>
          <CardBlock
            list={this.props.products.bySell}
            title="Best Selling Products"
            class="card_block"
            grid=""
          />
        </div>
      </div>
    );
  }
}

PopularCategories.propTypes = {
  getProductsBySell: PropTypes.func.isRequired,
  getProductsByArrival: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(
  mapStateToProps,
  { getProductsBySell, getProductsByArrival }
)(PopularCategories);
