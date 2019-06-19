import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { STRIPE_KEY } from "../utils/config";

class Payment extends Component {
  onToken = res => {
    this.props.onSuccess(res);
  };
  render() {
    const { cart, email, amount } = this.props;
    return (
      <StripeCheckout
        amount={amount * 100}
        name="Fashe"
        image={cart}
        stripeKey={STRIPE_KEY}
        currency="USD"
        email={email}
        token={res => this.onToken(res)}
        allowRememberMe={true}
      >
        {this.props.children}
      </StripeCheckout>
    );
  }
}

export default Payment;
