import axios from "axios";

import { USER_SERVER } from "../components/utils/config";
import {
  ADD_TO_CART,
  GET_CART_DETAIL,
  CLEAR_UPDATE_USER_DATA,
  RESET_USER,
  ON_SUCCESS_BUY_USER,
  GET_USER_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  CREATE_CART,
  GET_ERRORS
} from "./types";

export const getUserProfile = () => {
  return dispatch => {
    dispatch(setProfileLoading());
    return axios
      .get(`${USER_SERVER}/dashboard`)
      .then(res =>
        dispatch({
          type: GET_USER_PROFILE,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };
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

export const createCart = user => dispatch => {
  let data = {
    user
  };
  axios.post(`${USER_SERVER}/create-cart`, data).then(res =>
    dispatch({
      type: CREATE_CART,
      payload: res.data
    })
  );
};

export const addToCart = (
  id,
  name,
  price,
  images,
  selectedSize,
  selectedColor
) => dispatch => {
  let data = {
    name,
    price,
    images,
    selectedSize,
    selectedColor
  };
  axios.post(`${USER_SERVER}/add-to-cart/${id}`, data).then(res =>
    dispatch({
      type: ADD_TO_CART,
      payload: res.data
    })
  );
};

export const getCartDetail = () => dispatch => {
  axios.get(`${USER_SERVER}/get-cart`).then(res =>
    dispatch({
      type: GET_CART_DETAIL,
      payload: res.data
    })
  );
};

export const removeCartItems = (id, size, color) => dispatch => {
  let data = {
    id,
    size,
    color
  };
  axios
    .post(`${USER_SERVER}/remove-item/${id}`, data)
    .then(res =>
      dispatch({
        type: GET_CART_DETAIL,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const increaseItem = (id, size, color) => dispatch => {
  let data = {
    id,
    size,
    color
  };
  axios
    .post(`${USER_SERVER}/increase/${id}`, data)
    .then(res =>
      dispatch({
        type: GET_CART_DETAIL,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const decreaseItem = (id, size, color) => dispatch => {
  let data = {
    id,
    size,
    color
  };
  axios
    .post(`${USER_SERVER}/decrease/${id}`, data)
    .then(res =>
      dispatch({
        type: GET_CART_DETAIL,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
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

export const requestReset = dataToSubmit => dispatch => {
  axios.post(`${USER_SERVER}/reset-user`, dataToSubmit).then(res =>
    dispatch({
      type: RESET_USER,
      payload: res.data
    })
  );
};
export const onSuccessBuy = data => dispatch => {
  axios.post(`${USER_SERVER}/success-buy`, data).then(res =>
    dispatch({
      type: ON_SUCCESS_BUY_USER,
      payload: res.data
    })
  );
};
