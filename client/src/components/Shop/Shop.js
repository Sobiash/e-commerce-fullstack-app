import React, { Component } from "react";
import { connect } from "react-redux";
import ShopHeader from "../utils/ShopHeader";
import { getDresses, getProducts } from "../../actions/products_actions";
import { category, price } from "../utils/FixedCategories";
import CollapseList from "../utils/CollapseList";
import CollapseRadio from "../utils/CollapseRadio";

class Shop extends Component {
  state = {
    grid: "",
    limit: 6,
    skip: 0,
    filters: {
      category: [],
      dress: [],
      colors: [],
      price: []
    }
  };
  componentDidMount() {
    this.props.dispatch(getDresses());
    this.props.dispatch(
      getProducts(this.state.skip, this.state.limit, this.state.filters)
    );
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
    this.props.dispatch(getProducts(0, this.state.limit, filters)).then(() => {
      this.setState({
        skip: 0
      });
    });
  };

  // handleFilters = (filters, category) => {
  //   const newFilters = { ...this.state.filters };
  //   newFilters[category] = filters;

  //   if (category === "price") {
  //     let priceValues = this.handlePrice(filters);
  //     newFilters[category] = priceValues;
  //   }

  //   this.showFilterResults(newFilters);
  //   this.setState({
  //     filters: newFilters
  //   });
  // };

  // showFilterResults = filters => {
  //   this.props.dispatch(getProducts(0, this.state.limit, filters)).then(() => {
  //     this.setState({
  //       skip: 0
  //     });
  //   });
  // };

  render() {
    const products = this.props.products;
    return (
      <div>
        <ShopHeader title="Browse Products" />

        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CollapseList
                initState={true}
                title="Choose From"
                list={category}
                handleFilters={filters =>
                  this.handleFilters(filters, "category")
                }
              />
              <CollapseList
                initState={false}
                title="Dresses"
                list={products.dresses}
                handleFilters={filters => this.handleFilters(filters, "dress")}
              />

              <CollapseRadio
                initState={true}
                title="Price"
                list={price}
                handleFilters={filters => this.handleFilters(filters, "price")}
              />
            </div>
            <div className="right">right</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(Shop);
