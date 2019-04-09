import axios from "axios";
import { SITE_SERVER } from "../components/utils/config";
import { GET_SITE_DATA, UPDATE_SITE_DATA, GET_ERRORS } from "./types";

export const getSiteData = () => dispatch => {
  axios
    .get(`${SITE_SERVER}/site-data`)
    .then(res =>
      dispatch({
        type: GET_SITE_DATA,
        payload: res.data
      })
    )
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: null
      });
    });
};

export const updateSiteData = dataToSubmit => dispatch => {
  axios
    .post(`${SITE_SERVER}/site-data`, dataToSubmit)
    .then(res =>
      dispatch({
        type: UPDATE_SITE_DATA,
        payload: res.data
      })
    )
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};
