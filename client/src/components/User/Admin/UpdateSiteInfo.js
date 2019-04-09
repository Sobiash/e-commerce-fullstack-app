import React, { Component } from "react";
import FormField from "../../utils/Form/FormField";
import {
  update,
  generateData,
  isFormValid,
  populateFields
} from "../../utils/Form/FormActions";

import PropTypes from "prop-types";
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
      this.props.updateSiteData(dataToSubmit).then(() => {
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
    this.props.getSiteData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ formError: nextProps.errors });
    }
    if (nextProps.site.siteData) {
      const siteData = nextProps.site.siteData;

      const newFormData = populateFields(this.state.formData, siteData);
      this.setState({
        formData: newFormData
      });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={event => this.submitForm(event)}>
          <h3>Site info</h3>
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
              <div className="error_label">
                {this.state.formError.error
                  ? "please check if all fields are filled properly!"
                  : null}
              </div>
            ) : null}
            <div
              className="link_default"
              onClick={event => this.submitForm(event)}
            >
              Update
            </div>
          </div>
        </form>
      </div>
    );
  }
}

UpdateSiteInfo.propTypes = {
  site: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getSiteData: PropTypes.func.isRequired,
  updateSiteData: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    site: state.site,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { getSiteData, updateSiteData }
)(UpdateSiteInfo);
