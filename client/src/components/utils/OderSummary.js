import React from "react";

const OrderSummary = props => {
  const detail = props.detail;

  return (
    <div>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <div className="product_info" />

      {/* <b>{detail.name}</b> */}
      {/* <div>{detail.price} $</div> */}
      {/* <h5>{detail.name}</h5>
      <span>{detail.price} $</span> */}
      {/* <div>color: {selectedColor}</div>
          <div>size: {selectedSize}</div> */}
      <p>Continue to Checkout?</p>
      {/* <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button> */}
    </div>
  );
};

export default OrderSummary;
