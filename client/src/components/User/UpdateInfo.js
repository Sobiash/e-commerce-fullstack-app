import React, { Component } from "react";
import FormField from "../utils/Form/FormField";
import { connect } from "react-redux";
import {
  update,
  generateData,
  isFormValid,
  populateFields
} from "../utils/Form/FormActions";

import {
  updateUserData,
  clearUpdateUserData
} from "../../actions/user_actions";

class UpdateInfo extends Component {
  state = {
    formError: false,
    formSuccess: false,
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
      this.props.dispatch(updateUserData(dataToSubmit)).then(() => {
        if (this.props.user.updateUserData.success) {
          this.setState(
            {
              formSuccess: true
            },
            () => {
              setTimeout(() => {
                this.props.dispatch(clearUpdateUserData());
                this.setState({
                  formSuccess: false
                });
              }, 2000);
            }
          );
        }
      });
    } else {
      this.setState({
        formError: true
      });
    }
  };

  componentDidMount = () => {
    const newFormData = populateFields(
      this.state.formData,
      this.props.user.userData
    );
    this.setState({
      formData: newFormData
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={event => this.submitForm(event)}>
          <h4>Personal information</h4>
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
            <FormField
              id={"password"}
              data={this.state.formData.password}
              change={element => this.updateForm(element)}
            />
          </div>
          <div>
            {this.state.formSuccess ? (
              <div className="form_success">Success</div>
            ) : null}
            {this.state.formError ? (
              <div className="error_label">Please check your data</div>
            ) : null}
            <div
              className="link_default"
              onClick={event => this.submitForm(event)}
            >
              Update personal info
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(UpdateInfo);
