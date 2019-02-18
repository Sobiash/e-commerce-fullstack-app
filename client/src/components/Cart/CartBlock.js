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
          <tr className="table-row" key={item._id}>
            <td className="column-1">
              <div className="cart-img-product">
                <img src={renderCartImages(item.images)} className="image" />
              </div>
            </td>
            <td className="column-2">{item.name}</td>
            <td className="column-3">{item.price}</td>
            <td class="column-4">{item.quantity}</td>
            <td class="column-5">
              <div className="item btn">
                <div
                  className="cart_remove_btn"
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </div>
              </div>
            </td>
          </tr>
        ))
      : null;
  return <React.Fragment>{renderCartItems()}</React.Fragment>;
};

export default CartBlock;
