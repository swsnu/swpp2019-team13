import * as actionTypes from "../actions/actionTypes";

const initialState = {
  somoims: [
    {
      id: 0,
      title: "Let's LoL!",
      content: "Playing LoL together!! :D",
      tag: [0, 1],
      goal: 20,
      current: 7,
      likes: 10
    },
    {
      id: 1,
      title: "Book lovers",
      content: "We read books until we fall asleep..",
      tag: [2, 3],
      goal: 10,
      current: 3,
      likes: 5
    },
    {
      id: 2,
      title: "test somoim",
      content: "i am testing the somoim list",
      tag: [4, 5],
      goal: 10,
      current: 9,
      likes: 5
    },
    {
      id: 3,
      title: "301 assa somoim",
      content: "We are assa in 301",
      tag: [6, 7],
      goal: 10,
      current: 1,
      likes: 5
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
