import axios from "axios";
import { PRODUCT_SERVER } from "../components/utils/config";
import {
  GET_PRODUCTS_BY_ARRIVAL,
  GET_PRODUCTS_BY_SELL,
  GET_DRESSES,
  GET_PRODUCTS,
  ADD_PRODUCT,
  CLEAR_PRODUCT
} from "./types";

export const getProductsByArrival = () => {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
    .then(response => response.data);
  return {
    type: GET_PRODUCTS_BY_ARRIVAL,
    payload: request
  };
};

export const getProductsBySell = () => {
  //?sortBy=sold&order=desc&limit=10
  const request = axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
    .then(response => response.data);
  return {
    type: GET_PRODUCTS_BY_SELL,
    payload: request
  };
};

export const getDresses = () => {
  const request = axios
    .get(`${PRODUCT_SERVER}/dresses`)
    .then(response => response.data);

  return {
    type: GET_DRESSES,
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
