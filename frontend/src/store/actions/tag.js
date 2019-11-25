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
      .get("/api/tag/list/")
      .then(res => dispatch(getTagList_(res.data)));
  };
};

export const getExtractedTag_ = extracted_tag => {
  return {
    type: actionTypes.GET_EXTRACTED_TAG,
    extracted_tag: extracted_tag
  };
};

export const getExtractedTag = description => {
  return dispatch => {
    return axios
      .post("/api/tag/extlist/", { description: description })
      .then(res => dispatch(getExtractedTag_(res.data)));
  };
};
