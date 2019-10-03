import {
  ADD_TO_CART,
  CREATE_CART,
  GET_CART_DETAIL,
  CLEAR_UPDATE_USER_DATA,
  RESET_USER,
  ON_SUCCESS_BUY_USER,
  GET_USER_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE
} from "../actions/types";

const initialState = {
  cart: [],
  cartDetail: [],
  profile: {
    history: []
  },
  loading: false
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_USER_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: {}
      };
    case CREATE_CART:
      return {
        ...state,
        createCart: action.payload
      };
    case ADD_TO_CART:
      return {
        ...state,
        cartDetail: action.payload
      };
    case GET_CART_DETAIL:
      return {
        ...state,
        cartDetail: action.payload
      };
    case CLEAR_UPDATE_USER_DATA:
      return {
        ...state,
        updateUserData: action.payload
      };
    case RESET_USER:
      return { ...state, requestReset: action.payload.success };
    case ON_SUCCESS_BUY_USER:
      return {
        ...state,
        successBuy: action.payload.success,
        cart: [],
        cartDetail: []
      };
    default:
      return state;
  }
};

export default UserReducer;
