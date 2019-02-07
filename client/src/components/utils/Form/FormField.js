import React from "react";

const FormField = ({ data, change, id }) => {
  const showError = () => {
    let errorMessage = null;
    if (data.validation && !data.valid) {
      errorMessage = (
        <div className="error_label">{data.validationMessage}</div>
      );
    }
    return errorMessage;
  };

  const renderFormTemplate = () => {
    let formTemplate = null;

    switch (data.element) {
      case "input":
        formTemplate = (
          <div className="formBlock">
            {data.showLabel ? (
              <div className="label_inputs">{data.config.lable}</div>
            ) : null}
            <input
              {...data.config}
              value={data.value}
              onBlur={event => change({ event, id, blur: true })}
              onChange={event => change({ event, id })}
            />
            {showError()}
          </div>
        );
        break;
      default:
        formTemplate = null;
    }
    return formTemplate;
  };
  return <div>{renderFormTemplate()}</div>;
};
export default FormField;
