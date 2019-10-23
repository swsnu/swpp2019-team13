import * as actionTypes from "../actions/actionTypes";

const initialState = {
  somoims: [
    {
      id: 1,
      title: "Let's LoL!",
      content: "Playing LoL together!! :D",
      tag: [{ id: 0, name: "Game" }, { id: 1, name: "Friendship" }],
      goal: 20,
      current: 7
    },
    {
      id: 2,
      title: "Book lovers",
      content: "We read books until we fall asleep..",
      tag: [{ id: 0, name: "Book" }, { id: 1, name: "Silence" }],
      goal: 10,
      current: 3
    }
  ]
};

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
