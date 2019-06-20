import React from "react";
import PropTypes from "prop-types";

const Backdrop = ({ openModal, closeModal }) =>
  openModal ? <div className="backdrop" onClick={closeModal} /> : null;

Backdrop.propTypes = {
  openModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default Backdrop;
