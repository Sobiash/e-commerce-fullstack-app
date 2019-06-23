import React, { Component } from "react";
import axios from "axios";
import { USER_SERVER } from "../utils/config";
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
    const { formData } = this.state;
    const newFormData = update(element, formData, "reset-password");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();

    const { formData, resetToken } = this.state;
    const { history } = this.props;

    let dataToSubmit = generateData(formData, "reset-password");
    let formIsValid = isFormValid(formData, "reset-password");

    if (formIsValid) {
      axios
        .post(`${USER_SERVER}/reset-password`, {
          ...dataToSubmit,
          resetToken: resetToken
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
              history.push("/register_login");
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
    const { match } = this.props;
    const resetToken = match.params.token;
    this.setState({ resetToken });
  }

  render() {
    const { formSuccess, formData, formError, formErrorMessage } = this.state;
    const { password, confirmPassword } = formData;

    return (
      <div className="container">
        <div
          className="page_container"
          style={{
            width: "500px",
            margin: "20px 300px 200px 200px"
          }}
        >
          <form onSubmit={event => this.submitForm(event)}>
            <h3>Reset password</h3>

            <div className="form_block_two">
              <div className="block">
                <FormField
                  id={"password"}
                  data={password}
                  change={element => this.updateForm(element)}
                />
              </div>
              <div className="block">
                <FormField
                  id={"confirmPassword"}
                  data={confirmPassword}
                  change={element => this.updateForm(element)}
                />
              </div>
            </div>

            <div>
              {formError ? (
                <div className="error_label">{formErrorMessage}</div>
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

          <Dialog open={formSuccess}>
            <div className="dialog_alert">
              <div>
                Your password was reseted...you will be redirected to login
                page.
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default ResetPassWord;
