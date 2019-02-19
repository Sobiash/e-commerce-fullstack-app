import React, { Component } from "react";
import FormField from "../utils/Form/FormField";
import { update, generateData, isFormValid } from "../utils/Form/FormActions";
import { connect } from "react-redux";
import { resetUser } from "../../actions/user_actions";

class ResetUser extends Component {
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
  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "reset_email");
    let formIsValid = isFormValid(this.state.formData, "reset_email");

    if (formIsValid) {
      this.props
        .dispatch(resetUser(dataToSubmit))
        .then(response => {
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
        })
        .catch(e => {
          this.setState({ formError: true });
        });
    }
  };
  render() {
    return (
      <div className="container">
        <h3>Reset password</h3>
        <form onSubmit={event => this.submitForm(event)}>
          <FormField
            id={"email"}
            data={this.state.formData.email}
            change={element => this.updateForm(element)}
          />
          {this.state.formSuccess ? (
            <div className="from_success">Done, check your email</div>
          ) : null}
          {this.state.formError ? (
            <div className="error_label">Please check your data</div>
          ) : null}
          <div
            className="link_default"
            onClick={event => this.submitForm(event)}
          >
            Send email
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(ResetUser);
