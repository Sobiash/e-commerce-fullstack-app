import React from "react";
import { Link } from "react-router-dom";

const BreadCrumbs = props => {
  return (
    <nav className="navbar">
      <Link to="/shop" className="breadcrumb">
        Shop
      </Link>{" "}
      / {props.detail.category && props.detail.category.name} /{" "}
      {props.detail.dress && props.detail.dress.name} / {props.detail.name}
    </nav>
  );
};

export default BreadCrumbs;
