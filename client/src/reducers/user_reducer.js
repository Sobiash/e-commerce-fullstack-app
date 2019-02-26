import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART,
  CART_ITEMS,
  REMOVE_CART_ITEMS,
  UPDATE_USER_DATA,
  CLEAR_UPDATE_USER_DATA,
  RESET_USER,
  ON_SUCCESS_BUY_USER
} from "../actions/types";

const initialState = {};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case LOGOUT_USER:
      return { ...state };
    case ADD_TO_CART:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload
        }
      };
    case CART_ITEMS:
      return {
        ...state,
        cartDetail: action.payload
      };
    case REMOVE_CART_ITEMS:
      return {
        ...state,
        cartDetail: action.payload.cartDetail,
        userData: {
          ...state.userData,
          cart: action.payload.cart
        }
      };
    case UPDATE_USER_DATA:
      return {
        ...state,
        updateUserData: action.payload
      };
    case CLEAR_UPDATE_USER_DATA:
      return {
        ...state,
        updateUserData: action.payload
      };
    case RESET_USER:
      return { ...state, resetUser: action.payload };
    case ON_SUCCESS_BUY_USER:
      return {
        ...state,
        successBuy: action.payload.success,
        userData: {
          ...state.userData,
          cart: action.payload.cart
        },
        cartDetail: action.payload.cartDetail
      };
    default:
      return state;
  }
};

export default UserReducer;
