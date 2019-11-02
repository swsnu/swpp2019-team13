import * as actionTypes from "./actionTypes";

export const getTagList_ = () => {
  return {
    type: actionTypes.GET_TAG_LIST
  };
};

export const getTagList = () => {
  return dispatch => {
    return new Promise(() => dispatch(getTagList_()));
  };
};
