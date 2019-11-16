import * as actionTypes from "../actions/actionTypes";

const initialState = {
  categories: []
};

// TODO : implement reducer actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORY_LIST:
      return { ...state, categories: action.categories };
    default:
      break;
  }
  return state;
};

export default reducer;
