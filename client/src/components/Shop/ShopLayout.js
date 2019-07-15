import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getProducts,
  getDresses,
  getCategories,
  getColors,
  getSizes
} from "../../actions/products_actions";
import { getCartDetail } from "../../actions/user_actions";
import { price } from "../utils/FixedCategories";
import CollapseList from "../UI/CollapseList";
import CollapseRadio from "../UI/CollapseRadio";
import LoadMore from "./LoadMore";
import CartModal from "../UI/Modal";
import PropTypes from "prop-types";
import Sorting from "./Sorting";
import img from "../../images/img2.jpeg";

class Shop extends Component {
  state = {
    openModal: false,
    limit: 8,
    skip: 0,
    filters: {
      category: [],
      dress: [],
      color: [],
      price: [],
      size: []
    }
  };

  componentDidMount() {
    const {
      getProducts,
      getDresses,
      getColors,
      getCategories,
      getCartDetail,
      auth
    } = this.props;
    const { isAuthenticated } = auth;
    const { skip, limit, filters } = this.state;

    getProducts(skip, limit, filters);
    getDresses();
    getColors();
    getCategories();

    if (isAuthenticated) {
      getCartDetail();
    }
  }

  handleFilters = (filters, category) => {
    const newFilters = { ...this.state.filters };
    const { handlePrice, showFilterResults } = this;

    newFilters[category] = filters;

    if (category === "price") {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    }

    showFilterResults(newFilters);
    this.setState({
      filters: newFilters
    });
  };

  handlePrice = value => {
    const data = price;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  // handleSize = value => {
  //   const data = sizes;
  //   let array = value;

  //   const finalArray = [];

  //   array.forEach(i =>
  //     data.forEach(k => {
  //       if (i === k._id) {
  //         finalArray.push(k.name);
  //       }
  //     })
  //   );

  //   return finalArray;
  // };

  // handleColor = value => {
  //   const data = colors;
  //   let array = value;

  //   const finalArray = [];

  //   array.forEach(i =>
  //     data.forEach(k => {
  //       if (i === k._id) {
  //         finalArray.push(k.name);
  //       }
  //     })
  //   );

  //   return finalArray;
  // };

  handleFilters = (filters, category) => {
    const newFilters = { ...this.state.filters };
    const { handlePrice, handleSize, handleColor, showFilterResults } = this;

    newFilters[category] = filters;

    if (category === "price") {
      let priceValues = handlePrice(filters);

      newFilters[category] = priceValues;
    }
    if (category === "size") {
      let sizeValues = handleSize(filters);

      newFilters[category] = sizeValues;
    }

    if (category === "color") {
      let colorValues = handleColor(filters);

      newFilters[category] = colorValues;
    }

    showFilterResults(newFilters);
    this.setState({
      filters: newFilters
    });
  };

  showFilterResults = filters => {
    const { getProducts } = this.props;
    const { limit } = this.state;

    getProducts(0, limit, filters);
    this.setState({
      skip: 0
    });
  };

  loadMoreCards = () => {
    const { skip, limit, filters } = this.state;
    const { getProducts } = this.props;

    let skipOlder = skip + limit;
    getProducts(skip, limit, filters);
    this.setState({
      skip: skipOlder
    });
  };

  handleGrid = () => {
    const { grid } = this.state;

    this.setState({
      grid: !grid ? "grid_bars" : ""
    });
  };

  toggleModal = () => this.setState({ openModal: true });
  closeModal = () => this.setState({ openModal: false });

  render() {
    const { products, auth } = this.props;
    const { grid, openModal, limit } = this.state;
    const { isAuthenticated } = auth;
    const { categories, dresses, size, articles } = products;
    const {
      handleFilters,
      handleGrid,
      closeModal,
      toggleModal,
      loadMoreCards
    } = this;
    return (
      <div style={{ marginTop: "100px" }}>
        <div>
          <div className="shop_wrapper">
            <div className="left">
              <CollapseList
                initState={true}
                title="Filters"
                list={categories}
                handleFilters={filters => handleFilters(filters, "category")}
              />
              <CollapseList
                initState={true}
                title="Dresses"
                list={dresses}
                handleFilters={filters => handleFilters(filters, "dress")}
              />
              {/* <CollapseList
                initState={false}
                title="Colors"
                list={colors}
                handleFilters={filters => handleFilters(filters, "color")}
              /> */}
              {/* <CollapseList
                initState={false}
                title="Sizes"
                list={sizes}
                handleFilters={filters => handleFilters(filters, "size")}
              /> */}

              <CollapseRadio
                initState={true}
                title="Price"
                list={price}
                handleFilters={filters => handleFilters(filters, "price")}
              />
            </div>
            <div className="right">
              {!isAuthenticated && (
                <div
                  className="shop-title-page"
                  style={{
                    backgroundImage: `url(${img})`
                  }}
                >
                  <h3>Free Shipping</h3>
                  <p style={{ textAlign: "center" }}>For Fashe Club members</p>
                  <div className="shop_span">
                    <span>
                      <Link to="/register">Sign up</Link>
                    </span>
                    <span>
                      <Link to="/register_login">Sign in</Link>
                    </span>
                  </div>
                </div>
              )}

              <Sorting grid={grid} handleGrid={handleGrid} list={price} />

              {/* {isAuthenticated ? (
                <CartModal openModal={openModal} closeModal={closeModal}>
                  Item added to your cart
                </CartModal>
              ) : (
                <CartModal openModal={openModal} closeModal={closeModal}>
                  You need to login to add this product to your cart.
                </CartModal>
              )} */}
              <LoadMore
                grid={grid}
                limit={limit}
                size={size}
                products={articles}
                loadMore={() => loadMoreCards()}
                toggleModal={toggleModal}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Shop.propTypes = {
  getCartDetail: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  getDresses: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  getColors: PropTypes.func.isRequired,
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
  { getProducts, getDresses, getColors, getSizes, getCategories, getCartDetail }
)(Shop);
