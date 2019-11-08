import * as actionTypes from "./actionTypes";
import axios from "axios";
import { getClubList } from "./club";
import { getSomoimList } from "./somoim";
import { push } from "connected-react-router";

// not used
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
    return axios
      .get("api/user/signout/")
      .then(res => dispatch(signOut_()))
      .then(() => dispatch(push("/club")));
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

export const getLoginInfo_ = user => {
  return {
    type: actionTypes.GET_LOGIN_INFO,
    loggedUser: user
  };
};

export const getLoginInfo = loginInfo => {
  return dispatch => {
    return axios
      .get("/api/user/logininfo/")
      .then(res => dispatch(getLoginInfo_(res.data)));
  };
};

export const putUserInformation_ = user => {
  return {
    type: actionTypes.PUT_USER_INFORMATION,
    loggedUser: user
  };
};

export const putUserInformation = userInfo => {
  return dispatch => {
    return axios
      .put("/api/user/information/", userInfo)
      .then(res => dispatch(putUserInformation_(res.data)));
  };
};

export const getManagingClubs_ = clubs => {
  return {
    type: actionTypes.GET_MANAGING_CLUBS,
    clubs: clubs
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
    clubs: clubs
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
    clubs: clubs
  };
};

export const getAppliedClubs = user => {
  return dispatch => {
    return axios
      .get("/api/user/" + user.id + "/club/apply/")
      .then(res => dispatch(getAppliedClubs_(res.data)));
  };
};

export const getRecommendedClubs_ = clubs => {
  return {
    type: actionTypes.GET_RECOMMENDED_CLUBS,
    clubs: clubs
  };
};

export const getRecommendedClubs = user => {
  return dispatch => {
    return axios
      .get("/api/user/" + user.id + "/club/recommend/")
      .then(res => dispatch(getRecommendedClubs_(res.data)));
  };
};

export const getManagingSomoims_ = somoims => {
  return {
    type: actionTypes.GET_MANAGING_SOMOIMS,
    somoims: somoims
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
    somoims: somoims
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
    somoims: somoims
  };
};

export const getJoinedSomoims = user => {
  return dispatch => {
    return axios
      .get("/api/user/" + user.id + "/somoim/join/")
      .then(res => dispatch(getJoinedSomoims_(res.data)));
  };
};

export const getRecommendedSomoims_ = somoims => {
  return {
    type: actionTypes.GET_RECOMMENDED_SOMOIMS,
    somoims: somoims
  };
};

export const getRecommendedSomoims = user => {
  return dispatch => {
    return axios
      .get("/api/user/" + user.id + "/somoim/recommend/")
      .then(res => dispatch(getRecommendedSomoims_(res.data)));
  };
};

export const addLikedClub_ = newLikedClub => {
  return {
    type: actionTypes.ADD_LIKED_CLUB,
    newLikedClub: newLikedClub
  };
};

export const addLikedClub = (newLikedClub, user) => {
  return dispatch => {
    return axios
      .put("/api/user/" + user.id + "/club/like/", newLikedClub)
      .then(res => dispatch(addLikedClub_(newLikedClub)))
      .then(res => dispatch(getClubList())) //TODO: change to get club by id
      .then(res => dispatch(getRecommendedClubs(user)));
  };
};

export const addLikedSomoim_ = newLikedSomoim => {
  return {
    type: actionTypes.ADD_LIKED_SOMOIM,
    newLikedSomoim: newLikedSomoim
  };
};

export const addLikedSomoim = (newLikedSomoim, user) => {
  return dispatch => {
    return axios
      .put("/api/user/" + user.id + "/somoim/like/", newLikedSomoim)
      .then(res => dispatch(addLikedSomoim_(newLikedSomoim)))
      .then(res => dispatch(getSomoimList())) //TODO: change to get club by id
      .then(res => dispatch(getRecommendedSomoims(user)));
  };
};

export const addAppliedClub_ = newAppliedClub => {
  return {
    type: actionTypes.ADD_APPLIED_CLUB,
    newAppliedClub: newAppliedClub
  };
};

export const addAppliedClub = (newAppliedClub, user) => {
  return dispatch => {
    return axios
      .put("/api/user/" + user.id + "/club/apply/", newAppliedClub)
      .then(res => dispatch(addAppliedClub_(newAppliedClub)))
      .then(res => dispatch(getSomoimList())) //TODO: change to get club by id
      .then(res => dispatch(getRecommendedSomoims(user)));
  };
};

export const addJoinedSomoim_ = newJoinedSomoim => {
  return {
    type: actionTypes.ADD_JOINED_SOMOIM,
    newJoinedSomoim: newJoinedSomoim
  };
};

export const addJoinedSomoim = (newJoinedSomoim, user) => {
  return dispatch => {
    return axios
      .put("/api/user/" + user.id + "/somoim/join/", newJoinedSomoim)
      .then(res => dispatch(addJoinedSomoim_(newJoinedSomoim)))
      .then(res => dispatch(getSomoimList())) //TODO: change to get club by id
      .then(res => dispatch(getRecommendedSomoims(user)));
  };
};

export const addManagingSomoim_ = newManagingSomoim => {
  return {
    type: actionTypes.ADD_MANAGING_SOMOIM,
    newManagingSomoim: newManagingSomoim
  };
};

export const addManagingSomoim = (newManagingSomoim, user) => {
  return dispatch => {
    return axios
      .put("/api/user/" + user.id + "/somoim/manage/", newManagingSomoim)
      .then(res => dispatch(addManagingSomoim_(newManagingSomoim)));
  };
};
