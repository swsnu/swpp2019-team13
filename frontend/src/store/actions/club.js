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

export const putClubInformation_ = club => {
  return {
    type: actionTypes.PUT_CLUB_INFORMATION,
    selectedClub: club
  };
};

export const putClubInformation = (id, clubInfo) => {
  return dispatch => {
    return axios
      .get("/api/club/" + id + "/", clubInfo)
      .then(res => dispatch(putClubInformation_(res.data)));
  };
};
