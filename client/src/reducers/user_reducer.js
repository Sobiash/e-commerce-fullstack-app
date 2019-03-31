import isEmpty from "../components/validation/is_empty";
import {
  SET_CURRENT_USER,
  ADD_TO_CART,
  CART_ITEMS,
  REMOVE_CART_ITEMS,
  UPDATE_USER_DATA,
  CLEAR_UPDATE_USER_DATA,
  RESET_USER,
  ON_SUCCESS_BUY_USER
} from "../actions/types";

const initialState = { isAuthenticated: false, user: {} };

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
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
      return { ...state, requestReset: action.payload };
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
