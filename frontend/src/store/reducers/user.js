import * as actionTypes from "../actions/actionTypes";

const initialState = {};

// TODO : implement reducer actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return { ...state };
    case actionTypes.SIGN_OUT:
      return { ...state };
    case actionTypes.SIGN_UP:
      return { ...state };
    case actionTypes.GET_USER_BY_ID:
      return { ...state };
    default:
      break;
  }
  return state;
};

export default reducer;
