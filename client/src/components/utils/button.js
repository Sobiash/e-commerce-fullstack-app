import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

const MyButton = props => {
  const buttons = () => {
    let button = "";
    switch (props.type) {
      case "default":
        button = (
          <Link
            className={!props.altClass ? "link_default" : props.altClass}
            to={props.linkTo}
            {...props.addStyles}
          >
            {props.title}
          </Link>
        );
        break;
      case "cart_link":
        button = (
          <div
            className="bag_link"
            onClick={() => {
              props.toggleModal();
              props.runAction();
            }}
          >
            Add to cart
          </div>
        );
        break;
      case "add_to_cart_link":
        button = (
          <div
            onClick={() => {
              props.toggleModal();
              props.runAction();
            }}
            className={!props.altClass ? "bag_link" : props.altClass}
          >
            <FontAwesomeIcon icon="shopping-bag" /> {"  "}
            Add to cart
          </div>
        );

        break;
      default:
        button = "";
    }
    return button;
  };
  return <div className="my_link">{buttons()}</div>;
};

MyButton.propTypes = {
  altClass: PropTypes.string,
  runAction: PropTypes.func.isRequired,
  toggleModal: PropTypes.func,
  title: PropTypes.string,
  linkTo: PropTypes.string,
  type: PropTypes.string.isRequired,
  addStyles: PropTypes.object
};

export default MyButton;
