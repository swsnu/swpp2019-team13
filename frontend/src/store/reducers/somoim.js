import * as actionTypes from "../actions/actionTypes";

const initialState = {
  somoims: [],
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
        id: state.somoims.length + 1,
        title: action.title,
        summary: action.summary,
        description: action.description,
        category: action.category,
        available_major: action.available_major,
        available_semester: action.available_semester,
        session_day: action.session_day,
        tags: [],
        goalJoiner: action.goalJoiner,
        joiners: [],
        likers: []
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
