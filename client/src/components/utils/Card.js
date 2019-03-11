import React from "react";
import MyButton from "../utils/button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../actions/user_actions";

class Card extends React.Component {
  renderCardImage = images => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/img3.jpeg";
    }
  };
  render() {
    const props = this.props;
    return (
      <div className={`card_item_wrapper ${props.grid}`}>
        <Link to={`/product_detail/${props._id}`}>
          <div
            className="image"
            style={{
              background: `url(${this.renderCardImage(props.images)}) no-repeat`
            }}
          />
          <div className="overlay" />
        </Link>
        <div>
          <MyButton
            type="cart_link"
            title="Add to cart"
            altClass="card_button"
            runAction={() => {
              props.user.userData.isAuth
                ? this.props.dispatch(addToCart(props._id))
                : console.log("you need to login");
            }}
          />
        </div>
        <div className="action_container">
          <div className="tags">
            <div className="name">{props.name}</div>
            <div className="price">${props.price}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Card);
