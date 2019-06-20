import React from "react";
import PropTypes from "prop-types";

const FormField = ({ data, change, id }) => {
  const {
    element,
    showLabel,
    config,
    value,
    validation,
    valid,
    validationMessage
  } = data;
  const showError = () => {
    let errorMessage = null;
    if (validation && !valid) {
      errorMessage = <div className="error_label">{validationMessage}</div>;
    }
    return errorMessage;
  };

  const renderFormTemplate = () => {
    let formTemplate = null;

    switch (element) {
      case "input":
        formTemplate = (
          <div className="formBlock">
            {showLabel && <div className="label_inputs">{config.lable}</div>}
            <input
              {...config}
              value={value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id })}
            />
            {showError()}
          </div>
        );
        break;
      case "select":
        formTemplate = (
          <div className="formBlock">
            {showLabel && <div className="label_inputs">{config.lable}</div>}
            <select
              value={value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id })}
            >
              <option value="">Select one</option>
              {config.options.map(item => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
            </select>
            {showError()}
          </div>
        );

        break;
      case "textarea":
        formTemplate = (
          <div className="formBlock">
            {showLabel && <div className="label_inputs">{config.lable}</div>}
            <textarea
              {...config}
              value={value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id })}
            />
            {showError()}
          </div>
        );

        break;
      default:
        formTemplate = "input";
    }
    return formTemplate;
  };
  return <div>{renderFormTemplate()}</div>;
};

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  change: PropTypes.func.isRequired
};

FormField.defaultProps = {
  id: "input"
};

export default FormField;
