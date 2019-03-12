import React from "react";
import { Link } from "react-router-dom";

const ShopHeader = props => {
  const renderList = () =>
    props.list
      ? props.list.map(category => (
          <div key={category._id} className="main_menu">
            <nav onClick={filters(category._id)}>{category.name}</nav>
          </div>
        ))
      : null;

  const filters = value => () => {
    const filters = [value];
    props.handleFilters(filters);
  };

  return (
    <div className="page_top">
      <div className="container">
        <div className="menu">
          <Link to="/shop">
            <div className="main_menu">All</div>
          </Link>
          {renderList()}
        </div>
      </div>
    </div>
  );
};

export default ShopHeader;
