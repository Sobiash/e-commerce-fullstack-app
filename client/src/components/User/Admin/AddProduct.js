import React, { Component } from "react";
import UserLayout from "../../Hoc/UserLayout";
import { getUserProfile } from "../../../actions/user_actions";
import FormField from "../../utils/Form/FormField";
import ImageUpload from "../../UI/ImageUpload";
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
        element: "input",
        value: "",
        config: {
          lable: "Dress",
          name: "dress_input",
          type: "text",
          placeholder: "Enter dress"
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
      category: {
        element: "input",
        value: "",
        config: {
          lable: "Category",
          name: "category_input",
          type: "text",
          placeholder: "Enter category"
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
    const { getUserProfile } = this.props;
    getUserProfile();
    getDresses();
    getCategories();
  }

  componentWillReceiveProps(nextProps) {
    const { errors, products } = this.props;
    // const { dresses, categories } = products;
    const { formData } = this.state;
    const { updateFields } = this;

    if (nextProps.errors !== errors) {
      this.setState({ formError: nextProps.errors });
    }

    // if (nextProps.products.dresses !== dresses) {
    //   const newFormData = populateOptionFields(
    //     formData,
    //     nextProps.products.dresses,
    //     "dress"
    //   );
    //   updateFields(newFormData);
    // }
    // if (nextProps.products.categories !== categories) {
    //   const newFormData = populateOptionFields(
    //     formData,
    //     nextProps.products.categories,
    //     "category"
    //   );
    //   updateFields(newFormData);
    // }
  }

  imagesHandler = images => {
    const { formData } = this.state;

    const newFormData = {
      ...formData
    };
    newFormData["images"].value = images;
    newFormData["images"].valid = true;
    this.setState({
      formData: newFormData
    });
  };

  resetFieldHandler = () => {
    const { formData } = this.state;

    const newFormData = resetFields(formData, "products");
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
    const { formData } = this.state;

    const newFormData = update(element, formData, "products");
    this.setState({
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();

    const { formData } = this.state;
    const { addProduct } = this.props;
    const { resetFieldHandler } = this;

    let dataToSubmit = generateData(formData, "products");
    let formIsValid = isFormValid(formData, "products");

    if (formIsValid) {
      addProduct(dataToSubmit);
      setTimeout(() => {
        resetFieldHandler();
      }, 500);
    }
  };

  render() {
    const { formError, formData } = this.state;
    const { updateForm, submitForm, imagesHandler } = this;
    const {
      name,
      description,
      price,
      category,
      dress,
      color,
      size,
      available,
      publish,
      shipping
    } = formData;

    return (
      <UserLayout>
        <div>
          <h3>Add Products</h3>
          <form onSubmit={event => submitForm(event)}>
            {formError && <div className="error_label">{formError.error}</div>}
            <ImageUpload imagesHandler={images => imagesHandler(images)} />
            <FormField
              id={"name"}
              data={name}
              change={element => updateForm(element)}
            />
            <FormField
              id={"description"}
              data={description}
              change={element => updateForm(element)}
            />
            <FormField
              id={"price"}
              data={price}
              change={element => updateForm(element)}
            />
            <div className="form_devider" />
            <FormField
              id={"category"}
              data={category}
              change={element => updateForm(element)}
            />
            <FormField
              id={"dress"}
              data={dress}
              change={element => updateForm(element)}
            />
            <FormField
              id={"color"}
              data={color}
              change={element => updateForm(element)}
            />
            <FormField
              id={"size"}
              data={size}
              change={element => updateForm(element)}
            />

            <FormField
              id={"available"}
              data={available}
              change={element => updateForm(element)}
            />
            <FormField
              id={"publish"}
              data={publish}
              change={element => updateForm(element)}
            />
            <div className="form_devider" />
            <FormField
              id={"shipping"}
              data={shipping}
              change={element => updateForm(element)}
            />
            <div className="link_default" onClick={event => submitForm(event)}>
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
