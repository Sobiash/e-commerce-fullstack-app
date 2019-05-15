import React from "react";
import { connect } from "react-redux";
import CardBlock from "../utils/CardBlock";
import {
  getProductsBySell,
  getProductsByArrival
} from "../../actions/products_actions";

import CartModal from "../UI/Modal";
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
        {this.props.auth.isAuthenticated ? (
          <CartModal
            openModal={this.state.openModal}
            closeModal={this.closeModal}
          >
            Item added to your cart
          </CartModal>
        ) : (
          <CartModal
            openModal={this.state.openModal}
            closeModal={this.closeModal}
          >
            You need to login to add this product to your cart.
          </CartModal>
        )}
        <div>
          <CardBlock
            list={this.props.products.byArrival}
            title="New Arrivals"
            class="card_block"
            grid=""
            newArrival="block2-labelnew"
            toggleModal={this.toggleModal}
          />
        </div>
        <div>
          <CardBlock
            list={this.props.products.bySell}
            title="Best Selling Products"
            class="card_block"
            popular="block2-labelpopular"
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
  products: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    products: state.products
  };
};

export default connect(
  mapStateToProps,
  { getProductsBySell, getProductsByArrival }
)(PopularCategories);
