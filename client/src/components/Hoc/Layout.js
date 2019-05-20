import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SubMenu from "../SubMenu/SubMenu";
import { getCategories } from "../../actions/products_actions";
import { connect } from "react-redux";

class Layout extends React.Component {
  componentDidMount() {
    this.props.getCategories();
  }
  render() {
    const products = this.props.products;
    return (
      <div>
        <Header />
        <div className="page_container">
          <SubMenu list={products.categories} />
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(
  mapStateToProps,
  { getCategories }
)(Layout);
