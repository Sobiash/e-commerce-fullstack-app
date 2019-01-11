import { LOGIN_USER, REGISTER_USER } from "../actions/types";

const initialState = {};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    default:
      return state;
  }
};

export default UserReducer;
