import * as actionTypes from "../actions/actionTypes";

const initialState = {
  users: [
    {
      id: 0,
      email: "test@test.com",
      password: "test"
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
      return { ...state };
    default:
      break;
  }
  return state;
};

export default reducer;
