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
      return { ...state, loggedUser: action.loggedUser };
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
    default:
      break;
  }
  return state;
};

export default reducer;
