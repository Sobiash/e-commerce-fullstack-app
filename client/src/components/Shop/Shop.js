import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ShopHeader from "../utils/ShopHeader";
import {
  getProducts,
  getDresses,
  getColors
} from "../../actions/products_actions";
import { category, price } from "../utils/FixedCategories";
import CollapseList from "../utils/CollapseList";
import CollapseRadio from "../utils/CollapseRadio";
import LoadMore from "./LoadMore";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

class Shop extends Component {
  state = {
    grid: "",
    limit: 8,
    skip: 0,
    filters: {
      category: [],
      dress: [],
      color: [],
      price: []
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
  }

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

  showFilterResults = filters => {
    this.props.getProducts(0, this.state.limit, filters);
    this.setState({
      skip: 0
    });
  };

  loadMoreCards = () => {
    let skip = this.state.skip + this.state.limit;
    this.props.getProducts(
      skip,
      this.state.limit,
      this.state.filters,
      this.props.products.articles
    );
    this.setState({
      skip
    });
  };

  handleGrid = () => {
    this.setState({
      grid: !this.state.grid ? "grid_bars" : ""
    });
  };

  render() {
    const products = this.props.products;

    return (
      <div>
        <ShopHeader
          list={category}
          handleFilters={filters => this.handleFilters(filters, "category")}
        />
        <div>
          <div className="shop_wrapper">
            <div className="left">
              <CollapseList
                initState={true}
                title="Categories"
                list={category}
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
                list={products.colors}
                handleFilters={filters => this.handleFilters(filters, "color")}
              />

              <CollapseRadio
                initState={true}
                title="Price"
                list={price}
                handleFilters={filters => this.handleFilters(filters, "price")}
              />
            </div>
            <div className="right">
              <div
                className="shop-title-page"
                style={{
                  background: "url(images/img2.jpeg)"
                }}
              >
                <h3>Free Shipping</h3>
                <p>For Fashe Club members</p>
                <div className="shop_span">
                  <span>
                    <Link to="/register">Sign up</Link>
                  </span>
                  <span>
                    <Link to="/register_login">Sign in</Link>
                  </span>
                </div>
              </div>
              <div className="shop_options">
                <div className="shop_grids clear">
                  <div
                    className={`grid_btn ${this.state.grid ? "" : "active"}`}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon="th" className="icon" />
                  </div>
                  <div
                    className={`grid_btn ${!this.state.grid ? "" : "active"}`}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon="th-large" className="icon" />
                  </div>
                </div>
              </div>
              <LoadMore
                grid={this.state.grid}
                limit={this.state.limit}
                size={products.size}
                products={products.articles}
                loadMore={() => this.loadMoreCards()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Shop.propTypes = {
  getProducts: PropTypes.func.isRequired,
  getDresses: PropTypes.func.isRequired,
  getColors: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(
  mapStateToProps,
  { getProducts, getDresses, getColors }
)(Shop);
