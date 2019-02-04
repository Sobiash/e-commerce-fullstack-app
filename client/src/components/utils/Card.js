import React from "react";
import MyButton from "../utils/button";
import { Link } from "react-router-dom";

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
          <div>
            <MyButton
              type="cart_link"
              linkTo={`/product_detail/${props._id}`}
              title="Add to cart"
              altClass="card_button"
              runAction={() => {
                console.log("added to cart");
              }}
            />
          </div>
        </Link>
        <div className="action_container">
          <div className="tags">
            <div className="name">{props.name}</div>
            <div className="price">${props.price}</div>
          </div>
        </div>
        {props.grid ? <div className="description">havdsadsdhabdja</div> : null}
      </div>
    );
  }
}

export default Card;
