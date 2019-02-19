import React, { Component } from "react";
import FormField from "../../utils/Form/FormField";

import {
  update,
  generateData,
  isFormValid,
  resetFields
} from "../../utils/Form/FormActions";
import { connect } from "react-redux";
import { getDresses, addDressType } from "../../../actions/products_actions";

class ManageDresses extends Component {
  state = {
    formError: false,
    formSuccess: false,
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
    const newFormData = resetFields(this.state.formData, "dresses");
    this.setState({
      formData: newFormData,
      formSuccess: true
    });
  };
  updateForm = element => {
    const newFormData = update(element, this.state.formData, "dresses");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };
  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "dresses");
    let formIsValid = isFormValid(this.state.formData, "dresses");
    let existingDresses = this.props.products.dresses;

    if (formIsValid) {
      this.props
        .dispatch(addDressType(dataToSubmit, existingDresses))
        .then(response => {
          if (response.payload.success) {
            this.resetFieldsHandler();
            this.setState(
              {
                formSuccess: true
              },
              () => {
                setTimeout(() => {
                  this.setState({
                    formSuccess: false
                  });
                }, 2000);
              }
            );
          } else {
            this.setState({
              formError: true
            });
          }
        });
    } else {
      this.setState({
        formError: true
      });
    }
  };

  renderCategories = () =>
    this.props.products.dresses
      ? this.props.products.dresses.map((item, i) => (
          <div className="category_item" key={item._id}>
            {item.name}
          </div>
        ))
      : null;
  componentDidMount() {
    this.props.dispatch(getDresses());
  }
  render() {
    return (
      <div className="admin_category_wrapper">
        <h3>Dress Types</h3>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">{this.renderCategories()}</div>
          </div>
          <div className="right">
            <form onSubmit={event => this.submitForm(event)}>
              <FormField
                id={"name"}
                data={this.state.formData.name}
                change={element => this.updateForm(element)}
              />
              {this.state.formSuccess ? (
                <div className="form_success">Product added successfully!</div>
              ) : null}
              {this.state.formError ? (
                <div className="error_label">Please check your data</div>
              ) : null}
              <div
                className="link_default"
                onClick={event => this.submitForm(event)}
              >
                Add dress
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(ManageDresses);
