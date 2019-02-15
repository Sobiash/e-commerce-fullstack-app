import React, { Component } from "react";
import FormField from "../../utils/Form/FormField";
import {
  update,
  generateData,
  isFormValid,
  populateFields
} from "../../utils/Form/FormActions";

import { connect } from "react-redux";
import { getSiteData, updateSiteData } from "../../../actions/site_actions";

class UpdateSiteInfo extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      address: {
        element: "input",
        value: "",
        config: {
          lable: "Address",
          name: "address_input",
          type: "text",
          placeholder: "Enter your address"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      hours: {
        element: "input",
        value: "",
        config: {
          lable: "Working Hours",
          name: "hours_input",
          type: "text",
          placeholder: "Enter your working hours"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      phone: {
        element: "input",
        value: "",
        config: {
          lable: "Phone Number",
          name: "phone_input",
          type: "text",
          placeholder: "Enter your phone number"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      email: {
        element: "input",
        value: "",
        config: {
          lable: "Email Address",
          name: "email_input",
          type: "text",
          placeholder: "Enter your email address"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      }
    }
  };
  updateForm = element => {
    const newformData = update(element, this.state.formData, "site_info");
    this.setState({
      formError: false,
      formData: newformData
    });
  };
  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "site_info");
    let formIsValid = isFormValid(this.state.formData, "site_info");

    if (formIsValid) {
      this.props.dispatch(updateSiteData(dataToSubmit)).then(() => {
        this.setState(
          {
            formSuccess: true
          },
          () => {
            setTimeout(() => {
              this.setState({
                formSuccess: false
              });
            }, 2000);
          }
        );
      });
    } else {
      this.setState({
        formError: true
      });
    }
  };
  componentDidMount() {
    this.props.dispatch(getSiteData()).then(() => {
      const newFormData = populateFields(
        this.state.formData,
        this.props.site.siteData[0]
      );
      this.setState({
        formData: newFormData
      });
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={event => this.submitForm(event)}>
          <h1>Site info</h1>
          <FormField
            id={"address"}
            data={this.state.formData.address}
            change={element => this.updateForm(element)}
          />

          <FormField
            id={"hours"}
            data={this.state.formData.hours}
            change={element => this.updateForm(element)}
          />

          <FormField
            id={"phone"}
            data={this.state.formData.phone}
            change={element => this.updateForm(element)}
          />

          <FormField
            id={"email"}
            data={this.state.formData.email}
            change={element => this.updateForm(element)}
          />

          <div>
            {this.state.formSuccess ? (
              <div className="form_success">Success</div>
            ) : null}
            {this.state.formError ? (
              <div className="error_label">Please check your data</div>
            ) : null}
            <button onClick={event => this.submitForm(event)}>Update</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    site: state.site
  };
};

export default connect(mapStateToProps)(UpdateSiteInfo);
