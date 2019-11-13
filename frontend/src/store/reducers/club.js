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
<<<<<<< HEAD
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
    case actionTypes.GET_APPLICATION_FORM_BY_ID:
      return { ...state, applicationForm: action.form };
=======
    case actionTypes.PUT_CLUB_INFORMATION:
    case actionTypes.POST_CLUB_POSTER:
      return state;

>>>>>>> 5e139a163aa3935863bcd8465e526ea8fd927a78
    default:
      break;
  }
  return state;
};

export default reducer;
