import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../actions/user_actions";
import PropTypes from "prop-types";

class CategoryCard extends React.Component {
  render() {
    const { card } = this.props;
    return (
      <div
        style={{
          display: "inline-block",
          width: "300px",
          height: "400px",
          marginRight: "20px",
          marginTop: "30px",
          textAlign: "center"
        }}
      >
        <img
          className="image"
          style={{ width: "300px", height: "400px", marginBottom: "30px" }}
          src={card.images && card.images[0].url}
          alt={card.name}
        />

        {card.name}
      </div>
    );
  }
}

CategoryCard.propTypes = {
  card: PropTypes.object.isRequired
};

export default connect(
  null,
  { addToCart }
)(CategoryCard);
