import axios from "axios";
import setAuthToken from "../components/utils/AuthToken";
import jwt_decode from "jwt-decode";
import { USER_SERVER, PRODUCT_SERVER } from "../components/utils/config";
import {
  SET_CURRENT_USER,
  ADD_TO_CART,
  CART_ITEMS,
  REMOVE_CART_ITEMS,
  UPDATE_USER_DATA,
  CLEAR_UPDATE_USER_DATA,
  RESET_USER,
  ON_SUCCESS_BUY_USER,
  GET_ERRORS
} from "./types";

export const registerUser = (dataToSubmit, history) => dispatch => {
  const registerUrl = `${USER_SERVER}/register`;
  axios
    .post(registerUrl, dataToSubmit)
    .then(res => history.push("/register_login"))
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

export const loginUser = dataToSubmit => dispatch => {
  const loginUrl = `${USER_SERVER}/login`;
  axios
    .post(loginUrl, dataToSubmit)
    .then(res => {
      const token = res.data.token;
      localStorage.setItem("jwtToken", token);

      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// export const auth = () => {
//   const request = axios
//     .get(`${USER_SERVER}/auth`)
//     .then(response => response.data);
//   return {
//     type: AUTH_USER,
//     payload: request
//   };
// };

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");

  setAuthToken(false);

  dispatch(setCurrentUser({}));
};

export const clearCurrentProfile = () => {};

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

export const updateUserData = dataToSubmit => {
  const request = axios
    .post(`${USER_SERVER}/update-profile`, dataToSubmit)
    .then(response => {
      return response.data;
    });

  return {
    type: UPDATE_USER_DATA,
    payload: request
  };
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
