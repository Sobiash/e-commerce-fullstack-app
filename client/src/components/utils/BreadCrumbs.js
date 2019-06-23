import React from "react";
import { NavLink } from "react-router-dom";

const BreadCrumbs = props => {
  const category = props.detail.category;
  const dress = props.detail.dress;
  return (
    <nav className="navbar">
      <NavLink to="/" className="breadcrumb">
        Home
      </NavLink>{" "}
      /{" "}
      <NavLink
        to={`/shop/category/${category && category._id}`}
        className="breadcrumb"
      >
        {category && category.name}
      </NavLink>{" "}
      /{" "}
      <NavLink to={`/shop/dress/${dress && dress._id}`} className="breadcrumb">
        {dress && dress.name}
      </NavLink>{" "}
      / {props.detail.name}
    </nav>
  );
};

export default BreadCrumbs;
