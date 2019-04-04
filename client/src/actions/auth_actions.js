import axios from "axios";
import setAuthToken from "../components/utils/AuthToken";
import jwt_decode from "jwt-decode";
import { USER_SERVER } from "../components/utils/config";
import { SET_CURRENT_USER, GET_ERRORS } from "./types";

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

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");

  setAuthToken(false);

  dispatch(setCurrentUser({}));
};
