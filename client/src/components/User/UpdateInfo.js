import React, { Component } from "react";
import FormField from "../utils/Form/FormField";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import {
  update,
  generateData,
  isFormValid,
  populateFields
} from "../utils/Form/FormActions";

import { updateUserData, getUserProfile } from "../../actions/user_actions";

class UpdateInfo extends Component {
  state = {
    formError: false,
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
      }
    }
  };

  updateForm = element => {
    const { formData } = this.state;
    const newFormData = update(element, formData, "update_user");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();

    const { formData } = this.state;

    let dataToSubmit = generateData(formData, "update_user");
    let formIsValid = isFormValid(formData, "update_user");

    if (formIsValid) {
      const { updateUserData, history } = this.props;
      updateUserData(dataToSubmit, history);
    }
  };

  componentDidMount = () => {
    const { getUserProfile } = this.props;
    getUserProfile();
  };

  componentWillReceiveProps(nextProps) {
    const { errors, user } = this.props;
    const { formData } = this.state;

    if (nextProps.errors !== errors) {
      this.setState({ formError: nextProps.errors });
    }
    if (nextProps.user.profile !== user.profile) {
      const newFormData = populateFields(formData, nextProps.user.profile);
      this.setState({
        formData: newFormData
      });
    }
  }

  render() {
    const { updateForm, submitForm } = this;
    const { formData, formError } = this.state;
    const { name, lastname, email, password } = formData;

    return (
      <div>
        <form onSubmit={event => submitForm(event)}>
          <div style={{ display: "inline-block" }} />

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
          <br />
          <br />
          <h3>Change e-mail address</h3>
          <p>
            If you wish to update the e-mail address associated with this
            account, please fill in the following fields. Your password is
            requested for security reasons.
          </p>

          <br />
          <br />
          <div>
            <FormField
              id={"email"}
              data={email}
              change={element => updateForm(element)}
            />
          </div>
          <br />
          <br />
          <h3>Change password</h3>
          <p>
            If you wish to change the password to access your account, please
            provide the following information:
          </p>
          <br />

          <br />
          <div>
            <FormField
              id={"password"}
              data={password}
              change={element => updateForm(element)}
            />
          </div>
          <div>
            {formError && <div className="error_label">{formError.error}</div>}
          </div>
        </form>
        <div
          className="link_default"
          style={{
            color: "#222222",
            background: "#ffffff"
          }}
          onClick={event => submitForm(event)}
        >
          SAVE
        </div>
      </div>
    );
  }
}

UpdateInfo.propTypes = {
  updateUserData: PropTypes.func.isRequired,
  getUserProfile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateUserData, getUserProfile }
)(withRouter(UpdateInfo));
