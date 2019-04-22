import React from "react";
import MyButton from "../utils/button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../actions/user_actions";
import PropTypes from "prop-types";

class Card extends React.Component {
  renderCardImage = images => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/img3.jpeg";
    }
  };
  render() {
    const { card, grid, auth } = this.props;

    return (
      <div className={`card_item_wrapper ${grid}`}>
        <Link to={`/product_detail/${card._id}`}>
          <div
            className="image"
            style={{
              background: `url(${this.renderCardImage(card.images)}) no-repeat`
            }}
          />
          <div className="overlay" />
        </Link>
        <div>
          <MyButton
            type="cart_link"
            title="Add to cart"
            altClass="card_button"
            toggleModal={this.props.toggleModal}
            runAction={() => {
              auth.isAuthenticated
                ? this.props.addToCart(
                    card._id,
                    card.name,
                    card.price,
                    card.images
                  )
                : console.log("you need to login");
            }}
          />
        </div>
        <div className="action_container">
          <div className="tags">
            <div className="name">{card.name}</div>
            <div className="price">${card.price}</div>
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired
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
