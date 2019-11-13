import * as actionTypes from "../actions/actionTypes";

const initialState = {
  clubs: [],
  selectedClub: null
};
// TODO : implement reducer actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CLUB_LIST:
      return { ...state, clubs: action.clubs };
    case actionTypes.GET_CLUB_BY_ID:
      return { ...state, selectedClub: action.selectedClub };
    case actionTypes.PUT_CLUB_INFORMATION:
    case actionTypes.POST_CLUB_POSTER:
      return state;

    default:
      break;
  }
  return state;
};

export default reducer;
