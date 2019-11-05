import * as actionTypes from "../actions/actionTypes";

const initialState = {
  users: [],
  loggedUser: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_LIST:
      return { ...state, users: action.users };
    case actionTypes.SIGN_IN:
    case actionTypes.SIGN_OUT:
      return { ...state, loggedUser: null };
    case actionTypes.SIGN_UP:
      const newUser = {
        password: action.user.password,
        email: action.user.email,
        name: action.user.name,
        dept: action.user.dept,
        major: action.user.major,
        grade: action.user.grade,
        available_semester: action.user.available_semester
      };
      return { ...state, users: state.users.concat(newUser) };
    case actionTypes.GET_LOGIN_INFO:
      return { ...state, loggedUser: action.loggedUser };
    case actionTypes.PUT_USER_INFORMATION:
      return { ...state, loggedUser: action.loggedUser };
    case actionTypes.GET_MANAGING_CLUBS:
      return { ...state, managingClubs: action.clubs };
    case actionTypes.GET_LIKED_CLUBS:
      return { ...state, likedClubs: action.clubs };
    case actionTypes.GET_APPLIED_CLUBS:
      return { ...state, appliedClubs: action.clubs };

    case actionTypes.GET_MANAGING_SOMOIMS:
      return { ...state, managingSomoims: action.somoims };
    case actionTypes.GET_LIKED_SOMOIMS:
      return { ...state, likedSomoims: action.somoims };
    case actionTypes.GET_JOINED_SOMOIMS:
      return { ...state, joinedSomoims: action.somoims };

    default:
      break;
  }
  return state;
};

export default reducer;
