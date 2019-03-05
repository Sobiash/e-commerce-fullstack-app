import React from "react";
import { connect } from "react-redux";
import CardBlock from "../utils/CardBlock";
import {
  getProductsByArrival,
  getProductsBySell
} from "../../actions/products_actions";

class PopularCategories extends React.Component {
  componentDidMount() {
    this.props.dispatch(getProductsBySell());
    this.props.dispatch(getProductsByArrival());
  }

  render() {
    return (
      <div>
        <CardBlock
          list={this.props.products.bySell}
          title="Best Selling Products"
        />
        <CardBlock list={this.props.products.byArrival} title="New Arrivals" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(PopularCategories);
