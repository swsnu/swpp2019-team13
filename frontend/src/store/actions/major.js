import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getMajorList_ = majors => {
  return { type: actionTypes.GET_MAJOR_LIST, majors: majors };
};

export const getMajorList = () => {
  return dispatch => {
    return axios
      .get("/api/major/list/")
      .then(res => dispatch(getMajorList_(res.data)));
  };
};
