import React, { Component } from "react";
import FormField from "../utils/Form/FormField";
import { update, generateData, isFormValid } from "../utils/Form/FormActions";
import axios from "axios";
import { textAlign, fontSize } from "@material-ui/system";

class RequestReset extends Component {
  state = {
    formError: false,
    formSuccess: false,
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
    const newFormData = update(element, this.state.formData, "reset_email");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "reset_email");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "reset_email");
    let formIsValid = isFormValid(this.state.formData, "reset_email");

    if (formIsValid) {
      axios.post("/api/users/reset-user", dataToSubmit).then(response => {
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
        <form onSubmit={event => this.submitForm(event)}>
          <FormField
            id={"email"}
            data={this.state.formData.email}
            change={element => this.updateForm(element)}
          />

          {this.state.formSuccess && (
            <div className="form_success">Done, check your email</div>
          )}
          {this.state.formError && (
            <div className="error_label">Please check your data</div>
          )}
          <div
            className="link_default"
            onClick={event => this.submitForm(event)}
          >
            Reset Password
          </div>
        </form>
      </div>
    );
  }
}

export default RequestReset;
