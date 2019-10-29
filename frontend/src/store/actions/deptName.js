import * as actionTypes from "./actionTypes";

export const getDeptNameList_ = () => {
  return {
    type: actionTypes.GET_DEPT_LIST
  };
};

export const getDeptNameList = () => {
  return dispatch => {
    dispatch(getDeptNameList_());
  };
};
