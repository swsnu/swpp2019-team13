import * as actionTypes from "./actionTypes";

export const postSomoim_ = sm => {
  return {
    type: actionTypes.POST_SOMOIM,
    id: sm.id,
    title: sm.title,
    description: sm.description,
    goal_number: sm.goal_number,
    selected_dept: sm.selected_dept,
    available_sem: sm.available_sem
  };
};

export const postSomoim = sm => {
  return dispatch => {
    dispatch(postSomoim_(sm));
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
