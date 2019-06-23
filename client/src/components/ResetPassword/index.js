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
    const { requestReset } = this.props;

    let dataToSubmit = generateData(formData, "reset_email");
    let formIsValid = isFormValid(formData, "reset_email");

    if (formIsValid) {
      requestReset(dataToSubmit);
    }
  };
  render() {
    const { formData, formError } = this.state;
    const { email } = formData;
    const { submitForm, updateForm } = this;
    return (
      <div
        className="container"
        style={{
          width: "500px",
          margin: "20px 300px 200px 200px"
        }}
      >
        <h3>Reset password</h3>
        <form onSubmit={event => submitForm(event)}>
          <FormField
            id={"email"}
            data={email}
            change={element => updateForm(element)}
          />

          {/* <div className="from_success">Done, check your email</div> */}

          {formError ? (
            <div className="error_label">Please check your data</div>
          ) : null}
          <div className="link_default" onClick={event => submitForm(event)}>
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
