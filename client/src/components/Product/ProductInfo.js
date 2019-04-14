import React from "react";
import MyButton from "../utils/button";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const ProductInfo = props => {
  const detail = props.detail;

  const showProductTags = detail => (
    <div className="product_tags">
      {detail.shipping && (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon="truck" />
          </div>
          <div className="tag_text">
            <div>Free Shipping and return</div>
          </div>
        </div>
      )}
      {detail.available ? (
        <div className="tag">
          <div>
            <FontAwesomeIcon icon="check" />
          </div>
          <div className="tag_text">
            <div>Available in store</div>
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
    <div className="product_actions" style={{ display: "block" }}>
      <div
        className="cart"
        style={{ display: "inline-block", marginRight: "10px" }}
      >
        <MyButton
          type="add_to_cart_link"
          runAction={() =>
            props.addToCart(detail._id, detail.name, detail.price)
          }
        />
      </div>
      {props.user.isAdmin && (
        <div style={{ display: "inline-block" }}>
          <div style={{ display: "inline-block", marginRight: "10px" }}>
            <MyButton
              type="default"
              linkTo={`/admin/edit_product/${detail._id}`}
              title="EDIT PRODUCT"
            />
          </div>
          <div style={{ display: "inline-block" }}>
            <div
              className="link_default"
              onClick={() => props.deleteProduct(detail._id)}
            >
              DELETE PRODUCT
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const showProductSpecs = detail => (
    <div className="specs">
      <h5>Specs:</h5>
      <div className="item">
        {detail.color && <p>Colors: {detail.color.name}</p>}
      </div>
      <div className="item">
        <p>Dress type: {detail.dress && detail.dress.name}</p>
      </div>
    </div>
  );

  return (
    <div className="product_info">
      <h5>{detail.name}</h5>
      <span>{detail.price} $</span>
      <p>{detail.description}</p>
      {showProductSpecs(detail)}
      {showProductTags(detail)}
      {showProductActions(detail)}
    </div>
  );
};

ProductInfo.propTypes = {
  detail: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default ProductInfo;
