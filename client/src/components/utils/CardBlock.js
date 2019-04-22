import React from "react";
import Card from "./Card";
import PropTypes from "prop-types";

const CardBlock = props => {
  const renderCards = () =>
    props.list &&
    props.list.map(card => (
      <Card
        key={card._id}
        card={card}
        grid={props.grid}
        toggleModal={props.toggleModal}
      />
    ));
  return (
    <div>
      {props.class === "card_block_shop" ? (
        <div className="card_block_shop">
          <div>
            {props.list &&
              (props.list.length === 0 && (
                <div className="no-results">Sorry, no results</div>
              ))}
            {renderCards(props.list)}
          </div>
        </div>
      ) : (
        <div className="card_block">
          <div className="container">
            {props.title && <div className="title">{props.title}</div>}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap"
              }}
            >
              {renderCards(props.list)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

CardBlock.propTypes = {
  list: PropTypes.array.isRequired,
  grid: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  class: PropTypes.string.isRequired
};

export default CardBlock;
