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
    case actionTypes.POST_CLUB:
      const newClub = {
        id: action.id,
        name: action.name,
        content: "empty",
        clubmanager: action.clubmanager,
        auth_img: action.auth_img,
        selected_category: action.selected_category,
        tags: []
      };
      return { ...state, clubs: state.clubs.concat(newClub) };
    default:
      break;
  }
  return state;
};

export default reducer;
