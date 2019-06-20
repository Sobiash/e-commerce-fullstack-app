import React from "react";
import Backdrop from "./Backdrop";
import PropTypes from "prop-types";

const CartModal = ({ openModal, closeModal, children }) => {
  return (
    <div>
      <Backdrop openModal={openModal} closeModal={closeModal} />
      <div
        className="modal"
        style={{
          transform: openModal ? "translateY(0)" : "translateY(-100vh)",
          opacity: openModal ? "1" : "0"
        }}
      >
        {children}
      </div>
    </div>
  );
};

CartModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default CartModal;
