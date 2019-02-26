import React from "react";

const Footer = ({ data }) => {
  return data.siteData ? (
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
          <div className="middle">
            <div className="w-size7 p-t-30 p-l-15 p-r-15 respon4">
              <h4 className="s-text12 p-b-30">Links</h4>

              <ul>
                <li className="p-b-9">
                  {/* <a href="#" className="s-text7"> */}
                  Men
                  {/* </a> */}
                </li>

                <li className="p-b-9">
                  {/* <a href="#" className="s-text7"> */}
                  Women
                  {/* </a> */}
                </li>

                <li className="p-b-9">
                  {/* <a href="#" className="s-text7"> */}
                  Dresses
                  {/* </a> */}
                </li>

                <li className="p-b-9">
                  {/* <a href="#" className="s-text7"> */}
                  Sunglasses
                  {/* </a> */}
                </li>
              </ul>
            </div>
          </div>
          <div className="right">
            <h4 className="newsletter">NEWSLETTER</h4>
            <div>
              <div>Get all the information on events, sales and offers.</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  ) : null;
};

export default Footer;
