import React, { Component } from "react";
import UserLayout from "../../Hoc/User";
import FormField from "../../utils/Form/FormField";
import {
  update,
  generateData,
  isFormValid
} from "../../utils/Form/FormActions";
import { connect } from "react-redux";
import { getDresses } from "../../../actions/products_actions";

class AddProduct extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          lable: "Product name",
          name: "name_input",
          type: "text",
          placeholder: "Enter product name"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      description: {
        element: "textarea",
        value: "",
        config: {
          lable: "Product description",
          name: "description_input",
          type: "text",
          placeholder: "Enter description"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      price: {
        element: "input",
        value: "",
        config: {
          lable: "Product price",
          name: "price_input",
          type: "number",
          placeholder: "Enter price"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      dress: {
        element: "select",
        value: "",
        config: {
          lable: "Dress Type",
          name: "dress_input",
          options: []
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      shipping: {
        element: "select",
        value: "",
        config: {
          lable: "Shipping",
          name: "shipping_input",
          options: [{ key: true, value: "Yes" }, { key: false, value: "No" }]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      available: {
        element: "select",
        value: "",
        config: {
          lable: "Available in stock",
          name: "available_input",
          options: [{ key: true, value: "Yes" }, { key: false, value: "No" }]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      publish: {
        element: "select",
        value: "",
        config: {
          lable: "Publish",
          name: "publish_input",
          options: [
            { key: true, value: "Public" },
            { key: false, value: "Hidden" }
          ]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      category: {
        element: "select",
        value: "",
        config: {
          lable: "Category",
          name: "category_input",
          options: [
            { key: 1, value: "Men" },
            { key: 2, value: "Women" },
            { key: 3, value: "Child" }
          ]
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

  render() {
    return (
      <UserLayout>
        <div>
          <h1>Add Products</h1>
          <form onSubmit={event => this.submitForm(event)}>
            <FormField
              id={"name"}
              data={this.state.formData.name}
              change={element => this.updateForm(element)}
            />
          </form>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(AddProduct);
