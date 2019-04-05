import axios from "axios";
import setAuthToken from "../components/utils/AuthToken";

import { USER_SERVER, PRODUCT_SERVER } from "../components/utils/config";
import {
  ADD_TO_CART,
  CART_ITEMS,
  REMOVE_CART_ITEMS,
  UPDATE_USER_DATA,
  CLEAR_UPDATE_USER_DATA,
  RESET_USER,
  ON_SUCCESS_BUY_USER,
  GET_USER_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_ERRORS
} from "./types";

export const getUserProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get(`${USER_SERVER}/dashboard`).then(res =>
    dispatch({
      type: GET_USER_PROFILE,
      payload: res.data
    })
  );
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

export const deleteProfile = () => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    localStorage.removeItem("jwtToken");
    axios

      .delete(`${USER_SERVER}`)
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

export const addToCart = _id => {
  const request = axios
    .post(`${USER_SERVER}/add-to-cart?productId=${_id}`)
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

export const removeCartItems = id => {
  const request = axios
    .get(`${USER_SERVER}/remove-from-cart?_id=${id}`)
    .then(response => {
      response.data.cart.forEach(item => {
        response.data.cartDetail.forEach((k, i) => {
          if (item.id === k._id) {
            response.data.cartDetail[i].quantity = item.quantity;
          }
        });
      });
      return response.data;
    });
  return {
    type: REMOVE_CART_ITEMS,
    payload: request
  };
};

export const updateUserData = (dataToSubmit, history) => dispatch => {
  axios

    .post(`${USER_SERVER}/update-profile`, dataToSubmit)
    .then(res => history.push("/user/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const clearUpdateUserData = () => {
  return {
    type: CLEAR_UPDATE_USER_DATA,
    payload: ""
  };
};

export const requestReset = dataToSubmit => {
  const request = axios
    .post(`${USER_SERVER}/reset-user`, dataToSubmit)
    .then(response => response.data);
  return {
    type: RESET_USER,
    payload: request
  };
};
export const onSuccessBuy = data => {
  const request = axios
    .post(`${USER_SERVER}/success-buy`, data)
    .then(response => response.data);
  return {
    type: ON_SUCCESS_BUY_USER,
    payload: request
  };
};
