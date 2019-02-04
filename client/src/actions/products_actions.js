import axios from "axios";
import { PRODUCT_SERVER } from "../components/utils/config";
import { GET_PRODUCTS_BY_ARRIVAL, GET_PRODUCTS_BY_SELL } from "./types";

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
