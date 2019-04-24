import React from "react";
import { NavLink } from "react-router-dom";

const BreadCrumbs = props => {
  const category = props.detail.category;
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
      / {props.detail.dress && props.detail.dress.name} / {props.detail.name}
    </nav>
  );
};

export default BreadCrumbs;
