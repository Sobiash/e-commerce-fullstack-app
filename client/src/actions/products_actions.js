import axios from "axios";
import { PRODUCT_SERVER, SHOP_SERVER } from "../components/utils/config";
import {
  GET_PRODUCTS_BY_ARRIVAL,
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS,
  GET_DRESSES,
  GET_PRODUCT_DETAIL,
  GET_ERRORS,
  GET_COLORS,
  DELETE_PRODUCT,
  ADD_PRODUCT,
  GET_CATEGORIES,
  CLEAR_CATEGORIES,
  CATEGORY_NAME,
  DRESS_NAME
} from "./types";

//?sortBy=sold&order=desc&limit=10

export const getProductsByArrival = () => dispatch => {
  axios
    .get(`${PRODUCT_SERVER}/filter_items?sortBy=createdAt&order=desc&limit=4`)
    .then(res =>
      dispatch({
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: res.data
      })
    );
};

export const getProductsBySell = () => dispatch => {
  axios
    .get(`${PRODUCT_SERVER}/filter_items?sortBy=sold&order=desc&limit=4`)
    .then(res =>
      dispatch({
        type: GET_PRODUCTS_BY_SELL,
        payload: res.data
      })
    );
};

export const getProducts = (skip, limit, filters = []) => dispatch => {
  const data = {
    limit,
    skip,
    filters
  };

  axios
    .post(`${SHOP_SERVER}/shop`, data)
    .then(res => {
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

export const addProduct = dataToSubmit => dispatch => {
  axios
    .post(`${PRODUCT_SERVER}/article`, dataToSubmit)
    .then(res =>
      dispatch({
        type: ADD_PRODUCT,
        payload: res.data
      })
    )
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

export const getProductDetail = id => dispatch => {
  axios
    .get(`${PRODUCT_SERVER}/articles_by_id/${id}`)
    .then(res => {
      dispatch({
        type: GET_PRODUCT_DETAIL,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

export const clearProductDetail = () => {
  return {
    type: GET_PRODUCT_DETAIL,
    payload: {}
  };
};

export const deleteProduct = id => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete(`${PRODUCT_SERVER}/articles_by_id/${id}`)
      .then(res => {
        dispatch({
          type: DELETE_PRODUCT,
          payload: id
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data
        });
      });
  } else {
    window.location.reload();
  }
};

export const addDressType = dataToSubmit => dispatch => {
  axios
    .post(`${PRODUCT_SERVER}/dress`, dataToSubmit)
    .then(response => response.data)
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

export const getDresses = () => dispatch => {
  axios.get(`${PRODUCT_SERVER}/dresses`).then(res =>
    dispatch({
      type: GET_DRESSES,
      payload: res.data
    })
  );
};

export const addColor = dataToSubmit => dispatch => {
  axios
    .post(`${PRODUCT_SERVER}/color`, dataToSubmit)
    .then(response => response.data)
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

export const getColors = () => dispatch => {
  axios.get(`${PRODUCT_SERVER}/colors`).then(res =>
    dispatch({
      type: GET_COLORS,
      payload: res.data
    })
  );
};

export const getCategories = () => dispatch => {
  axios.get(`${PRODUCT_SERVER}/categories`).then(res =>
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    })
  );
};
export const clearCategories = () => {
  return {
    type: CLEAR_CATEGORIES,
    payload: []
  };
};

export const editProduct = (id, dataToSubmit, history) => dispatch => {
  axios
    .post(`${PRODUCT_SERVER}/update-product?id=${id}`, dataToSubmit)
    .then(res => history.push("/shop"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const categoryName = category => dispatch => {
  axios.get(`${PRODUCT_SERVER}/categories/${category}`).then(res =>
    dispatch({
      type: CATEGORY_NAME,
      payload: res.data
    })
  );
};

export const dressName = dress => dispatch => {
  axios.get(`${PRODUCT_SERVER}/dresses/${dress}`).then(res =>
    dispatch({
      type: DRESS_NAME,
      payload: res.data
    })
  );
};
