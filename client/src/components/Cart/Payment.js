import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";

class Payment extends Component {
  onToken = res => {
    this.props.onSuccess(res);
  };
  render() {
    return (
      <StripeCheckout
        amount={this.props.amount * 100}
        name="Fashe"
        stripeKey="pk_test_30qWNy4nAbfKtWvX0TdxWZLD"
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
