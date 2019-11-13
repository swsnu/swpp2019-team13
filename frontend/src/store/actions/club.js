import * as actionTypes from "./actionTypes";
import axios from "axios";

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

export const putClubInformation_ = () => {
  return {
    type: actionTypes.PUT_CLUB_INFORMATION
  };
};

export const putClubInformation = (id, clubInfo) => {
  return dispatch => {
    return axios
      .put("/api/club/" + id + "/", clubInfo)
      .then(res => dispatch(putClubInformation_()));
  };
};

export const postClubPoster_ = () => {
  return {
    type: actionTypes.POST_CLUB_POSTER
  };
};

export const postClubPoster = (club_id, poster) => {
  return dispatch => {
    return axios
      .post("/api/club/" + club_id + "/poster/", poster)
      .then(res => dispatch(postClubPoster_()));
  };
};
