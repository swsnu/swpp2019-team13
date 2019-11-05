import * as actionTypes from "./actionTypes";
import axios from "axios";

export const postPreClub_ = at => {
  return {
    type: actionTypes.POST_PRECLUB,
    name: at.name,
    manager: at.manager,
    auth_img: at.auth_img,
    category: at.category
  };
};
export const postPreClub = at => {
  return dispatch => {
    return axios.post("api/preclub/").then(res => dispatch(postPreClub_(at)));
  };
};
