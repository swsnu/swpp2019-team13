import * as actionTypes from "./actionTypes";
import axios from "axios";

export const signIn_ = user => {
  return {
    type: actionTypes.SIGN_IN,
    loggedUser: user
  };
};

export const signIn = user => {
  return dispatch => {
    return new Promise(() => dispatch(signIn_(user)));
  };
};

export const signOut_ = () => {
  return {
    type: actionTypes.SIGN_OUT
  };
};

export const signOut = () => {
  return dispatch => {
    return new Promise(() => dispatch(signOut_()));
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
    return new Promise(() => dispatch(signUp_(user)));
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
