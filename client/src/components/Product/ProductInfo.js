import React from "react";
import MyButton from "../utils/button";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ColorSelect from "./ColorSelect";
import SizeSelect from "./SizeSelect";
import editor from "../../images/icons/edit.png";
import cross from "../../images/icons/cancel.png";

const ProductInfo = ({
  user,
  deleteProduct,
  detail,
  addToCart,
  toggleModal,
  handleSizeSelection,
  handleColorSelection,
  validateSizeSelection,
  validateColorSelection,
  selectedSize,
  selectedColor,
  colorSelectionMissingRemark,
  sizeSelectionMissingRemark
}) => {
  const { available, name, price, description, color, size } = detail;

  const showProductTags = () => (
    <div className="product_tags">
      {available ? (
        <div className="tag">
          <div className="tag_text">
            <div>Available in store</div>
          </div>
        </div>
      ) : (
        <div className="tag">
          <div className="tag_text">
            <div>Not Available</div>
            <div>Pre order only</div>
          </div>
        </div>
      )}
    </div>
  );

  const showProductActions = ({
    _id,
    name,
    price,
    color,
    size,
    description,
    images
  }) => (
    <div className="product_actions" style={{ display: "block" }}>
      <div
        className="cart"
        style={{ display: "inline-block", marginRight: "10px" }}
      >
        <MyButton
          type="add_to_cart_link"
          validateSizeSelection={validateSizeSelection}
          validateColorSelection={validateColorSelection}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          runAction={() => {
            return (
              addToCart(
                _id,
                name,
                price,
                color,
                size,
                description,
                images,
                selectedSize,
                selectedColor
              ),
              toggleModal()
            );
          }}
        />
      </div>
      {user.isAdmin && (
        <div style={{ display: "inline-block" }}>
          <div
            style={{
              display: "inline-block",
              marginLeft: "10px"
            }}
          >
            <Link to={`/admin/edit_product/${_id}`}>
              <img
                src={editor}
                alt="image-edit-image"
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "transparent"
                }}
              />
            </Link>
          </div>
          <div style={{ display: "inline-block", marginLeft: "10px" }}>
            <div onClick={() => deleteProduct(_id)}>
              <img
                src={cross}
                alt="delete"
                style={{ width: "15px", height: "15px" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const showProductSpecs = ({ dress }) => (
    <div className="specs">
      <h5>Specs:</h5>
      <div className="item">
        <p>Dress type: {dress && dress.name}</p>
      </div>
    </div>
  );

  return (
    <div className="product_info">
      <h5>{name}</h5>
      <span>{price} $</span>
      <p>{description}</p>
      {showProductSpecs(detail)}

      <p>
        Selected color:{" "}
        {selectedColor === "" ? <i>Choose below</i> : selectedColor}
      </p>

      <ColorSelect
        colors={color}
        handleColorSelection={handleColorSelection}
        selectedColor={selectedColor}
        validateColorSelection={validateColorSelection}
      />
      {colorSelectionMissingRemark.length > 0 ? (
        <b style={{ color: "red" }}>*{colorSelectionMissingRemark}</b>
      ) : (
        ""
      )}

      <SizeSelect
        sizesArray={size}
        infoItem={detail}
        handleSizeSelection={handleSizeSelection}
        selectedSize={selectedSize}
        validateSizeSelection={validateSizeSelection}
      />
      {sizeSelectionMissingRemark.length > 0 ? (
        <b style={{ color: "red" }}>*{sizeSelectionMissingRemark}</b>
      ) : (
        ""
      )}

      {showProductTags(detail)}
      {showProductActions(detail)}
    </div>
  );
};

ProductInfo.propTypes = {
  detail: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default ProductInfo;
