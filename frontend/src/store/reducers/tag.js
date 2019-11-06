import * as actionTypes from "../actions/actionTypes";

const initialState = {
  tags: []
};

// TODO : implement reducer actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TAG_LIST:
      return { ...state, tags: action.tags };
    default:
      break;
  }
  return state;
};

export default reducer;
