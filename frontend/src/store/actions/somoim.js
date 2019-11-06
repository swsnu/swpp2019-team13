import * as actionTypes from "./actionTypes";
import axios from "axios";

export const postSomoim_ = somoim => {
  return {
    type: actionTypes.POST_SOMOIM,
    title: somoim.title,
    summary: somoim.summary,
    description: somoim.description,
    category: somoim.category,
    goalJoiner: somoim.goalJoiner,
    available_major: somoim.available_major,
    available_semester: somoim.available_semester,
    session_day: somoim.session_day
  };
};

export const postSomoim = somoim => {
  return dispatch => {
    return axios
      .post("api/somoim/list/", somoim)
      .then(res => dispatch(postSomoim_(somoim)));
  };
};

// TODO : implement actions
export const getSomoimList_ = somoims => {
  return {
    type: actionTypes.GET_SOMOIM_LIST,
    somoims: somoims
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
