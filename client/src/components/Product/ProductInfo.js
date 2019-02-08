import React from "react";
import MyButton from "../utils/button";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

const ProductInfo = props => {
  const detail = props.detail;
  const showProductTags = detail => (
    <div className="product_tags">
      {detail.shipping ? (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon="truck" />
          </div>
          <div className="tag_text">
            <div>Free Shipping</div>
            <div>and return</div>
          </div>
        </div>
      ) : null}
      {detail.available ? (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon="check" />
          </div>
          <div className="tag_text">
            <div>Available</div>
            <div>In store</div>
          </div>
        </div>
      ) : (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon="times" />
          </div>
          <div className="tag_text">
            <div>Not Available</div>
            <div>Pre order only</div>
          </div>
        </div>
      )}
    </div>
  );
  const showProductActions = detail => (
    <div className="product_actions">
      <div className="price">${detail.price}</div>
      <div className="cart">
        <MyButton
          type="add_to_cart_link"
          runAction={() => console.log("added to cart")}
        />
      </div>
    </div>
  );

  const showProductSpecs = detail => (
    <div className="product_specifications">
      <h2>Specs:</h2>
      <div className="item">
        <strong>Colors:</strong>
        {detail.color.name ? detail.color.name : null}
      </div>
      <div className="item">
        <strong>Dress Type:</strong>
        {detail.dress.name}
      </div>
    </div>
  );

  return (
    <div>
      <h1>{detail.dress.name}</h1>
      <p>{detail.description}</p>
      {showProductTags(detail)}
      {showProductActions(detail)}
      {showProductSpecs(detail)}
    </div>
  );
};

export default ProductInfo;
