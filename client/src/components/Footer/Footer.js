import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="wrapper">
          <div className="flex-w">
            <div className="left">
              <h4 className="newsletter">GET IN TOUCH</h4>
              <p>
                Any questions? Let us know in store at 8th floor, 379 Hudson St,
                New York, NY 10018 or call us on (+1) 96 716 6879
              </p>
            </div>
            <div className="middle">middle links</div>
            <div className="right">
              <h4 className="newsletter">NEWSLETTER</h4>
              <div>
                <div>Get all the information on events, sales and offers.</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
