import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { getCategories } from "../../actions/products_actions";
import { connect } from "react-redux";

class Layout extends React.Component {
  componentDidMount() {
    const { getCategories } = this.props;
    getCategories();
  }
  render() {
    const { children } = this.props;
    return (
      <div>
        <div className="page_container">
          <Header />
          {children}
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
