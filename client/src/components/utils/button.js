import React from "react";
import { Link } from "react-router-dom";

const MyButton = props => {
  const buttons = () => {
    let button = "";
    switch (props.type) {
      case "default":
        button = (
          <Link className="link_default" to={props.linkTo} {...props.addStyles}>
            {props.title}
          </Link>
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
