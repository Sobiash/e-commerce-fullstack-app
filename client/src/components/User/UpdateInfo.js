import React, { Component } from "react";
import FormField from "../utils/Form/FormField";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// import FontAwesomeIcon from "@fortawesome/react-fontawesome";

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
    const newFormData = update(element, this.state.formData, "update_user");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "update_user");
    let formIsValid = isFormValid(this.state.formData, "update_user");

    if (formIsValid) {
      this.props.updateUserData(dataToSubmit, this.props.history);
    }
  };

  componentDidMount = () => {
    this.props.getUserProfile();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors !== this.props.errors) {
      this.setState({ formError: nextProps.errors });
    }
    if (nextProps.user.profile !== this.props.user.profile) {
      const newFormData = populateFields(
        this.state.formData,
        nextProps.user.profile
      );
      this.setState({
        formData: newFormData
      });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={event => this.submitForm(event)}>
          <div style={{ display: "inline-block" }} />

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
              data={this.state.formData.email}
              change={element => this.updateForm(element)}
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
              data={this.state.formData.password}
              change={element => this.updateForm(element)}
            />
          </div>
          <div>
            {this.state.formError && (
              <div className="error_label">{this.state.formError.error}</div>
            )}
          </div>
        </form>
        <div
          className="link_default"
          style={{
            color: "#222222",
            background: "#ffffff"
          }}
          onClick={event => this.submitForm(event)}
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
