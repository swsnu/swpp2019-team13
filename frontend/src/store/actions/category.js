import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getCategoryList_ = categories => {
  return {
    type: actionTypes.GET_CATEGORY_LIST,
    categories: categories
  };
};

export const getCategoryList = () => {
  return dispatch => {
    return axios
      .get("api/category/list/")
      .then(res => dispatch(getCategoryList_(res.data)));
  };
};
