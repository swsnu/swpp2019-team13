import * as actionTypes from "../actions/actionTypes";

const initialState = {
  users: [
    {
      username: "test",
      email: "test@test.com",
      password: "test",
      dept: 0,
      major: 4,
      grade: 3,
      availableSemester: 2
    }
  ],
  loggedUser: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return { ...state, loggedUser: action.loggedUser };
    case actionTypes.SIGN_OUT:
      return { ...state, loggedUser: null };
    case actionTypes.SIGN_UP:
      const newUser = {
        username: action.user.username,
        email: action.user.email,
        password: action.user.password,
        dept: action.user.dept,
        major: action.user.major,
        grade: action.user.grade,
        availableSemester: action.user.availableSemester
      };
      return { ...state, users: state.users.concat(newUser) };
    default:
      break;
  }
  return state;
};

export default reducer;
