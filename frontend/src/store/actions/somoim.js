import * as actionTypes from "./actionTypes";
import axios from "axios";

export const postSomoim_ = sm => {
  return {
    type: actionTypes.POST_SOMOIM,
    title: sm.title,
    summary: sm.summary,
    description: sm.description,
    selected_dept: sm.selected_dept,
    available_sem: sm.available_sem,
    goalJoiner: sm.goalJoiner
  };
};

export const postSomoim = at => {
  return dispatch => {
    return axios
      .post("api/somoim/list/", at)
      .then(res => dispatch(postSomoim_(at)));
  };
};

// TODO : implement actions
export const getSomoimList_ = somoims => {
  return {
    type: actionTypes.GET_SOMOIM_LIST,
    somoims: somoims.map(item => {
      return { ...item.fields, id: item.pk };
    })
  };
};

export const getSomoimList = () => {
  return dispatch => {
    return axios
      .get("api/somoim/list/")
      .then(res => dispatch(getSomoimList_(res.data)));
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
    return axios
      .put("/api/somoim/edit/" + newLikedSomoim.id + "/", newLikedSomoim)
      .then(res => dispatch(increaseLikesOfSomoim_(newLikedSomoim)));
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
    return axios
      .put("/api/somoim/edit/" + newJoinedSomoim.id + "/", newJoinedSomoim)
      .then(res => dispatch(increaseNumOfCurrentJoiner_(newJoinedSomoim)));
  };
};
