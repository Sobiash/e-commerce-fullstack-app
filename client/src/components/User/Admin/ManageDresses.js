import React, { Component } from "react";
import FormField from "../../utils/Form/FormField";
import {
  update,
  generateData,
  isFormValid,
  resetFields
} from "../../utils/Form/FormActions";
import { connect } from "react-redux";
import { addDressType } from "../../../actions/products_actions";
import PropTypes from "prop-types";

class ManageDresses extends Component {
  state = {
    formError: false,
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "Enter dress type"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  componentWillReceiveProps(nextProps) {
    const { errors } = this.props;

    if (nextProps.errors !== errors) {
      this.setState({ formError: nextProps.errors });
    }
  }

  resetFieldsHandler = () => {
    const { formData } = this.state;

    const newFormData = resetFields(formData, "dresses");
    this.setState({
      formData: newFormData
    });
  };
  updateForm = element => {
    const { formData } = this.state;

    const newFormData = update(element, formData, "dresses");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };
  submitForm = event => {
    event.preventDefault();

    const { formData } = this.state;
    const { addDressType } = this.props;
    const { resetFieldsHandler } = this;

    let dataToSubmit = generateData(formData, "dresses");
    let formIsValid = isFormValid(formData, "dresses");

    if (formIsValid) {
      addDressType(dataToSubmit);
      resetFieldsHandler();
    }
  };
  render() {
    const { formData, formError } = this.state;
    const { name } = formData;
    const { updateForm, submitForm } = this;

    return (
      <div className="admin_category_wrapper">
        <h3>Dress Types</h3>
        <div className="admin_two_column">
          <div className="left" />
          <div className="right">
            <form onSubmit={event => submitForm(event)}>
              <FormField
                id={"name"}
                data={name}
                change={element => updateForm(element)}
              />
              {formError && (
                <div className="error_label">{formError.error}</div>
              )}
              <button
                className="link_default"
                onClick={event => submitForm(event)}
              >
                Add dress type
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ManageDresses.propTypes = {
  addDressType: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { addDressType }
)(ManageDresses);
