// import React, { Component } from "react";
// import FormField from "../utils/Form/FormField";
// import { update, generateData, isFormValid } from "../utils/Form/FormActions";
// import axios from "axios";
// import { USER_SERVER } from "../utils/config";

// class RequestReset extends Component {
//   state = {
//     formError: false,
//     formSuccess: false,
//     formErrorMessage: "",
//     formData: {
//       email: {
//         element: "input",
//         value: "",
//         config: {
//           name: "email_input",
//           type: "email",
//           placeholder: "Enter your email"
//         },
//         validation: {
//           required: true,
//           email: true
//         },
//         valid: false,
//         touched: false,
//         validationMessage: ""
//       }
//     }
//   };
//   updateForm = element => {
//     const { formData } = this.state;
//     const newFormData = update(element, formData, "reset_email");
//     this.setState({
//       formError: false,
//       formData: newFormData
//     });
//   };

//   updateForm = element => {
//     const { formData } = this.state;
//     const newFormData = update(element, formData, "reset_email");
//     this.setState({
//       formError: false,
//       formData: newFormData
//     });
//   };

//   submitForm = event => {
//     event.preventDefault();

//     const { formData } = this.state;
//     let dataToSubmit = generateData(formData, "reset_email");
//     let formIsValid = isFormValid(formData, "reset_email");

//     if (formIsValid) {
//       // console.log(dataToSubmit);
//       axios.post(`${USER_SERVER}/reset-user`, dataToSubmit).then(response => {
//         if (response.data.success) {
//           this.setState({
//             formSuccess: true
//           });
//         }
//       });
//     } else {
//       this.setState({
//         formError: true
//       });
//     }
//   };
//   render() {
//     const { formData, formSuccess, formError, formErrorMessage } = this.state;
//     const { email } = formData;
//     const { updateForm, submitForm } = this;
//     return (
//       <div
//         style={{
//           width: "500px",
//           margin: "150px 300px 200px 200px"
//         }}
//       >
//         <h3 style={{ fontSize: "25px" }}>Forgot your password?</h3>
//         <br />
//         <p style={{ textAlign: "left", color: "#000" }}>
//           If you cannot remember your password, enter your email address and
//           we'll send you details on how to recover it.
//         </p>
//         <form onSubmit={event => submitForm(event)}>
//           <FormField
//             id={"email"}
//             data={email}
//             change={element => updateForm(element)}
//           />

//           {formSuccess && (
//             <div className="form_success">
//               An email has sent to your email address. Please reset your
//               password.
//             </div>
//           )}
//           {formError && (
//             <div className="error_label">Please check your data</div>
//           )}
//           <div className="link_default" onClick={event => submitForm(event)}>
//             Reset Password
//           </div>
//         </form>
//       </div>
//     );
//   }
// }

// export default RequestReset;

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
      <div className="container">
        <h3>Reset password</h3>
        <form onSubmit={event => this.submitForm(event)}>
          <FormField
            id={"email"}
            data={this.state.formData.email}
            change={element => this.updateForm(element)}
          />

          <div className="from_success">Done, check your email</div>

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
