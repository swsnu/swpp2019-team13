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
      return {
        ...state,
        selectedSomoim: action.selectedSomoim,
        somoims: state.somoims.map(item => {
          if (item.id === action.selectedSomoim.id)
            return action.selectedSomoim;
          else return item;
        })
      };
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
    case actionTypes.ADD_SOMOIM_HITCOUNT:
      return {
        ...state,
        somoims: state.somoims.map(a => {
          if (a.id === action.somoim_id) {
            a.hits += 1;
          }
          return a;
        })
      };
    default:
      break;
  }
  return state;
};

export default reducer;
