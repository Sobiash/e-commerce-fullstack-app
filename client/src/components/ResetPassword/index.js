import React, { Component } from "react";
import FormField from "../utils/Form/FormField";
import { update, generateData, isFormValid } from "../utils/Form/FormActions";
import { connect } from "react-redux";
import { requestReset } from "../../actions/user_actions";
import { withRouter } from "react-router-dom";

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
      this.props.requestReset(dataToSubmit);
    }
  };
  render() {
    return (
      <div
        className="container"
        style={{
          width: "500px",
          margin: "20px 300px 200px 200px"
        }}
      >
        <h3>Reset password</h3>
        <form onSubmit={event => this.submitForm(event)}>
          <FormField
            id={"email"}
            data={this.state.formData.email}
            change={element => this.updateForm(element)}
          />

          {/* <div className="from_success">Done, check your email</div> */}

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

const mapStateToProps = state => {
  return {
    user: state.user,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { requestReset }
)(withRouter(ResetUser));
