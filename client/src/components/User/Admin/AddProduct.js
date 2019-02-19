import React, { Component } from "react";
import UserLayout from "../../Hoc/UserLayout";
import FormField from "../../utils/Form/FormField";
import ImageUpload from "../../utils/ImageUpload";
import {
  update,
  generateData,
  isFormValid,
  populateOptionFields,
  resetFields
} from "../../utils/Form/FormActions";
import { connect } from "react-redux";
import {
  getDresses,
  getColors,
  addProduct,
  clearProductInState
} from "../../../actions/products_actions";

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
      color: {
        element: "select",
        value: "",
        config: {
          lable: "Color Type",
          name: "color_input",
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
      },
      images: {
        value: [],
        validation: {
          required: false
        },
        valid: true,
        touched: false,
        validationMessage: "",
        showLabel: false
      }
    }
  };

  imagesHandler = images => {
    const newFormData = {
      ...this.state.formData
    };
    newFormData["images"].value = images;
    newFormData["images"].valid = true;
    this.setState({
      formData: newFormData
    });
  };

  resetFieldHandler = () => {
    const newFormData = resetFields(this.state.formData, "products");
    this.setState({
      formData: newFormData,
      formSuccess: true
    });
    setTimeout(() => {
      this.setState(
        {
          formSuccess: false
        },
        () => {
          this.props.dispatch(clearProductInState());
        }
      );
    }, 3000);
  };

  updateFields = newFormData => {
    this.setState({
      formData: newFormData
    });
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "products");
    this.setState({
      formError: false,
      formData: newFormData
    });
  };
  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "products");
    let formIsValid = isFormValid(this.state.formData, "products");

    if (formIsValid) {
      this.props.dispatch(addProduct(dataToSubmit)).then(() => {
        if (this.props.products.addProduct.success) {
          this.resetFieldHandler();
        } else {
          this.setState({ formError: true });
        }
      });
    } else {
      this.setState({
        formError: true
      });
    }
  };

  componentDidMount() {
    const formData = this.state.formData;
    this.props.dispatch(getDresses()).then(response => {
      const newFormData = populateOptionFields(
        formData,
        this.props.products.dresses,
        "dress"
      );
      this.updateFields(newFormData);
    });
    this.props.dispatch(getColors()).then(response => {
      const newFormData = populateOptionFields(
        formData,
        this.props.products.colors,
        "color"
      );
      this.updateFields(newFormData);
    });
  }

  render() {
    return (
      <UserLayout>
        <div>
          <h3>Add Products</h3>
          <form onSubmit={event => this.submitForm(event)}>
            <ImageUpload
              imagesHandler={images => this.imagesHandler(images)}
              reset={this.state.formSuccess}
            />
            <FormField
              id={"name"}
              data={this.state.formData.name}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={"description"}
              data={this.state.formData.description}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={"price"}
              data={this.state.formData.price}
              change={element => this.updateForm(element)}
            />
            <div className="form_devider" />
            <FormField
              id={"category"}
              data={this.state.formData.category}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={"dress"}
              data={this.state.formData.dress}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={"color"}
              data={this.state.formData.color}
              change={element => this.updateForm(element)}
            />

            <FormField
              id={"available"}
              data={this.state.formData.available}
              change={element => this.updateForm(element)}
            />
            <FormField
              id={"publish"}
              data={this.state.formData.publish}
              change={element => this.updateForm(element)}
            />
            <div className="form_devider" />
            <FormField
              id={"shipping"}
              data={this.state.formData.shipping}
              change={element => this.updateForm(element)}
            />
            {this.state.formSuccess ? (
              <div className="form_success">Product added successfully!</div>
            ) : null}
            {this.state.formError ? (
              <div className="error_label">Please check your data</div>
            ) : null}
            <div
              className="link_default"
              onClick={event => this.submitForm(event)}
            >
              Add product
            </div>
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
