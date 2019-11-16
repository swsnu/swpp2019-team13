import axios from "axios";

export const postPreClub = at => {
  return dispatch => {
    return axios.post("/api/preclub/list/", at);
  };
};
