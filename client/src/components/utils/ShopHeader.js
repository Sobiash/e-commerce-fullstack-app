import React from "react";

const ShopHeader = props => {
  return (
    <div className="page_top">
      <div className="container">{props.title}</div>
    </div>
  );
};

export default ShopHeader;
