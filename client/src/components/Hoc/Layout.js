import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <div className="page_container">
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
