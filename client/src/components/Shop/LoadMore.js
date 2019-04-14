import React from "react";
import CardBlock from "../utils/CardBlock";
import PropTypes from "prop-types";

const LoadMore = props => {
  return (
    <div>
      <div>
        <CardBlock
          grid={props.grid}
          list={props.products}
          title=""
          class="card_block_shop"
        />
      </div>
      {props.size > 0 && props.size >= props.limit && (
        <div className="load_more_container">
          <span onClick={() => props.loadMore()}>Load More</span>
        </div>
      )}
    </div>
  );
};

LoadMore.propTypes = {
  products: PropTypes.array.isRequired,
  grid: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  loadMore: PropTypes.func.isRequired
};

export default LoadMore;
