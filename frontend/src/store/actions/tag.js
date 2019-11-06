import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getTagList_ = tags => {
  return {
    type: actionTypes.GET_TAG_LIST,
    tags: tags
  };
};

export const getTagList = () => {
  return dispatch => {
    return axios
      .get("api/tag/list/")
      .then(res => dispatch(getTagList_(res.data)));
  };
};
