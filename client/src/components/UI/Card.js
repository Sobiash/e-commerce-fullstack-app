import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid } from "@material-ui/core";
import MyButton from "../UI/button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../actions/user_actions";
import PropTypes from "prop-types";

class Card extends React.Component {
  renderCardImage = images => {
    if (images && images.length > 0) {
      return images[0].url;
    } else {
      return "/images/img3.jpeg";
    }
  };

  render() {
    const { card, grid, newArrival, popular, linkTo } = this.props;
    const { _id, images, name, price, color } = card;
    const { renderCardImage } = this;

    const classes = {
      root: {
        flexGrow: 1
      },
      paper: {
        height: "400px",
        width: "270px",
        marginRight: "25px",
        borderRadius: "0px"
      },
      cardImage: {
        width: "270px",
        height: "400px",
        display: "inline-block",
        objectFit: "center"
      },
      grid: { width: "270px", margin: "0 10px" }
    };
    return (
      <div className={`${grid}`}>
        <div className={`pos-relative ${newArrival} ${popular}`}>
          <Link to={`/product_detail/${_id}`}>
            <Grid item style={classes.grid}>
              <Paper style={classes.paper}>
                <img
                  src={renderCardImage(images)}
                  alt={name}
                  style={classes.cardImage}
                />
              </Paper>
            </Grid>
            <div className="buttons block center">
              <div className="size-button inlineblock">
                <MyButton type="size" title="SIZE" />
              </div>
              <div className="inlineblock">
                <MyButton type="add_to_cart_link" linkTo={linkTo} title="ADD" />
              </div>
            </div>
          </Link>

          <p className="center sm-line-height">{name}</p>
          <p className="center sm-line-height">$ {price}</p>
          <p className="center sm-line-height">
            {color.length > 1 ? "+" + color.length + " Colors" : null}
          </p>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
  newArrival: PropTypes.string,
  popular: PropTypes.string
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { addToCart }
)(Card);
