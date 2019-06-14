import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getProducts,
  getDresses,
  getCategories,
  getColors
} from "../../actions/products_actions";
import { getCartDetail } from "../../actions/user_actions";
import { sizes, colors, price } from "../utils/FixedCategories";
import CollapseList from "../utils/CollapseList";
import CollapseRadio from "../utils/CollapseRadio";
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
    this.props.getProducts(
      this.state.skip,
      this.state.limit,
      this.state.filters
    );
    this.props.getDresses();
    this.props.getColors();
    this.props.getCategories();
    if (this.props.auth.isAuthenticated) {
      this.props.getCartDetail();
    }
  }

  handleFilters = (filters, category) => {
    const newFilters = { ...this.state.filters };

    newFilters[category] = filters;

    if (category === "price") {
      let priceValues = this.handlePrice(filters);
      newFilters[category] = priceValues;
    }

    this.showFilterResults(newFilters);
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

  handleSize = value => {
    const data = sizes;
    let array = value;

    const finalArray = [];

    array.forEach(i =>
      data.forEach(k => {
        if (i === k._id) {
          finalArray.push(k.name);
        }
      })
    );

    return finalArray;
  };

  handleColor = value => {
    const data = colors;
    let array = value;

    const finalArray = [];

    array.forEach(i =>
      data.forEach(k => {
        if (i === k._id) {
          finalArray.push(k.name);
        }
      })
    );

    return finalArray;
  };

  handleFilters = (filters, category) => {
    const newFilters = { ...this.state.filters };

    newFilters[category] = filters;

    if (category === "price") {
      let priceValues = this.handlePrice(filters);

      newFilters[category] = priceValues;
    }
    if (category === "size") {
      let sizeValues = this.handleSize(filters);

      newFilters[category] = sizeValues;
    }

    if (category === "color") {
      let colorValues = this.handleColor(filters);

      newFilters[category] = colorValues;
    }

    this.showFilterResults(newFilters);
    this.setState({
      filters: newFilters
    });
  };

  showFilterResults = filters => {
    this.props.getProducts(0, this.state.limit, filters);
    this.setState({
      skip: 0
    });
  };

  loadMoreCards = () => {
    let skip = this.state.skip + this.state.limit;
    this.props.getProducts(skip, this.state.limit, this.state.filters);
    this.setState({
      skip
    });
  };

  handleGrid = () => {
    this.setState({
      grid: !this.state.grid ? "grid_bars" : ""
    });
  };

  toggleModal = () => this.setState({ openModal: true });
  closeModal = () => this.setState({ openModal: false });

  render() {
    const products = this.props.products;

    return (
      <div style={{ marginTop: "100px" }}>
        <div>
          <div className="shop_wrapper">
            <div className="left">
              <CollapseList
                initState={true}
                title="Filters"
                list={products.categories}
                handleFilters={filters =>
                  this.handleFilters(filters, "category")
                }
              />
              <CollapseList
                initState={true}
                title="Dresses"
                list={products.dresses}
                handleFilters={filters => this.handleFilters(filters, "dress")}
              />
              <CollapseList
                initState={false}
                title="Colors"
                list={colors}
                handleFilters={filters => this.handleFilters(filters, "color")}
              />
              <CollapseList
                initState={false}
                title="Sizes"
                list={sizes}
                handleFilters={filters => this.handleFilters(filters, "size")}
              />

              <CollapseRadio
                initState={true}
                title="Price"
                list={price}
                handleFilters={filters => this.handleFilters(filters, "price")}
              />
            </div>
            <div className="right">
              {!this.props.auth.isAuthenticated && (
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

              <Sorting
                grid={this.state.grid}
                handleGrid={this.handleGrid}
                list={price}
              />

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
              <LoadMore
                grid={this.state.grid}
                limit={this.state.limit}
                size={products.size}
                products={products.articles}
                loadMore={() => this.loadMoreCards()}
                toggleModal={this.toggleModal}
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
  { getProducts, getDresses, getColors, getCategories, getCartDetail }
)(Shop);
