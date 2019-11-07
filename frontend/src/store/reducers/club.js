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
      let clubTargettedByID = state.clubs.filter(club => {
        return club.id === action.id;
      });
      return { ...state, selectedClub: clubTargettedByID[0] };
    case actionTypes.POST_CLUB:
      const newClub = {
        id: state.clubs.length,
        name: action.name,
        content: "empty",
        clubmanager: action.clubmanager,
        auth_img: action.auth_img,
        selected_category: action.selected_category,
        tags: []
      };
      return { ...state, clubs: state.clubs.concat(newClub) };

    case actionTypes.INCREASE_LIKES_OF_CLUB:
      const clubsModifiedByClickingLike = state.clubs.map(club => {
        if (club.id === action.newLikedClub.id) {
          return action.newLikedClub;
        } else {
          return club;
        }
      });

      return {
        ...state,
        clubs: clubsModifiedByClickingLike
      };
    default:
      break;
  }
  return state;
};

export default reducer;
