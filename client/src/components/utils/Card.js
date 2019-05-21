import React from "react";
import MyButton from "../utils/button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../actions/user_actions";
import PropTypes from "prop-types";

class Card extends React.Component {
  renderCardImage = images => {
    if (images && images.length > 0) {
      return images[0].url;
    } else {
      return "/images/img3.jpeg";
    }
  };
  render() {
    const { card, grid, auth, newArrival, popular } = this.props;
    return (
      <div className={`block2 card_item_wrapper ${grid}`}>
        <div
          className={`block2-img wrap-pic-w of-hidden pos-relative ${newArrival} ${popular}`}
        >
          <img
            src={this.renderCardImage(card.images)}
            alt={card.name}
            style={{ width: "400px", height: "400px", display: "inline-block" }}
          />

          <div className="block2-overlay trans-0-4">
            <a
              href="#"
              className="block2-btn-addwishlist hov-pointer trans-0-4"
            >
              <i className="icon-wishlist icon_heart_alt" aria-hidden="true" />
              <i
                className="icon-wishlist icon_heart dis-none"
                aria-hidden="true"
              />
            </a>

            <div className="block2-btn-addcart w-size1 trans-0-4">
              <MyButton
                className="flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4"
                type="default"
                linkTo={this.props.linkTo}
                title="View"
              />
            </div>
          </div>
        </div>

        <div className="block2-txt p-t-20">
          <Link
            to={`/product_detail/${card._id}`}
            className="block2-name dis-block s-text3>
            
            p-b-5"
          >
            {card.name}
          </Link>

          <span className="block2-price m-text6 p-r-5">$ {card.price}</span>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
  newArrival: PropTypes.string,
  popular: PropTypes.string
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { addToCart }
)(Card);
