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

export const getApplicationList_ = applicationList => {
  return {
    type: actionTypes.GET_APPLICATION_LIST,
    applicationList: applicationList
  };
};

export const getApplicationList = id => {
  return dispatch => {
    return axios
      .get("/api/club/" + id + "/application/list/")
      .then(res => dispatch(getApplicationList_(res.data)));
  };
};

export const getApplicationByID_ = form => {
  return {
    type: actionTypes.GET_APPLICATION_BY_ID,
    form: form
  };
};

export const getApplicationByID = id => {
  return dispatch => {
    return axios
      .get("/api/club/" + id + "/application/")
      .then(res => dispatch(getApplicationByID_(res.data)));
  };
};

export const putApplicationByID_ = form => {
  return {
    type: actionTypes.PUT_APPLICATION_BY_ID,
    form: form
  };
};

export const putApplicationByID = (id, form, fileData) => {
  return dispatch => {
    return axios
      .put("/api/club/" + id + "/application/", form)
      .then(axios.post("/api/club/" + id + "/application/", fileData))
      .then(res => {
        alert("지원서가 저장되었습니다.");
        dispatch(putApplicationByID_(form));
      });
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
      .then(res => dispatch(getApplicationFormByID_(res.data)));
  };
};

export const putApplicationFormByID_ = data => {
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

export const addClubHitCount_ = id => {
  return {
    type: actionTypes.ADD_CLUB_HITCOUNT,
    club_id: id
  };
};

export const addClubHitCount = id => {
  return dispatch => {
    return axios.put("/api/club/" + id + "/hits/").then(res => {
      if (res.status === 200) dispatch(addClubHitCount_(id));
    });
  };
};

export const postClubPoster_ = () => {
  return {
    type: actionTypes.POST_CLUB_POSTER
  };
};

export const postClubPoster = (club_id, poster_file) => {
  let promise_arr = poster_file.map(poster =>
    axios.post("/api/club/" + club_id + "/poster/", poster)
  );

  return dispatch => {
    return axios.all(promise_arr).then(res => dispatch(postClubPoster_()));
  };
};
