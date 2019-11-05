import * as actionTypes from "../actions/actionTypes";

const initialState = {
  somoims: [
    {
      id: 0,
      title: "Let's LoL!",
      summary: "Playing LoL together!! :D",
      description: "LoL\nLoL\nLol",
      selected_dept: [0, 1],
      available_sem: 1,
      tags: [0, 1],
      goalJoiner: 20,
      currentJoiner: 7,
      likes: 10
    },
    {
      id: 1,
      title: "Book lovers",
      summary: "We read books until we fall asleep..",
      description: "Actually, it's sleep somoim :)",
      selected_dept: [0, 1, 3, 4, 5],
      available_sem: 1,
      tags: [2, 3],
      goalJoiner: 10,
      currentJoiner: 3,
      likes: 5
    },
    {
      id: 2,
      title: "test somoim",
      summary: "i am testing the somoim list",
      description: "Me too bro",
      selected_dept: [0, 1, 3, 4, 5],
      available_sem: 3,
      tags: [4, 5],
      goalJoiner: 10,
      currentJoiner: 9,
      likes: 5
    },
    {
      id: 3,
      title: "301 assa somoim",
      summary: "We are assa in 301",
      description: "Sad..",
      selected_dept: [0, 1, 3, 4, 5],
      available_sem: 5,
      tags: [6, 7],
      goalJoiner: 10,
      currentJoiner: 1,
      likes: 5
    }
  ],
  selectedSomoim: null
};

// TODO : implement reducer actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SOMOIM_LIST:
      return { ...state, somoims: action.somoims };
    case actionTypes.GET_SOMOIM_BY_ID:
      return { ...state, selectedSomoim: action.somoim };
    case actionTypes.POST_SOMOIM:
      const newSomoim = {
        id: state.somoims.length,
        title: action.title,
        summary: action.summary,
        description: action.description,
        selected_dept: action.selected_dept,
        available_sem: action.available_sem,
        tags: [],
        goalJoiner: action.goalJoiner,
        currentJoiner: 0,
        likes: 0
      };
      return { ...state, somoims: state.somoims.concat(newSomoim) };

    case actionTypes.INCREASE_LIKES_OF_SOMOIM:
      const somoimsModifiedByClickingLike = state.somoims.map(somoim => {
        if (somoim.id === action.newLikedSomoim.id) {
          return action.newLikedSomoim;
        } else {
          return somoim;
        }
      });
      return {
        ...state,
        somoims: somoimsModifiedByClickingLike
      };

    case actionTypes.INCREASE_NUM_OF_CURRENT_JOINER:
      const somoimsModifiedByClickingJoin = state.somoims.map(somoim => {
        if (somoim.id === action.newJoinedSomoim.id) {
          return action.newJoinedSomoim;
        } else {
          return somoim;
        }
      });
      return {
        ...state,
        somoims: somoimsModifiedByClickingJoin
      };

    default:
      break;
  }
  return state;
};

export default reducer;
