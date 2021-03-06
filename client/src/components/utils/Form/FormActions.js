export const validate = (element, data = []) => {
  let ValidInput = [true, ""];

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
    dataToSubmit[key] = data[key].value;
  }
  return dataToSubmit;
};

export const isFormValid = data => {
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

export const populateFields = (formData, field) => {
  for (let key in formData) {
    if (key !== "password") {
      formData[key].value = field[key];
      formData[key].valid = true;
      formData[key].touched = true;
      formData[key].validationMessage = true;
    }
  }
  return formData;
};
