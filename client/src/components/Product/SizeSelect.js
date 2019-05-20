import PropTypes from "prop-types";
import React, { Component } from "react";

const propTypes = {
  handleSizeSelection: PropTypes.func.isRequired,
  sizesArray: PropTypes.array.isRequired,
  selectedSize: PropTypes.string.isRequired,
  validateSizeSelection: PropTypes.func.isRequired
};

class SizeSelect extends Component {
  render() {
    const {
      handleSizeSelection,
      sizesArray,
      selectedSize,
      validateSizeSelection
    } = this.props;

    const dropDownList =
      sizesArray && sizesArray.map(x => <option key={x}>{x}</option>);

    return (
      <div>
        <p>
          Size: {selectedSize.length > 0 ? selectedSize : "Click to choose"}
        </p>
        <select
          onChange={event => {
            return (
              handleSizeSelection(event.target.value),
              validateSizeSelection("valid")
            );
          }}
        >
          <option>Select option</option>
          {dropDownList}
        </select>
      </div>
    );
  }
}

export default SizeSelect;
