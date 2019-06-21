import React from "react";
import { connect } from "react-redux";
import CardBlock from "../UI/CardBlock";
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
    const { getProductsBySell, getProductsByArrival } = this.props;
    getProductsBySell();
    getProductsByArrival();
  }

  toggleModal = () => this.setState({ openModal: true });
  closeModal = () => this.setState({ openModal: false });

  render() {
    const { auth, products } = this.props;
    const { isAuthenticated } = auth;
    const { byArrival, bySell } = products;
    const { openModal } = this.state;
    const { closeModal, toggleModal } = this;
    return (
      <div>
        {isAuthenticated ? (
          <CartModal openModal={openModal} closeModal={closeModal}>
            Item added to your cart
          </CartModal>
        ) : (
          <CartModal openModal={openModal} closeModal={closeModal}>
            You need to login to add this product to your cart.
          </CartModal>
        )}
        <div>
          <CardBlock
            list={byArrival}
            title="New Arrivals"
            classes="card_block"
            grid=""
            newArrival="block2-labelnew"
            toggleModal={toggleModal}
          />
        </div>
        <div>
          <CardBlock
            list={bySell}
            title="Best Selling Products"
            classes="card_block"
            popular="block2-labelpopular"
            grid=""
            toggleModal={toggleModal}
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
