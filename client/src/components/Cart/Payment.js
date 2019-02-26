import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";

class Payment extends Component {
  onToken = res => {
    this.props.onSuccess(res);
  };
  render() {
    // const onSuccess = payment => {
    //       {id: "tok_1E7xiyEimJtvIv1Ic7oi6UoH", object: "token", card: {…}, client_ip: "185.75.39.114", created: 1551155964, …}
    // card: {id: "card_1E7xiyEimJtvIv1INl1ZIutJ", object: "card", address_city: null, address_country: null, address_line1: null, …}
    // client_ip: "185.75.39.114"
    // created: 1551155964
    // email: "sik1@gmail.com"
    // id: "tok_1E7xiyEimJtvIv1Ic7oi6UoH"
    // livemode: false
    // object: "token"
    // type: "card"
    // used: false

    //   console.log(payment);
    // };

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
