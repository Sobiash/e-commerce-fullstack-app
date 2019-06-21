import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const MyButton = ({
  altClass,
  linkTo,
  addStyles,
  title,
  selectedSize,
  selectedColor,
  validateSizeSelection,
  validateColorSelection,
  runAction,
  type
}) => {
  const buttons = () => {
    let button = "";
    switch (type) {
      case "default":
        button = (
          <Link
            className={!altClass ? "link_default" : altClass}
            to={linkTo}
            {...addStyles}
          >
            {title}
          </Link>
        );
        break;

      case "add_to_cart_link":
        button = (
          <div
            onClick={() => {
              return (
                selectedSize.length < 1 &&
                  validateSizeSelection("Please, select a size"),
                selectedColor.length < 1 &&
                  validateColorSelection("Please, select a color"),
                selectedSize.length > 0 &&
                  selectedColor.length > 0 &&
                  runAction()
              );
            }}
            className={!altClass ? "bag_link" : altClass}
          >
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
