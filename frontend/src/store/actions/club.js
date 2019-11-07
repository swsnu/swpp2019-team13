import * as actionTypes from "./actionTypes";
import axios from "axios";

// TODO : implement actions
export const postClub_ = at => {
  return {
    type: actionTypes.POST_CLUB,
    name: at.name,
    clubmanager: at.clubmanager,
    auth_img_file: at.auth_img_file,
    selected_category: at.selected_category
  };
};

export const postClub = at => {
  return dispatch => {
    return new Promise(() => dispatch(postClub_(at)));
  };
};

export const getClubList_ = clubs => {
  return {
    type: actionTypes.GET_CLUB_LIST,
    clubs: clubs
  };
};

export const getClubList = () => {
  return dispatch => {
    return axios
      .get("api/club/list/")
      .then(res => dispatch(getClubList_(res.data)));
  };
};

export const getClubByID_ = id => {
  return {
    type: actionTypes.GET_CLUB_BY_ID,
    id: id
  };
};

export const getClubByID = id => {
  return dispatch => {
    return new Promise(() => dispatch(getClubByID_(id)));
  };
};

export const increaseLikesOfClub_ = newLikedClub => {
  return {
    type: actionTypes.INCREASE_LIKES_OF_CLUB,
    newLikedClub: newLikedClub
  };
};

export const increaseLikesOfClub = newLikedClub => {
  return dispatch => {
    return axios
      .put("/api/club/edit/" + newLikedClub.id + "/", newLikedClub)
      .then(res => dispatch(increaseLikesOfClub_(newLikedClub)));
  };
};
