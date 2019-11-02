import React from "react";
import Card from "./Card";
import PropTypes from "prop-types";

const CardBlock = ({ list, grid, newArrival, popular, title, classes }) => {
  const renderCards = () =>
    list &&
    list.map(card => (
      <Card
        key={card._id}
        card={card}
        grid={grid}
        newArrival={newArrival}
        popular={popular}
        linkTo={`/product_detail/${card._id}`}
      />
    ));
  return (
    <div>
      {classes === "card_block_shop" ? (
        <div className="card_block_shop">
          {/* <div> */}
          {list &&
            (list.length === 0 && (
              <div className="no-results">Sorry, no results</div>
            ))}
          {renderCards(list)}
          {/* </div> */}
        </div>
      ) : (
        <div className="card_block">
          <div className="container">
            {title && <div className="title">{title}</div>}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                margin: "0px auto"
              }}
            >
              {renderCards(list)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

CardBlock.propTypes = {
  list: PropTypes.array,
  grid: PropTypes.string,
  title: PropTypes.string,
  classes: PropTypes.string
};

export default CardBlock;
