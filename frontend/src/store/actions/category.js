import * as actionTypes from "./actionTypes";

export const getCategoryList_ = () => {
  return {
    type: actionTypes.GET_CATEGORY_LIST
  };
};

export const getCategoryList = () => {
  return dispatch => {
    dispatch(getCategoryList_());
  };
};
