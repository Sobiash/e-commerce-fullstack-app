import React, { Component } from "react";
import FormField from "../../utils/Form/FormField";
import {
  update,
  generateData,
  isFormValid,
  resetFields
} from "../../utils/Form/FormActions";
import { connect } from "react-redux";
import { addColor } from "../../../actions/products_actions";
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

  resetFieldsHandler = () => {
    const newFormData = resetFields(this.state.formData, "colors");
    this.setState({
      formData: newFormData
    });
  };
  updateForm = element => {
    const newFormData = update(element, this.state.formData, "colors");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };
  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "colors");
    let formIsValid = isFormValid(this.state.formData, "colors");

    if (formIsValid) {
      this.props.addColor(dataToSubmit);
      this.resetFieldsHandler();
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ formError: nextProps.errors });
    }
  }

  render() {
    return (
      <div className="admin_category_wrapper">
        <h3>Color Types</h3>
        <div className="admin_two_column">
          <div className="left" />
          <div className="right">
            <form onSubmit={event => this.submitForm(event)}>
              <FormField
                id={"name"}
                data={this.state.formData.name}
                change={element => this.updateForm(element)}
              />
              {this.state.formError ? (
                <div className="error_label">{this.state.formError.error}</div>
              ) : null}
              <button
                className="link_default"
                onClick={event => this.submitForm(event)}
              >
                Add color type
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ManageDresses.propTypes = {
  addColor: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    products: state.products,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { addColor }
)(ManageDresses);
