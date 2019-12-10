import * as actionTypes from "../actions/actionTypes";

const initialState = {
  clubs: [],
  selectedClub: null,
  selectedApplication: null,
  applicationForm: null
};
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
    case actionTypes.ADD_CLUB_HITCOUNT:
      return {
        ...state,
        clubs: state.clubs.map(a => {
          if (a.id === action.club_id) {
            a.hits += 1;
          }
          return a;
        })
      };
    case actionTypes.GET_APPLICATION_LIST:
      return { ...state, applicationList: action.applicationList };
    case actionTypes.GET_APPLICATION_BY_ID:
      return { ...state, selectedApplication: action.form };
    case actionTypes.PUT_APPLICATION_BY_ID:
      return { ...state, myApplication: action.form };
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
