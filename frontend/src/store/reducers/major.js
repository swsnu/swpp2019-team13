import * as actionTypes from "../actions/actionTypes";

const initialState = {
  majors: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MAJOR_LIST:
      return { ...state, majors: action.majors };
    default:
      break;
  }
  return state;
};

export default reducer;
