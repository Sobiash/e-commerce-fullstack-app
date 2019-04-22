import React from "react";
import PropTypes from "prop-types";

const Backdrop = props =>
  props.openModal ? (
    <div className="backdrop" onClick={props.closeModal} />
  ) : null;

Backdrop.propTypes = {
  openModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default Backdrop;
