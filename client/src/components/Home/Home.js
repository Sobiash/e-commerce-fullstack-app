import React from "react";
import HomeSlider from "./Slider";
import Promotions from "./Promotions";
import { connect } from "react-redux";
import CardBlock from "../utils/CardBlock";
import {
  getProductsByArrival,
  getProductsBySell
} from "../../actions/products_actions";

class Home extends React.Component {
  componentDidMount() {
    this.props.dispatch(getProductsBySell());
    this.props.dispatch(getProductsByArrival());
  }

  render() {
    return (
      <div>
        <HomeSlider />
        <CardBlock
          list={this.props.product.bySell}
          title="Best Selling Products"
        />
        <CardBlock list={this.props.product.byArrival} title="New Arrivals" />
        <Promotions />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: state.product
  };
};

export default connect(mapStateToProps)(Home);