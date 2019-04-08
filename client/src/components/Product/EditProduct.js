import React, { Component } from "react";
import UserLayout from "../Hoc/UserLayout";
import { getUserProfile } from "../../actions/user_actions";
import FormField from "../utils/Form/FormField";
import ImageUpload from "../utils/ImageUpload";
import {
  update,
  generateData,
  isFormValid,
  resetFields,
  populateOptionFields,
  populateFields
} from "../utils/Form/FormActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  editProduct,
  getDresses,
  getColors,
  getProducts
} from "../../actions/products_actions";

class EditProduct extends Component {
  state = {
    formError: false,
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "Enter name"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      description: {
        element: "input",
        value: "",
        config: {
          name: "description_input",
          type: "text",
          placeholder: "Enter description"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      price: {
        element: "input",
        value: "",
        config: {
          name: "price_input",
          type: "text",
          placeholder: "Enter price"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      category: {
        element: "input",
        value: "",
        config: {
          name: "category_input",
          type: "text",
          placeholder: "Enter category"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      dress: {
        element: "input",
        value: "",
        config: {
          name: "dress_input",
          type: "text",
          placeholder: "Enter dress"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      color: {
        element: "input",
        value: "",
        config: {
          name: "color_input",
          type: "text",
          placeholder: "Enter color"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      shipping: {
        element: "input",
        value: "",
        config: {
          name: "shipping_input",
          type: "text",
          placeholder: "Enter shipping"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      available: {
        element: "input",
        value: "",
        config: {
          name: "available_input",
          type: "text",
          placeholder: "Enter available"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      publish: {
        element: "input",
        value: "",
        config: {
          name: "publish_input",
          type: "text",
          placeholder: "Enter publish"
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

  componentDidMount() {
    this.props.getUserProfile();
    this.props.getProducts();
    this.props.getDresses();
    this.props.getColors();
    const product = this.props.products.articles;
    console.log(product);
    // if (this.props.match.params.id) {
    //   const id = this.props.match.params.id;
    //   const product = this.props.products.articles;
    //   console.log(product);

    // const newFormData = populateFields(this.state.formData, products);
    // this.setState({
    //   formData: newFormData
    // });

    // console.log(this.state.formData);
    // }
  }

  // updateForm = element => {
  //   const newFormData = update(element, this.state.formData, "update_product");
  //   this.setState({
  //     formData: newFormData
  //   });
  // };
  // submitForm = event => {
  //   event.preventDefault();

  //   let dataToSubmit = generateData(this.state.formData, "update_product");
  //   let formIsValid = isFormValid(this.state.formData, "update_product");
  //   const id = this.props.match.params.id;
  //   if (formIsValid) {
  //     // this.props.editProduct(id, dataToSubmit, this.props.history);
  //     console.log(dataToSubmit);
  //   }
  // };

  render() {
    const product = this.props.products.articles;
    // console.log(product.length);
    return (
      <UserLayout>
        <div>
          {/* <h3>Edit Products</h3>
          <form onSubmit={event => this.submitForm(event)}>
            {this.state.formError ? (
              <div className="error_label">{this.state.formError.error}</div>
            ) : null} */}
          {/* <ImageUpload imagesHandler={images => this.imagesHandler(images)} /> */}
          {/* <FormField
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
            <div
              className="link_default"
              onClick={event => this.submitForm(event)}
            >
              Edit product
            </div>
          </form> */}
        </div>
      </UserLayout>
    );
  }
}

EditProduct.propTypes = {
  editProduct: PropTypes.func.isRequired,
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
  { editProduct, getUserProfile, getProducts, getDresses, getColors }
)(EditProduct);
