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

export const increaseLikesOfSomoim_ = newLikedSomoim => {
  return {
    type: actionTypes.INCREASE_LIKES_OF_SOMOIM,
    newLikedSomoim: newLikedSomoim
  };
};

export const increaseLikesOfSomoim = newLikedSomoim => {
  return dispatch => {
    dispatch(increaseLikesOfSomoim_(newLikedSomoim));
  };
};

export const increaseNumOfCurrentJoiner_ = newJoinedSomoim => {
  return {
    type: actionTypes.INCREASE_NUM_OF_CURRENT_JOINER,
    newJoinedSomoim: newJoinedSomoim
  };
};

export const increaseNumOfCurrentJoiner = newJoinedSomoim => {
  return dispatch => {
    dispatch(increaseNumOfCurrentJoiner_(newJoinedSomoim));
  };
};
