import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../actions/user_actions";
import PropTypes from "prop-types";

class CategoryCard extends React.Component {
  renderCardImage = images => {
    if (images && images.length > 0) {
      return images[0].url;
    } else {
      return "/images/img3.jpeg";
    }
  };

  getArticles = (dress, category) => {
    const filters = { dress: [dress], category: [category] };
    this.props.getProducts(0, 0, filters);
    console.log(filters);
  };

  render() {
    const { card, category } = this.props;
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
        <Link
          to={`/shop/dress/${card._id}`}
          key={card._id}
          onClick={() => this.getArticles(card._id, category)}
        >
          <img
            className="image"
            style={{ width: "300px", height: "400px", marginBottom: "30px" }}
            src={card.images && card.images[0].url}
            alt={card.name}
          />

          {card.name}
        </Link>
      </div>
    );
  }
}

CategoryCard.propTypes = {
  card: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { addToCart }
)(CategoryCard);
