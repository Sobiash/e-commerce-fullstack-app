import axios from "axios";
import { PRODUCT_SERVER } from "../components/utils/config";
import {
  GET_PRODUCTS_BY_ARRIVAL,
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL
} from "./types";

//?sortBy=sold&order=desc&limit=10

export const getProductsByArrival = () => {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then(response => response.data);
  return {
    type: GET_PRODUCTS_BY_ARRIVAL,
    payload: request
  };
};

export const getProductsBySell = () => {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
    .then(response => response.data);
  return {
    type: GET_PRODUCTS_BY_SELL,
    payload: request
  };
};

export const getProducts = (skip, limit, filters = [], previousState = []) => {
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

  return {
    type: GET_PRODUCTS,
    payload: request
  };
};

export const addProduct = dataToSubmit => {
  const request = axios
    .post(`${PRODUCT_SERVER}/article`, dataToSubmit)
    .then(response => response.data);

  return {
    type: ADD_PRODUCT,
    payload: request
  };
};
export const clearProductInState = () => {
  return {
    type: CLEAR_PRODUCT,
    payload: ""
  };
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
