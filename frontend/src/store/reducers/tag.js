import * as actionTypes from "../actions/actionTypes";

const initialState = {
  tags: [],
  extracted_tag: []
};

// TODO : implement reducer actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TAG_LIST:
      return { ...state, tags: action.tags };
    case actionTypes.GET_EXTRACTED_TAG:
      return { ...state, extracted_tag: action.extracted_tag };
    default:
      break;
  }
  return state;
};

export default reducer;
