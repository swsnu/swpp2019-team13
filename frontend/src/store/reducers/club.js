import * as actionTypes from "../actions/actionTypes";

const initialState = {
  clubs: [],
  selectedClub: null,
  selectedApplication: null,
  applicationForm: null
};
// TODO : implement reducer actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CLUB_LIST:
      return { ...state, clubs: action.clubs };
    case actionTypes.GET_CLUB_BY_ID:
      return {
        ...state,
        selectedClub: action.selectedClub,
        clubs: state.clubs.map(item => {
          if (item.id === action.selectedClub.id) return action.selectedClub;
          else return item;
        })
      };
    case actionTypes.GET_APPLICATION_BY_ID:
      return { ...state, selectedApplication: action.form };
    case actionTypes.GET_APPLICATION_FORM_BY_ID:
      return { ...state, applicationForm: action.form };
    case actionTypes.PUT_CLUB_INFORMATION:
      return { ...state, selectedClub: null };
    case actionTypes.POST_CLUB_POSTER:
    default:
      break;
  }
  return state;
};

export default reducer;
