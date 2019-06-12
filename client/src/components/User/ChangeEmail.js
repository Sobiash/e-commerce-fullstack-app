import React, { Component } from "react";
import FormField from "../utils/Form/FormField";

class ChangeEmail extends Component {
  state = {
    formError: false,
    formData: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "New E-mail Address"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      repeatEmail: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Repeat E-mail Address"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },

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
        <h2>Access Details</h2>
        <br />
        <h3>Change e-mail address</h3>
        <p>
          If you wish to update the e-mail address associated with this account,
          please fill in the following fields. Your password is requested for
          security reasons.
        </p>
        <br />
        <p>Your current e-mail address is: sobiashahbaz66@yahoo.com</p>
        <br />
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
            id={"email"}
            data={this.state.formData.email}
            change={element => this.updateForm(element)}
          />
          <FormField
            id={"repeatEmail"}
            data={this.state.formData.repeatEmail}
            change={element => this.updateForm(element)}
          />
          <div
            className="link_default"
            onClick={event => this.submitForm(event)}
          >
            Change email
          </div>
        </form>
      </div>
    );
  }
}

export default ChangeEmail;
