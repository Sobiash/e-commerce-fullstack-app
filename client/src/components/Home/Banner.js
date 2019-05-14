import React from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../actions/products_actions";
import { connect } from "react-redux";

class Banner extends React.Component {
  render() {
    const renderList =
      this.props.list &&
      this.props.list.map(category => (
        <div
          key={category._id}
          className="col-sm-10 col-md-8 col-lg-4"
          style={{ display: "inline-block" }}
        >
          <div className="block1 hov-img-zoom pos-relative m-r-30">
            <img
              src={category.images[0].url}
              alt="IMG-BENNER"
              style={{ width: "320px", height: "400px" }}
            />

            <div className="block1-wrapbtn w-size2">
              <Link
                className="flex-c-m size2 m-text2 bg3 hov1 trans-0-4"
                to={`/shop/category/${category._id}`}
              >
                {category.name}
              </Link>
            </div>
          </div>
        </div>
      ));
    return (
      <div>
        <div className="title">Our Products</div>
        <div className="banner bgwhite p-t-50 p-b-40">
          <div className="container">
            <div
              style={{ display: "block", margin: "0px 0px 0px 40px" }}
              className="container"
            >
              {renderList}
            </div>
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

export default connect(
  mapStateToProps,
  { getProducts }
)(Banner);
