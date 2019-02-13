import React from "react";
import { Link } from "react-router-dom";

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
            onClick={() => {
              props.runAction();
            }}
          >
            <Link
              to={props.linkTo}
              className={!props.altClass ? "link_default" : props.altClass}
            >
              Add to cart
            </Link>
          </div>
        );
        break;
      case "add_to_cart_link":
        button = (
          <div
            onClick={() => {
              props.runAction();
            }}
            className={!props.altClass ? "link_default" : props.altClass}
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
export default MyButton;
