import React, { Component } from "react";
import { connect } from "react-redux";
import ShopHeader from "../utils/ShopHeader";
import { getColors, getDresses } from "../../actions/products_actions";
import { categories, price } from "../utils/FixedCategories";
import CollapseList from "../utils/CollapseList";
import CollapseRadio from "../utils/CollapseRadio";

class Shop extends Component {
  state = {
    grid: "",
    limit: 6,
    skip: 0,
    filters: {
      categories: [],
      dresses: [],
      colors: [],
      price: []
    }
  };
  componentDidMount() {
    this.props.dispatch(getColors());
    this.props.dispatch(getDresses());
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
      let priceValue = this.handlePrice(filters);
      newFilters[category] = priceValue;
    }

    this.setState({
      filters: newFilters
    });
  };
  render() {
    console.log(this.state.filters);
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
                list={categories}
                handleFilters={filters =>
                  this.handleFilters(filters, "categories")
                }
              />
              <CollapseList
                initState={false}
                title="Products"
                list={products.dresses}
                handleFilters={filters =>
                  this.handleFilters(filters, "products")
                }
              />
              <CollapseList
                initState={false}
                title="Colors"
                list={products.colors}
                handleFilters={filters => this.handleFilters(filters, "colors")}
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
