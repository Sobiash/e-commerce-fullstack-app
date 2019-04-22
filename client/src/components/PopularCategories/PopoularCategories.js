import React from "react";
import { connect } from "react-redux";
import CardBlock from "../utils/CardBlock";
import {
  getProductsBySell,
  getProductsByArrival
} from "../../actions/products_actions";

import CartModal from "../UI/Modal";
import OrderSummary from "../utils/OderSummary";
import PropTypes from "prop-types";

class PopularCategories extends React.Component {
  state = {
    openModal: false
  };

  componentDidMount() {
    this.props.getProductsBySell();
    this.props.getProductsByArrival();
  }

  toggleModal = () => this.setState({ openModal: true });
  closeModal = () => this.setState({ openModal: false });

  render() {
    return (
      <div>
        <CartModal
          openModal={this.state.openModal}
          closeModal={this.closeModal}
        >
          <OrderSummary
          // detail={props}
          // infoItem={infoItem}
          // totalItemsSelectorStats={totalItemsSelectorStats}
          // selectedSize={selectedSize}
          // selectedColor={selectedColor}
          />
        </CartModal>
        <div>
          <CardBlock
            list={this.props.products.byArrival}
            title="New Arrivals"
            class="card_block"
            grid=""
            toggleModal={this.toggleModal}
          />
        </div>
        <div>
          <CardBlock
            list={this.props.products.bySell}
            title="Best Selling Products"
            class="card_block"
            grid=""
            toggleModal={this.toggleModal}
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
