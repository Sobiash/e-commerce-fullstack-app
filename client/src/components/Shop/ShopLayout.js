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
import PropTypes from "prop-types";
import Sorting from "./Sorting";
import layout from "../../images/icons/layout.png";
import squares from "../../images/icons/squares.png";

class Shop extends Component {
  state = {
    grid: "",
    limit: 2,
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
      getSizes,
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
    getSizes();

    if (isAuthenticated) {
      getCartDetail();
    }
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

    getProducts(skipOlder, limit, filters);
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

  render() {
    const { products, auth } = this.props;

    const { grid, limit } = this.state;
    const { isAuthenticated } = auth;
    const { categories, size, articles, colors, sizes, dresses } = products;
    const { handleFilters, handleGrid, loadMoreCards } = this;
    return (
      <div>
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
              <CollapseList
                initState={false}
                title="Colors"
                list={colors}
                handleFilters={filters => handleFilters(filters, "color")}
              />
              <CollapseList
                initState={false}
                title="Sizes"
                list={sizes}
                handleFilters={filters => handleFilters(filters, "size")}
              />

              <CollapseRadio
                initState={true}
                title="Price"
                list={price}
                handleFilters={filters => handleFilters(filters, "price")}
              />
            </div>
            <div className="right">
              {/* <Sorting grid={grid} handleGrid={handleGrid} list={price} /> */}

              <div className="shop_options">
                <div className="shop_grids clear">
                  <div
                    className={`grid_btn ${grid ? "" : "active"}`}
                    onClick={() => handleGrid()}
                  >
                    <img
                      src={squares}
                      style={{ width: "20px", height: "20px" }}
                      alt=""
                    />
                  </div>
                  <div
                    className={`grid_btn ${!grid ? "" : "active"}`}
                    onClick={() => handleGrid()}
                  >
                    <img
                      src={layout}
                      style={{ width: "20px", height: "20px" }}
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <LoadMore
                grid={grid}
                limit={limit}
                size={size}
                products={articles}
                loadMore={() => loadMoreCards()}
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
