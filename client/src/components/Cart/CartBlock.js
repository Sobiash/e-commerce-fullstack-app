import React from "react";

const CartBlock = ({ user, removeItem, type }) => {
  const renderCartImages = images => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/img1.jpeg";
    }
  };
  const renderCartItems = () =>
    user.cartDetail
      ? user.cartDetail.map(item => (
          <div className="user_product_block" key={item._id}>
            <div className="item">
              <div
                className="image"
                style={{
                  background: `url(${renderCartImages(item.images)}) no-repeat`
                }}
              />
            </div>
            <div className="item">
              <h4>Item</h4>
              <div>{item.name}</div>
            </div>
            <div className="item">
              <h4>Quantity</h4>
              <div>{item.quantity}</div>
            </div>
            <div className="item">
              <h4>Price</h4>
              <div>$ {item.price}</div>
            </div>
            <div className="item btn">
              <div
                className="cart_remove_btn"
                onClick={() => removeItem(item._id)}
              >
                Remove
              </div>
            </div>
          </div>
        ))
      : null;
  return <div>{renderCartItems()}</div>;
};

export default CartBlock;
