import * as actionTypes from "./actionTypes";
import axios from "axios";

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
      .get("/api/club/list/")
      .then(res => dispatch(getClubList_(res.data)));
  };
};

export const getClubByID_ = club => {
  return {
    type: actionTypes.GET_CLUB_BY_ID,
    selectedClub: club
  };
};

export const getClubByID = id => {
  return dispatch => {
    return axios
      .get("/api/club/" + id + "/")
      .then(res => dispatch(getClubByID_(res.data)));
  };
};
