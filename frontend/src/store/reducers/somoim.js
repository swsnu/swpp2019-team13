import * as actionTypes from "../actions/actionTypes";

const initialState = {};

// TODO : implement reducer actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SOMOIM_LIST:
      return { ...state };
    case actionTypes.GET_SOMOIM_BY_ID:
      return { ...state };
    case actionTypes.POST_SOMOIM:
      return { ...state };
    default:
      break;
  }
  return state;
};

export default reducer;
