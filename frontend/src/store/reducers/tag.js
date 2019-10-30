import * as actionTypes from "../actions/actionTypes";

const initialState = {
  tags: [
    { id: 0, name: "friendship" },
    { id: 1, name: "love" },
    { id: 2, name: "sport" },
    { id: 3, name: "game" },
    { id: 4, name: "study" },
    { id: 5, name: "music" },
    { id: 6, name: "art" },
    { id: 7, name: "nothing" }
  ]
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
