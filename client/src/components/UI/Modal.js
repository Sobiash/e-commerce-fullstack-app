import React from "react";
import Backdrop from "./Backdrop";
import PropTypes from "prop-types";

const CartModal = props => {
  return (
    <div>
      <Backdrop openModal={props.openModal} closeModal={props.closeModal} />
      <div
        className="modal"
        style={{
          transform: props.openModal ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.openModal ? "1" : "0"
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

CartModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default CartModal;
