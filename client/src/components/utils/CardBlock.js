import React from "react";
import Card from "./Card";

const CardBlock = props => {
  // const renderCards = () =>
  //   props.productList
  //     ? props.productList.map((card, i) => <Card key={i} {...card} />)
  //     : null;

  return (
    <div className="card_block">
      {/* <div className="container">
        {props.title ? <div className="title">{props.title}</div> : null}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap"
          }}
        >
          {renderCards(props.productList)}
        </div>
      </div> */}
    </div>
  );
};

export default CardBlock;
