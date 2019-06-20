import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="wrapper">
        <div className="container">
          <div className="flex-w">
            <div className="left">
              <h4 className="newsletter">Shoping guide</h4>
              <div>
                <div>
                  <div>FAQ's</div>

                  <div>Payment</div>
                  <div>Shipment</div>
                  <div>Returns</div>
                  <div>Exchange</div>
                </div>
              </div>
            </div>
            <div className="middle">
              <h4 className="newsletter">Social</h4>
              <div>Facebook</div>
              <div>Twitter</div>
              <div>Pinterest</div>
              <div>Instagram</div>
              <div>Youtube</div>
            </div>

            <div className="right">
              <h4 className="newsletter">Payment methods</h4>
              <div>VISA</div>
              <div>MasterCard</div>
              <div>Paypal</div>
              <div>GiftCard</div>
              <div>Pay on delivery</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
