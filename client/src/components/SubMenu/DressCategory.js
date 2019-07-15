import React, { Component } from "react";
import { connect } from "react-redux";
import LoadMore from "../Shop/LoadMore";
import {
  dressName,
  getDresses,
  clearCategories,
  getProducts,
  getCategories,
  getColors,
  getSizes
} from "../../actions/products_actions";
import { getCartDetail } from "../../actions/user_actions";
import { price } from "../utils/FixedCategories";
import CollapseList from "../UI/CollapseList";
import CollapseRadio from "../UI/CollapseRadio";
import CartModal from "../UI/Modal";
import { Link } from "react-router-dom";
import layout from "../../images/icons/layout.png";
import squares from "../../images/icons/squares.png";

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
    const {
      match,
      dressName,
      getProducts,
      getDresses,
      getColors,
      getCategories,
      getCartDetail,
      auth
    } = this.props;
    const { isAuthenticated } = auth;
    const { skip, limit, filters } = this.state;
    const dress = match.params.dress;
    dressName(dress);

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

    const { handlePrice, handleSize, handleColor, showFilterResults } = this;

    newFilters[category] = filters;

    if (category === "price") {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    }

    // if (category === "size") {
    //   let sizeValues = handleSize(filters);

    //   newFilters[category] = sizeValues;
    // }

    // if (category === "color") {
    //   let colorValues = handleColor(filters);

    //   newFilters[category] = colorValues;
    // }

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
    const { limit } = this.state;
    const { getProducts } = this.props;
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
    const { products, auth, match, location } = this.props;
    const { grid, limit, openModal } = this.state;
    const { dress } = match.params;
    const { category } = location.state;
    const { categories, dresses, size, articles } = products;
    const { isAuthenticated } = auth;
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
                check={category}
              />
              <CollapseList
                initState={true}
                title="Dresses"
                list={dresses}
                handleFilters={filters => handleFilters(filters, "dress")}
                check={dress}
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
    getSizes,
    getCategories,
    getCartDetail
  }
)(DressCategory);
