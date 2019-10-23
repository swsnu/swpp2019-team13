import * as actionTypes from "./actionTypes";

export const getDeptNameList_ = () => {
  return {
    type: actionTypes.GET_DEPTNAME_LIST
  };
};

export const getDeptNameList = () => {
  return dispatch => {
    dispatch(getDeptNameList_());
  };
};
