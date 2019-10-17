import * as actionTypes from "./actionTypes";

export const postSomoim_ = at => {
  return {
    type: actionTypes.POST_SOMOIM,
    id: at.id,
    title: at.title,
    content: at.content,
    tag: at.tag
  };
};

export const postSomoim = at => {
  return dispatch => {
    dispatch(postSomoim_(at));
  };
};

// TODO : implement actions
export const getSomoimList_ = () => {
  return {
    type: actionTypes.GET_SOMOIM_LIST
  };
};

export const getSomoimList = () => {
  return dispatch => {
    dispatch(getSomoimList_());
  };
};

export const getSomoimByID_ = id => {
  return {
    type: actionTypes.GET_SOMOIM_BY_ID
  };
};

export const getSomoimByID = id => {
  return dispatch => {
    dispatch(getSomoimByID_(id));
  };
};
