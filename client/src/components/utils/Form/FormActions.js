export const validate = (element, data = []) => {
  let ValidInput = [true, ""];

  if (element.validation.email) {
    const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      element.value
    );
    const message = `${!valid ? "Must be a valid email" : ""}`;
    ValidInput = !valid ? [valid, message] : ValidInput;
  }

  if (element.validation.confirm) {
    const valid =
      element.value.trim() === data[element.validation.confirm].value;
    const message = `${!valid ? "Password do not match" : ""}`;
    ValidInput = !valid ? [valid, message] : ValidInput;
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== "";
    const message = `${!valid ? "This field is required" : ""}`;
    ValidInput = !valid ? [valid, message] : ValidInput;
  }
  return ValidInput;
};

export const update = (element, data, formName) => {
  const newFormData = { ...data };
  const newElement = {
    ...newFormData[element.id]
  };
  newElement.value = element.event.target.value;
  if (element.blur) {
    let validData = validate(newElement, data);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
  }
  newElement.touched = element.blur;
  newFormData[element.id] = newElement;
  return newFormData;
};

export const generateData = (data, formName) => {
  let dataToSubmit = {};
  for (let key in data) {
    if (key !== "confirmPassword") {
      dataToSubmit[key] = data[key].value;
    }
  }
  return dataToSubmit;
};

export const isFormValid = (data, formName) => {
  let formIsValid = true;
  for (let key in data) {
    formIsValid = data[key].value && formIsValid;
  }
  return formIsValid;
};

export const populateOptionFields = (formData, arrayData = [], field) => {
  const newArray = [];
  const newFormData = { ...formData };

  arrayData.forEach(item => {
    newArray.push({ key: item._id, value: item.name });
  });
  newFormData[field].config.options = newArray;
  return newFormData;
};

export const resetFields = (formData, formName) => {
  const newFormData = { ...formData };
  for (let key in newFormData) {
    if (key === "images") {
      newFormData[key].value = [];
    } else {
      newFormData[key].value = "";
    }

    newFormData[key].valid = false;
    newFormData[key].touched = false;
    newFormData[key].validationMessage = "";
  }
  return newFormData;
};
