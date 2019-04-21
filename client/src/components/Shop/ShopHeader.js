import React from "react";
import PropTypes from "prop-types";

const ShopHeader = props => {
  const renderList = () =>
    props.list &&
    props.list.map(category => (
      <div key={category._id} className="main_menu">
        <nav onClick={filters(category._id)}>{category.name}</nav>
      </div>
    ));
  const filters = value => () => {
    const filters = [value];
    props.handleFilters(filters);
  };

  return (
    <div className="page_top">
      <div className="container">
        <div className="menu">
          <a href="/shop">
            <div className="main_menu">All</div>
          </a>
          {renderList()}
        </div>
      </div>
    </div>
  );
};

ShopHeader.propTypes = {
  list: PropTypes.array.isRequired,
  handleFilters: PropTypes.func.isRequired
};

export default ShopHeader;
