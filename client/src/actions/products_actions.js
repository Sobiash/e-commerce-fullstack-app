import axios from "axios";
import { PRODUCT_SERVER } from "../components/utils/config";
import {
  GET_PRODUCTS_BY_ARRIVAL,
  GET_PRODUCTS_BY_SELL,
  GET_COLORS,
  GET_DRESSES,
  GET_PRODUCTS
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

export const getColors = () => {
  const request = axios
    .get(`${PRODUCT_SERVER}/colors`)
    .then(response => response.data);
  return {
    type: GET_COLORS,
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
    return {
      size: response.data.size,
      articles: response.data.articles
    };
  });
  return {
    type: GET_PRODUCTS,
    payload: request
  };
};
