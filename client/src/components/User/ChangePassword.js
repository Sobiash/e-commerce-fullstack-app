import React, { Component } from "react";
import FormField from "../utils/Form/FormField";

class ChangePassword extends Component {
  state = {
    formError: false,
    formData: {
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Current Password"
        },
        validation: {
          required: true,
          characterLength: 8
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      newPassword: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "New Password"
        },
        validation: {
          required: true,
          characterLength: 8
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      confirmPassword: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Confirm Password"
        },
        validation: {
          required: true,
          characterLength: 8
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };
  updateForm = element => {
    // const newFormData = update(element, this.state.formData, "update_user");
    // this.setState({
    //   formError: false,
    //   formData: newFormData
    // });
    console.log(element);
  };

  submitForm = event => {
    // event.preventDefault();

    // let dataToSubmit = generateData(this.state.formData, "update_user");
    // let formIsValid = isFormValid(this.state.formData, "update_user");

    // if (formIsValid) {
    //   this.props.updateUserData(dataToSubmit, this.props.history);
    // }
    console.log(event);
  };
  render() {
    return (
      <div>
        <br />
        <h3>Change password</h3>
        <p>
          If you wish to change the password to access your account, please
          provide the following information:
        </p>
        <br />
        <p>Your current e-mail address is: sobiashahbaz66@yahoo.com</p>
        <br />
        <form onSubmit={event => this.submitForm(event)}>
          {this.state.formError && (
            <div className="error_label">{this.state.formError.error}</div>
          )}
          <FormField
            id={"password"}
            data={this.state.formData.password}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={"newPassword"}
            data={this.state.formData.newPassword}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={"confirmPassword"}
            data={this.state.formData.confirmPassword}
            change={element => this.updateForm(element)}
          />
          <div
            className="link_default"
            onClick={event => this.submitForm(event)}
          >
            Change password
          </div>
        </form>
      </div>
    );
  }
}

export default ChangePassword;
