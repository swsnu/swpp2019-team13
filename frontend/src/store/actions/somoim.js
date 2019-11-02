import * as actionTypes from "./actionTypes";

export const postSomoim_ = sm => {
  return {
    type: actionTypes.POST_SOMOIM,
    title: sm.title,
    summary: sm.summary,
    description: sm.description,
    selected_dept: sm.selected_dept,
    available_sem: sm.available_sem,
    goalJoiner: sm.goal_number
  };
};

export const postSomoim = sm => {
  return dispatch => {
    return new Promise(() => dispatch(postSomoim_(sm)));
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
    return new Promise(() => dispatch(getSomoimList_()));
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
