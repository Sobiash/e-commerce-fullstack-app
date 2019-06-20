import React from "react";
import CardBlock from "../utils/CardBlock";
import PropTypes from "prop-types";

const LoadMore = ({ grid, products, toggleModal, size, limit, loadMore }) => {
  return (
    <div>
      <div>
        <CardBlock
          grid={grid}
          list={products}
          title=""
          classes="card_block_shop"
          toggleModal={toggleModal}
        />
      </div>
      {size > 0 && size >= limit && (
        <div className="load_more_container">
          <span onClick={() => loadMore()}>Load More</span>
        </div>
      )}
    </div>
  );
};

LoadMore.propTypes = {
  products: PropTypes.array.isRequired,
  grid: PropTypes.string,
  limit: PropTypes.number,
  size: PropTypes.number,
  loadMore: PropTypes.func.isRequired
};

export default LoadMore;
