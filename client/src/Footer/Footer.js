import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <footer className="bck_b_dark">
        <div className="container">
          <div className="logo">Waves</div>
          <div className="wrapper">
            <div className="left">
              <h2>Contact Information</h2>
              <div className="business_nfo">
                <div className="tag">
                  <div className="nfo">
                    <div>Address</div>
                    <div>Wiertnicza 91, apt 4</div>
                  </div>
                </div>
                <div className="tag">
                  <div className="nfo">
                    <div>Phone</div>
                    <div>444 444 444</div>
                  </div>
                </div>
                <div className="tag">
                  <div className="nfo">
                    <div>Working Hours</div>
                    <div>Mon-Sun / 9am-8pm</div>
                  </div>
                </div>
                <div className="tag">
                  <div className="nfo">
                    <div>Email</div>
                    <div>se@waves.com</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="left">
              <h2>Be the first to know</h2>
              <div>
                <div>
                  Get all the information on events, sales and offers. You can
                  miss out.
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
