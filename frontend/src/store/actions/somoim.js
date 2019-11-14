import * as actionTypes from "./actionTypes";
import axios from "axios";

export const postSomoim_ = somoim => {
  return {
    ...somoim,
    type: actionTypes.POST_SOMOIM
  };
};

export const postSomoim = somoim => {
  return dispatch => {
    return axios.post("/api/somoim/list/", somoim).then(res => {
      dispatch(postSomoim_(res.data));
      return res.data;
    });
  };
};

export const getSomoimList_ = somoims => {
  return {
    type: actionTypes.GET_SOMOIM_LIST,
    somoims: somoims
  };
};

export const getSomoimList = () => {
  return dispatch => {
    return axios
      .get("/api/somoim/list/")
      .then(res => dispatch(getSomoimList_(res.data)));
  };
};

export const getSomoimByID_ = id => {
  return {
    type: actionTypes.GET_SOMOIM_BY_ID
  };
};

export const getSomoimByID = id => {
  return dispatch => {
    return new Promise(() => dispatch(getSomoimByID_(id)));
  };
};
