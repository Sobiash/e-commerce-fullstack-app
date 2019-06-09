import React, { Component } from "react";
import { connect } from "react-redux";
import LoadMore from "../Shop/LoadMore";
import {
  dressName,
  getDresses,
  clearCategories,
  getProducts,
  getCategories,
  getColors
} from "../../actions/products_actions";
import { getCartDetail } from "../../actions/user_actions";
import { sizes, colors, price } from "../utils/FixedCategories";
import CollapseList from "../utils/CollapseList";
import CollapseRadio from "../utils/CollapseRadio";
import CartModal from "../UI/Modal";
import { Link } from "react-router-dom";
// import FontAwesomeIcon from "@fortawesome/react-fontawesome";

class DressCategory extends Component {
  state = {
    openModal: false,
    limit: 8,
    skip: 0,
    filters: {
      category: [this.props.location.state.category],
      dress: [this.props.match.params.dress],
      color: [],
      price: [],
      size: []
    }
  };

  componentDidMount() {
    const dress = this.props.match.params.dress;
    this.props.dressName(dress);

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

    const dress = this.props.match.params.dress;

    const category = this.props.location.state.category;

    return (
      <div>
        <div>
          <div className="shop_wrapper">
            <div className="left">
              <CollapseList
                initState={true}
                title="Categories"
                list={products.categories}
                handleFilters={filters =>
                  this.handleFilters(filters, "category")
                }
                check={category}
              />
              <CollapseList
                initState={true}
                title="Dresses"
                list={products.dresses}
                handleFilters={filters => this.handleFilters(filters, "dress")}
                check={dress}
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
              )}

              <div className="shop_options">
                <div className="shop_grids clear">
                  <div
                    className={`grid_btn ${this.state.grid ? "" : "active"}`}
                    onClick={() => this.handleGrid()}
                  >
                    {/* <FontAwesomeIcon icon="th" className="icon" /> */}
                    <p>hello</p>
                  </div>
                  <div
                    className={`grid_btn ${!this.state.grid ? "" : "active"}`}
                    onClick={() => this.handleGrid()}
                  >
                    {/* <FontAwesomeIcon icon="th-large" className="icon" /> */}
                    <p>hello</p>
                  </div>
                </div>
              </div>
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

const mapStateToProps = state => {
  return {
    auth: state.auth,
    products: state.products
  };
};

export default connect(
  mapStateToProps,
  {
    dressName,
    getDresses,
    clearCategories,
    getProducts,
    getColors,
    getCategories,
    getCartDetail
  }
)(DressCategory);
