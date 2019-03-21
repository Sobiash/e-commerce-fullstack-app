import React, { Component } from "react";
import FormField from "../utils/Form/FormField";
import { update, generateData, isFormValid } from "../utils/Form/FormActions";
import Dialog from "@material-ui/core/Dialog";
import { connect } from "react-redux";
import { registerUser } from "../../actions/user_actions";

class Register extends Component {
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
          placeholder: "Enter your name"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          name: "lastname_input",
          type: "text",
          placeholder: "Enter your lastname"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
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
      },
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
    const newFormData = update(element, this.state.formData, "register");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };
  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "register");
    let formIsValid = isFormValid(this.state.formData, "register");

    if (formIsValid) {
      this.props.dispatch(registerUser(dataToSubmit)).then(response => {
        if (response.payload.success) {
          this.setState({
            formError: false,
            formSuccess: true
          });
          setTimeout(() => {
            this.props.history.push("/register_login");
          }, 3000);
        } else {
          this.setState({ formError: true });
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
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="left">
              <form onSubmit={event => this.submitForm(event)}>
                <h3>Personal information</h3>
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      id={"name"}
                      data={this.state.formData.name}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      id={"lastname"}
                      data={this.state.formData.lastname}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
                <div>
                  <div className="block">
                    <FormField
                      id={"email"}
                      data={this.state.formData.email}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
                <h3>Verify password</h3>
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
                    <div className="error_label">Please check your data</div>
                  ) : null}
                  <div
                    className="link_default"
                    onClick={event => this.submitForm(event)}
                  >
                    Create an account
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Dialog open={this.state.formSuccess}>
          <div className="dialog_alert">
            <div>
              Congratulations!! You will be redirected to the login in a few
              seconds...
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect()(Register);
