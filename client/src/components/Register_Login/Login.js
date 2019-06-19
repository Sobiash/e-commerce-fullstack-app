import React from "react";
import FormField from "../utils/Form/FormField";
import { Link } from "react-router-dom";
import { update, generateData, isFormValid } from "../utils/Form/FormActions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/auth_actions";
import { createCart } from "../../actions/user_actions";
import PropTypes from "prop-types";

class Login extends React.Component {
  state = {
    formError: false,
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
      }
    }
  };

  updateForm = element => {
    const { formData } = this.state;
    const newFormData = update(element, formData, "login");
    this.setState({
      formData: newFormData
    });
  };

  submitForm = event => {
    const { formData } = this.state;
    const { loginUser } = this.props;

    event.preventDefault();

    let dataToSubmit = generateData(formData, "login");
    let formIsValid = isFormValid(formData, "login");

    if (formIsValid) {
      loginUser(dataToSubmit);
    }
  };

  componentDidMount() {
    const { auth, history } = this.props;
    if (auth.isAuthenticated) {
      history.push("/user/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    const { auth, history, createCart, errors } = this.props;
    if (nextProps.auth.isAuthenticated !== auth.isAuthenticated) {
      history.push("/user/dashboard");
      createCart(nextProps.auth.user.id);
    }

    if (nextProps.errors !== errors) {
      this.setState({ formError: nextProps.errors });
    }
  }

  render() {
    const { email, password } = this.state.formData;
    const { formError } = this.state;
    return (
      <div className="signin_wrapper">
        <form onSubmit={event => this.submitForm(event)}>
          <FormField
            id={"email"}
            data={email}
            change={element => this.updateForm(element)}
          />
          <br />
          <FormField
            id={"password"}
            data={password}
            change={element => this.updateForm(element)}
          />
          <br />
          <Link to="/reset-user" style={{ textDecoration: "underline" }}>
            Forgot Password?
          </Link>
          {formError && <div className="error_label"> {formError.error}</div>}
          <div className="login_buttons">
            <div
              className="link_default"
              onClick={event => this.submitForm(event)}
            >
              Log in
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    user: state.user,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { loginUser, createCart }
)(withRouter(Login));
