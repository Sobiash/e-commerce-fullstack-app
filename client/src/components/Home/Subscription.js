import React from "react";
import FormField from "../utils/Form/FormField";
import { update, generateData, isFormValid } from "../utils/Form/FormActions";

class Subscription extends React.Component {
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

  render() {
    const { formData, formSuccess, formError } = this.state;
    return (
      <div
        style={{
          width: "450px",
          margin: "0 auto",
          height: "200px",
          textAlign: "center",
          fontSize: "25px"
        }}
      >
        SIGN UP FOR OUR NEWSLETTER
        <br />
        <form onSubmit={event => this.submitForm(event)}>
          <FormField
            id={"email"}
            data={formData.email}
            change={element => this.updateForm(element)}
          />

          {formSuccess && (
            <div className="form_success">Done, check your email</div>
          )}
          {formError && (
            <div className="error_label">Please check your data</div>
          )}
          <div
            className="link_default"
            onClick={event => this.submitForm(event)}
          >
            Sign up
          </div>
        </form>
      </div>
    );
  }
}

export default Subscription;
