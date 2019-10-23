import * as actionTypes from "../actions/actionTypes";

const initialState = {
  somoims: [
    {
      id: 0,
      title: "Let's LoL!",
      summary: "Playing LoL together!! :D",
      description: "LoL\nLoL\nLol",
      selected_dept: [true, false, false, false, false, false, false],
      available_sem: 1,
      tag: [0, 1],
      goalJoiner: 20,
      currentJoiner: 7,
      likes: 10
    },
    {
      id: 1,
      title: "Book lovers",
      content: "We read books until we fall asleep..",
      description: "Actually, it's sleep somoim :)",
      selected_dept: [false, false, true, false, false, true, false],
      available_sem: 1,
      tag: [2, 3],
      goalJoiner: 10,
      currentJoiner: 3,
      likes: 5
    },
    {
      id: 2,
      title: "test somoim",
      content: "i am testing the somoim list",
      description: "Me too bro",
      selected_dept: [false, false, true, false, false, true, false],
      available_sem: 3,
      tag: [4, 5],
      goalJoiner: 10,
      currentJoiner: 9,
      likes: 5
    },
    {
      id: 3,
      title: "301 assa somoim",
      content: "We are assa in 301",
      description: "Sad..",
      selected_dept: [false, false, true, false, false, true, false],
      available_sem: 5,
      tag: [6, 7],
      goalJoiner: 10,
      currentJoiner: 1,
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
      const newSomoim = {
        id: action.id,
        title: action.title,
        description: action.description,
        goal_number: action.goal_number,
        selected_dept: action.selected_dept,
        available_sem: action.available_sem
      };
      return { ...state, clubs: state.somoims.concat(newSomoim) };
    default:
      break;
  }
  return state;
};

export default reducer;
