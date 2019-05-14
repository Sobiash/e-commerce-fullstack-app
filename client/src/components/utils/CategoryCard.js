import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../actions/user_actions";
import PropTypes from "prop-types";

class CategoryCard extends React.Component {
  render() {
    const { card } = this.props;
    return (
      <div
        className="col-sm-10 col-md-8 col-lg-4"
        style={{ display: "inline-block" }}
      >
        <div className="block1 hov-img-zoom pos-relative m-t-30 m-r-30">
          <img
            src={card.images && card.images[0].url}
            alt={card.name}
            style={{ width: "320px", height: "400px" }}
          />

          <div className="block1-wrapbtn w-size2">
            <Link
              className="flex-c-m size2 m-text2 bg3 hov1 trans-0-4"
              to={`/shop/category/${card._id}`}
            >
              {card.name}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

CategoryCard.propTypes = {
  card: PropTypes.object.isRequired
};

export default connect(
  null,
  { addToCart }
)(CategoryCard);
