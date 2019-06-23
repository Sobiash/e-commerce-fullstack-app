import React, { Component } from "react";
import UserLayout from "../../Hoc/UserLayout";
import { getUserProfile } from "../../../actions/user_actions";
import FormField from "../../utils/Form/FormField";
import ImageUpload from "../../utils/ImageUpload";
import {
  update,
  generateData,
  isFormValid,
  resetFields,
  populateOptionFields
} from "../../utils/Form/FormActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addProduct,
  getDresses,
  getCategories,
  getColors
} from "../../../actions/products_actions";

class AddProduct extends Component {
  state = {
    formError: false,
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
          lable: "Description",
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
        element: "input",
        value: "",
        config: {
          lable: "Colors",
          name: "color_input",
          type: "text",
          placeholder: "Enter color"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showLabel: true
      },
      size: {
        element: "input",
        value: "",
        config: {
          lable: "Size",
          name: "size_input",
          type: "text",
          placeholder: "Enter size"
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
        element: "input",
        value: "",
        config: {
          lable: "Shipping price",
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

  componentDidMount() {
    this.props.getUserProfile();
    this.props.getDresses();
    this.props.getCategories();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors !== this.props.errors) {
      this.setState({ formError: nextProps.errors });
    }
    const formData = this.state.formData;
    if (nextProps.products.dresses !== this.props.products.dresses) {
      const newFormData = populateOptionFields(
        formData,
        nextProps.products.dresses,
        "dress"
      );
      this.updateFields(newFormData);
    }
    if (nextProps.products.categories !== this.props.products.categories) {
      const newFormData = populateOptionFields(
        formData,
        nextProps.products.categories,
        "category"
      );
      this.updateFields(newFormData);
    }
  }

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
    setTimeout(() => {
      this.setState({
        formData: newFormData
      });
    }, 500);
  };

  updateFields = newFormData => {
    this.setState({
      formData: newFormData
    });
  };

  updateForm = element => {
    const newFormData = update(element, this.state.formData, "products");
    this.setState({
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, "products");
    let formIsValid = isFormValid(this.state.formData, "products");

    if (formIsValid) {
      this.props.addProduct(dataToSubmit);
      setTimeout(() => {
        this.resetFieldHandler();
      }, 500);
    }
  };

  render() {
    return (
      <UserLayout>
        <div>
          <h3>Add Products</h3>
          <form onSubmit={event => this.submitForm(event)}>
            {this.state.formError && (
              <div className="error_label">{this.state.formError.error}</div>
            )}
            <ImageUpload imagesHandler={images => this.imagesHandler(images)} />
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
              id={"size"}
              data={this.state.formData.size}
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

AddProduct.propTypes = {
  addProduct: PropTypes.func.isRequired,
  getDresses: PropTypes.func.isRequired,
  getColors: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    products: state.products,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { addProduct, getUserProfile, getDresses, getColors, getCategories }
)(AddProduct);
