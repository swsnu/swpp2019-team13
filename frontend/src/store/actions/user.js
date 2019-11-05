import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getUserList_ = users => {
  return { type: actionTypes.GET_USER_LIST, users: users };
};

export const getUserList = () => {
  return dispatch => {
    return axios
      .get("api/user/list/")
      .then(res => dispatch(getUserList_(res.data)));
  };
};

export const signIn_ = user => {
  return {
    type: actionTypes.SIGN_IN,
    loggedUser: user
  };
};

export const signIn = loginInfo => {
  return dispatch => {
    return axios
      .post("/api/user/signin/", loginInfo)
      .catch(e => "fail")
      .then(res => dispatch(signIn_(res.data)));
  };
};

export const signOut_ = () => {
  return {
    type: actionTypes.SIGN_OUT
  };
};

export const signOut = () => {
  return dispatch => {
    return axios.get("api/user/signout/").then(res => dispatch(signOut_()));
  };
};

export const signUp_ = user => {
  return {
    type: actionTypes.SIGN_UP,
    user: user
  };
};

export const signUp = user => {
  return dispatch => {
    return axios.post("/api/user/signup/", user).then(res => {
      dispatch(signUp_(user));
      return res.data;
    });
  };
};

export const getManagingClubs_ = clubs => {
  return {
    type: actionTypes.GET_MANAGING_CLUBS,
    clubs: clubs.map(item => item.fields)
  };
};

export const getManagingClubs = user => {
  return dispatch => {
    return axios
      .get("/api/user/" + user.id + "/club/manage/")
      .then(res => dispatch(getManagingClubs_(res.data)));
  };
};

export const getLikedClubs_ = clubs => {
  return {
    type: actionTypes.GET_LIKED_CLUBS,
    clubs: clubs.map(item => item.fields)
  };
};

export const getLikedClubs = user => {
  return dispatch => {
    return axios
      .get("/api/user/" + user.id + "/club/like/")
      .then(res => dispatch(getLikedClubs_(res.data)));
  };
};

export const getAppliedClubs_ = clubs => {
  return {
    type: actionTypes.GET_APPLIED_CLUBS,
    clubs: clubs.map(item => item.fields)
  };
};

export const getAppliedClubs = user => {
  return dispatch => {
    return axios
      .get("/api/user/" + user.id + "/club/apply/")
      .then(res => dispatch(getAppliedClubs_(res.data)));
  };
};

export const getManagingSomoims_ = somoims => {
  return {
    type: actionTypes.GET_MANAGING_SOMOIMS,
    somoims: somoims.map(item => item.fields)
  };
};

export const getManagingSomoims = user => {
  return dispatch => {
    return axios
      .get("/api/user/" + user.id + "/somoim/manage/")
      .then(res => dispatch(getManagingSomoims_(res.data)));
  };
};

export const getLikedSomoims_ = somoims => {
  return {
    type: actionTypes.GET_LIKED_SOMOIMS,
    somoims: somoims.map(item => item.fields)
  };
};

export const getLikedSomoims = user => {
  return dispatch => {
    return axios
      .get("/api/user/" + user.id + "/somoim/like/")
      .then(res => dispatch(getLikedSomoims_(res.data)));
  };
};

export const getJoinedSomoims_ = somoims => {
  return {
    type: actionTypes.GET_JOINED_SOMOIMS,
    somoims: somoims.map(item => item.fields)
  };
};

export const getJoinedSomoims = user => {
  return dispatch => {
    return axios
      .get("/api/user/" + user.id + "/somoim/apply/")
      .then(res => dispatch(getJoinedSomoims_(res.data)));
  };
};

export const addLikedClub_ = newLikedClub => {
  return {
    type: actionTypes.ADD_LIKED_CLUB,
    newLikedClub: newLikedClub
  };
};

export const addLikedClub = newLikedClub => {
  return dispatch => {
    dispatch(addLikedClub_(newLikedClub));
  };
};

export const addLikedSomoim_ = newLikedSomoim => {
  return {
    type: actionTypes.ADD_LIKED_SOMOIM,
    newLikedSomoim: newLikedSomoim
  };
};

export const addLikedSomoim = newLikedSomoim => {
  return dispatch => {
    dispatch(addLikedSomoim_(newLikedSomoim));
  };
};

export const addAppliedClub_ = newAppliedClub => {
  return {
    type: actionTypes.ADD_APPLIED_CLUB,
    newAppliedClub: newAppliedClub
  };
};

export const addAppliedClub = newAppliedClub => {
  return dispatch => {
    dispatch(addAppliedClub_(newAppliedClub));
  };
};

export const addJoinedSomoim_ = newJoinedSomoim => {
  return {
    type: actionTypes.ADD_JOINED_SOMOIM,
    newJoinedSomoim: newJoinedSomoim
  };
};

export const addJoinedSomoim = newJoinedSomoim => {
  return dispatch => {
    dispatch(addJoinedSomoim_(newJoinedSomoim));
  };
};
