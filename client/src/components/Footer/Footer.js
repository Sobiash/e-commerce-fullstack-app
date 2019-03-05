import React from "react";

const Footer = ({ data }) => {
  return data.siteData ? (
    <footer>
      <div className="wrapper">
        <div className="container">
          <div className="flex-w">
            <div className="left">
              <h4 className="newsletter">SHOP</h4>
              <div>
                <div>
                  <div>All</div>
                  <div>Men</div>
                  <div>Women</div>
                  <div>Kids</div>
                </div>
              </div>
            </div>
            <div className="middle">
              <h4 className="newsletter">Contact Us</h4>
              <div>
                <div>Get all the information on events, sales and offers.</div>
              </div>
            </div>

            <div className="right">
              <h4 className="newsletter">Join the Fashe Club</h4>
              <div>
                <div>Get all the information on events, sales and offers.</div>
              </div>
            </div>
          </div>
          <div className="copyright">
            Get all the information on events, sales and offers.
          </div>
        </div>
      </div>
    </footer>
  ) : null;
};

export default Footer;
