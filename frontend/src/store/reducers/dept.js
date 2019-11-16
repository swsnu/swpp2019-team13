import * as actionTypes from "../actions/actionTypes";

const initialState = {
  depts: []
};

// TODO : implement reducer actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DEPT_LIST:
      return { ...state, depts: action.depts };
    default:
      break;
  }
  return state;
};

export default reducer;
