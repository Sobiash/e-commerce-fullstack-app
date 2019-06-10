import React, { Component } from "react";
import axios from "axios";
import FormField from "../utils/Form/FormField";
import { update, generateData, isFormValid } from "../utils/Form/FormActions";
import Dialog from "@material-ui/core/Dialog";

class ResetPassWord extends Component {
  state = {
    resetToken: "",
    formError: false,
    formErrorMessage: "",
    formSuccess: "",
    formData: {
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter your password"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      confirmPassword: {
        element: "input",
        value: "",
        config: {
          name: "confirm_password_input",
          type: "password",
          placeholder: "Confirm your password"
        },
        validation: {
          required: true,
          confirm: "password"
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "reset-password");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "reset-password");
    let formIsValid = isFormValid(this.state.formData, "reset-password");

    if (formIsValid) {
      axios
        .post("/api/users/reset-password", {
          ...dataToSubmit,
          resetToken: this.state.resetToken
        })
        .then(response => {
          if (!response.data.success) {
            this.setState({
              formError: true,
              formErrorMessage: response.data.message
            });
          } else {
            this.setState({ formError: false, formSuccess: true });
            setTimeout(() => {
              this.props.history.push("/register_login");
            }, 3000);
          }
        });
    } else {
      this.setState({
        formError: true
      });
    }
  };

  componentDidMount() {
    const resetToken = this.props.match.params.token;
    this.setState({ resetToken });
  }

  render() {
    return (
      <div className="page_container">
        <form onSubmit={event => this.submitForm(event)}>
          <h3>Reset password</h3>

          <div className="form_block_two">
            <div className="block">
              <FormField
                id={"password"}
                data={this.state.formData.password}
                change={element => this.updateForm(element)}
              />
            </div>
            <div className="block">
              <FormField
                id={"confirmPassword"}
                data={this.state.formData.confirmPassword}
                change={element => this.updateForm(element)}
              />
            </div>
          </div>

          <div>
            {this.state.formError ? (
              <div className="error_label">{this.state.formErrorMessage}</div>
            ) : (
              ""
            )}
            <div
              className="link_default"
              onClick={event => this.submitForm(event)}
            >
              Reset password
            </div>
          </div>
        </form>

        <Dialog open={this.state.formSuccess}>
          <div className="dialog_alert">
            <div>
              Your password was reseted...you will be redirected to login page.
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default ResetPassWord;
