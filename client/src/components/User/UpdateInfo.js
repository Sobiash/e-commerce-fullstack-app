import React, { Component } from "react";
import FormField from "../utils/Form/FormField";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

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
      }
    }
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "update_user");
    this.setState({
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
    if (nextProps.errors) {
      this.setState({ formError: nextProps.errors });
    }
    if (nextProps.user.profile) {
      const profile = nextProps.user.profile;

      const newFormData = populateFields(this.state.formData, profile);
      this.setState({
        formData: newFormData
      });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={event => this.submitForm(event)}>
          <div style={{ display: "inline-block" }}>
            <h4>Personal information</h4>
          </div>

          <div
            className="link_default"
            style={{
              display: "inline-block",
              marginLeft: "300px",
              color: "#222222",
              background: "#ffffff"
            }}
            onClick={event => this.submitForm(event)}
          >
            SAVE <FontAwesomeIcon icon="save" />
          </div>
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
            <FormField
              id={"email"}
              data={this.state.formData.email}
              change={element => this.updateForm(element)}
            />
          </div>
          <div>
            {this.state.formError && (
              <div className="error_label">{this.state.formError.error}</div>
            )}
          </div>
        </form>
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
