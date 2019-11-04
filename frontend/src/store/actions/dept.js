import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getDeptList_ = depts => {
  return { type: actionTypes.GET_DEPT_LIST, depts: depts };
};

export const getDeptList = () => {
  return dispatch => {
    return axios
      .get("api/dept/list/")
      .then(res => dispatch(getDeptList_(res.data)));
  };
};
