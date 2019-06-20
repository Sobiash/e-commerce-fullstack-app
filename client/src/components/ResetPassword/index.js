import React, { Component } from "react";
import FormField from "../utils/Form/FormField";
import { update, generateData, isFormValid } from "../utils/Form/FormActions";
import axios from "axios";
import { USER_SERVER } from "../utils/config";

class RequestReset extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formErrorMessage: "",
    formData: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };
  updateForm = element => {
    const { formData } = this.state;
    const newFormData = update(element, formData, "reset_email");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  updateForm = element => {
    const { formData } = this.state;
    const newFormData = update(element, formData, "reset_email");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();

    const { formData } = this.state;
    let dataToSubmit = generateData(formData, "reset_email");
    let formIsValid = isFormValid(formData, "reset_email");

    if (formIsValid) {
      axios.post(`${USER_SERVER}/reset-user`, dataToSubmit).then(response => {
        if (response.data.success) {
          this.setState({
            formSuccess: true
          });
        }
      });
    } else {
      this.setState({
        formError: true
      });
    }
  };
  render() {
    const { formData, formSuccess, formError, formErrorMessage } = this.state;
    const { email } = formData;
    const { updateForm, submitForm } = this;
    return (
      <div
        style={{
          width: "500px",
          margin: "150px 300px 200px 200px"
        }}
      >
        <h3 style={{ fontSize: "25px" }}>Forgot your password?</h3>
        <br />
        <p style={{ textAlign: "left", color: "#000" }}>
          If you cannot remember your password, enter your email address and
          we'll send you details on how to recover it.
        </p>
        <form onSubmit={event => submitForm(event)}>
          <FormField
            id={"email"}
            data={email}
            change={element => updateForm(element)}
          />

          {formSuccess && (
            <div className="form_success">
              An email has sent to your email address. Please reset your
              password.
            </div>
          )}
          {formError && (
            <div className="error_label">Please check your data</div>
          )}
          <div className="link_default" onClick={event => submitForm(event)}>
            Reset Password
          </div>
        </form>
      </div>
    );
  }
}

export default RequestReset;
