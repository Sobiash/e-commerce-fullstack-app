import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { STRIPE_KEY } from "../utils/config";

class Payment extends Component {
  onToken = res => {
    this.props.onSuccess(res);
  };
  render() {
    const image = this.props.cart;
    return (
      <StripeCheckout
        amount={this.props.amount * 100}
        name="Fashe"
        image={image}
        stripeKey={STRIPE_KEY}
        currency="USD"
        email={this.props.email}
        token={res => this.onToken(res)}
        allowRememberMe={true}
      >
        {this.props.children}
      </StripeCheckout>
    );
  }
}

export default Payment;
