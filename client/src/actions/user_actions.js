import axios from "axios";
import { USER_SERVER, PRODUCT_SERVER } from "../components/utils/config";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART,
  CART_ITEMS
} from "./types";

export const registerUser = dataToSubmit => {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then(response => response.data);

  return {
    type: REGISTER_USER,
    payload: request
  };
};

export const loginUser = dataToSubmit => {
  const request = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then(response => response.data);

  return {
    type: LOGIN_USER,
    payload: request
  };
};

export const auth = () => {
  const request = axios
    .get(`${USER_SERVER}/auth`)
    .then(response => response.data);
  return {
    type: AUTH_USER,
    payload: request
  };
};

export const logoutUser = () => {
  const request = axios
    .get(`${USER_SERVER}/logout`)
    .then(response => response.data);
  return {
    type: LOGOUT_USER,
    payload: request
  };
};

export const addToCart = _id => {
  const request = axios
    .post(`${USER_SERVER}/addToCart?productId=${_id}`)
    .then(response => response.data);
  return {
    type: ADD_TO_CART,
    payload: request
  };
};

export const cartItems = (cartItems, userCart) => {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles_by_id?id=${cartItems}&type=array`)
    .then(response => {
      userCart.forEach(item => {
        response.data.forEach((k, i) => {
          if (item.id === k._id) {
            response.data[i].quantity = item.quantity;
          }
        });
      });
      return response.data;
    });
  return {
    type: CART_ITEMS,
    payload: request
  };
};
