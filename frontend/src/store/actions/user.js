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

export const getLikedClubs_ = clubs => {
  return {
    type: actionTypes.GET_LIKED_CLUBS,
    clubs: clubs
  };
};

export const getLikedClubs = user => {
  return dispatch => {
    return axios
      .get("/api/user/club/liked/" + user.id + "/")
      .then(res => dispatch(getLikedClubs_(res.data)));
  };
};
