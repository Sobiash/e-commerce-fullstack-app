import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="page_container">{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

export default Layout;
