import React from "react";
import MyButton from "../utils/button";

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
        <div className="action_container">
          <div className="tags">
            <div className="name">{props.name}</div>
            <div className="price">${props.price}</div>
          </div>
        </div>
        {props.grid ? <div className="description">havdsadsdhabdja</div> : null}
        <div className="button_wrapp">
          <MyButton
            type="default"
            altClass="card_link"
            title="View Product"
            linkTo={`/product_detail/${props._id}`}
            addStyle={{
              margin: "10px 0 0 0"
            }}
          />
        </div>
      </div>
    );
  }
}

export default Card;
