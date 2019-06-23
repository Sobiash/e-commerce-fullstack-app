import React, { Component } from "react";
import FormField from "../utils/Form/FormField";
import { update, generateData, isFormValid } from "../utils/Form/FormActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/auth_actions";
import { withRouter } from "react-router-dom";

class Register extends Component {
  state = {
    formError: {},
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
    const newFormData = update(element, formData, "register");
    this.setState({
      formData: newFormData
    });
  };
  submitForm = event => {
    event.preventDefault();

    const { formData } = this.state;
    const { registerUser, history } = this.props;

    let dataToSubmit = generateData(formData, "register");

    let formIsValid = isFormValid(formData, "register");

    if (formIsValid) {
      registerUser(dataToSubmit, history);
    }
  };

  componentDidMount() {
    const { auth, history } = this.props;
    const { isAuthenticated } = auth;
    if (isAuthenticated) {
      history.push("/users/user_profile");
    }
  }

  componentWillReceiveProps(nextProps) {
    const { errors } = this.props;
    if (nextProps.errors !== errors) {
      this.setState({ formError: nextProps.errors });
    }
  }
  render() {
    const { formError, formData } = this.state;
    const { name, lastname, email, password, confirmPassword } = formData;
    const { updateForm, submitForm } = this;
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container" style={{ width: "600px" }}>
            <div className="left">
              <form onSubmit={event => submitForm(event)}>
                <h3>Write your personal details</h3>
                <br />
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      id={"name"}
                      data={name}
                      change={element => updateForm(element)}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      id={"lastname"}
                      data={lastname}
                      change={element => updateForm(element)}
                    />
                  </div>
                </div>
                <div>
                  <div className="block">
                    <FormField
                      id={"email"}
                      data={email}
                      change={element => updateForm(element)}
                    />
                  </div>
                </div>
                <br />
                <br />
                <h3>Verify password</h3>
                <div className="form_block_two">
                  <div className="block">
                    <FormField
                      id={"password"}
                      data={password}
                      change={element => updateForm(element)}
                    />
                  </div>
                  <div className="block">
                    <FormField
                      id={"confirmPassword"}
                      data={confirmPassword}
                      change={element => updateForm(element)}
                    />
                  </div>
                </div>
                <div>
                  {formError && (
                    <div className="error_label">{formError.error}</div>
                  )}

                  <div
                    className="link_default"
                    onClick={event => submitForm(event)}
                  >
                    Create account
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
