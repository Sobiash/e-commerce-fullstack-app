import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { STRIPE_KEY } from "../utils/config";

class Payment extends Component {
  onToken = res => {
    const { onSuccess } = this.props;
    onSuccess(res);
  };
  render() {
    const { cart, email, amount, children } = this.props;
    const { onToken } = this;
    return (
      <StripeCheckout
        amount={amount * 100}
        name="Fashe"
        image={cart}
        stripeKey={STRIPE_KEY}
        currency="USD"
        email={email}
        token={res => onToken(res)}
        allowRememberMe={true}
      >
        {children}
      </StripeCheckout>
    );
  }
}

export default Payment;
