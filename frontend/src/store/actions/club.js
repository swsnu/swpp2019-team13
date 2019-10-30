import * as actionTypes from "./actionTypes";

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
    dispatch(postClub_(at));
  };
};

export const getClubList_ = () => {
  return {
    type: actionTypes.GET_CLUB_LIST
  };
};

export const getClubList = () => {
  return dispatch => {
    dispatch(getClubList_());
  };
};

export const getClubByID_ = id => {
  return {
    type: actionTypes.GET_CLUB_BY_ID
  };
};

export const getClubByID = id => {
  return dispatch => {
    dispatch(getClubByID_(id));
  };
};
