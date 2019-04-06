import React from "react";
import { connect } from "react-redux";
import CardBlock from "../utils/CardBlock";
import { getProductsBySell } from "../../actions/products_actions";
import PropTypes from "prop-types";

class PopularCategories extends React.Component {
  componentDidMount() {
    this.props.getProductsBySell();
  }

  render() {
    return (
      <div>
        <CardBlock
          productList={this.props.products.bySell}
          title="Best Selling Products"
        />
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
  { getProductsBySell }
)(PopularCategories);
