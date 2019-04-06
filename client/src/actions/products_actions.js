import axios from "axios";
import { PRODUCT_SERVER } from "../components/utils/config";
import {
  GET_PRODUCTS_BY_ARRIVAL,
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS,
  LOAD_MORE_PRODUCTS,
  GET_DRESSES,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL,
  GET_ERRORS,
  GET_COLORS
} from "./types";

//?sortBy=sold&order=desc&limit=10

export const getProductsByArrival = () => dispatch => {
  axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then(res =>
      dispatch({
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: res.data
      })
    );
};

export const getProductsBySell = () => dispatch => {
  axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
    .then(res =>
      dispatch({
        type: GET_PRODUCTS_BY_SELL,
        payload: res.data
      })
    );
};

export const getProducts = (
  skip,
  limit,
  filters = [],
  previousState = []
) => dispatch => {
  const data = {
    limit,
    skip,
    filters
  };

  const request = axios.post(`${PRODUCT_SERVER}/shop`, data).then(response => {
    let newState = [...previousState, ...response.data.articles];
    return {
      size: response.data.size,
      articles: newState
    };
  });
  dispatch({
    type: GET_PRODUCTS,
    payload: request
  });
};

export const addProduct = dataToSubmit => dispatch => {
  axios
    .post(`${PRODUCT_SERVER}/article`, dataToSubmit)
    .then(res => res.data)
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

export const getProductDetail = id => {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`)
    .then(response => {
      return response.data[0];
    });
  return {
    type: GET_PRODUCT_DETAIL,
    payload: request
  };
};
export const clearProductDetail = () => {
  return {
    type: CLEAR_PRODUCT_DETAIL,
    payload: ""
  };
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

// export const getDresses = () => dispatch => {
//   axios.get(`${PRODUCT_SERVER}/dresses`).then(response => response.data);
// };

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
