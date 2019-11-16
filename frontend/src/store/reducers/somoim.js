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
    //case actionTypes.GET_SOMOIM_BY_ID:
    //  return { ...state, selectedSomoim: action.somoim };
    case actionTypes.POST_SOMOIM:
      const newSomoim = {
        id: action.id,
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

    default:
      break;
  }
  return state;
};

export default reducer;
