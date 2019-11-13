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

export const getApplicationFormByID_ = form => {
  return {
    type: actionTypes.GET_APPLICATION_FORM_BY_ID,
    form: form
  };
};

export const getApplicationFormByID = id => {
  return dispatch => {
    return axios
      .get("/api/club/" + id + "/application/form/")
      .then(res => dispatch(getClubByID_(res.data)));
  };
};

export const putApplicationFormByID_ = (id, form) => {
  return {
    type: actionTypes.PUT_APPLICATION_FORM_BY_ID
  };
};

export const putApplicationFormByID = (id, form) => {
  return dispatch => {
    return axios
      .put("/api/club/" + id + "/application/form/", form)
      .then(res => dispatch(putApplicationFormByID_(res.data)));
  };
};
