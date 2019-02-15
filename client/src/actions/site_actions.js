import axios from "axios";
import { SITE_SERVER } from "../components/utils/config";
import { GET_SITE_DATA, UPDATE_SITE_DATA } from "./types";

export const getSiteData = () => {
  const request = axios
    .get(`${SITE_SERVER}/site_data`)
    .then(response => response.data);

  return {
    type: GET_SITE_DATA,
    payload: request
  };
};

export const updateSiteData = dataToSubmit => {
  const request = axios
    .post(`${SITE_SERVER}/site_data`, dataToSubmit)
    .then(response => response.data);

  return {
    type: UPDATE_SITE_DATA,
    payload: request
  };
};
