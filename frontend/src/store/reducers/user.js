import * as actionTypes from "../actions/actionTypes";

const initialState = {
  users: [],
  loggedUser: null,
  likedClubs: [],
  likedSomoims: [],
  appliedClubs: [],
  joinedSomoims: []
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

    case actionTypes.ADD_LIKED_CLUB:
      if (
        state.likedClubs.filter(item => item.id === action.newLikedClub.id)
          .length > 0
      )
        return {
          ...state,
          likedClubs: state.likedClubs.filter(
            item => item.id !== action.newLikedClub.id
          )
        };
      else
        return {
          ...state,
          likedClubs: state.likedClubs.concat(action.newLikedClub)
        };

    case actionTypes.ADD_LIKED_SOMOIM:
      if (
        state.likedSomoims.filter(item => item.id === action.newLikedSomoim.id)
          .length > 0
      )
        return {
          ...state,
          likedSomoims: state.likedSomoims.filter(
            item => item.id !== action.newLikedSomoim.id
          )
        };
      else
        return {
          ...state,
          likedSomoims: state.likedSomoims.concat(action.newLikedSomoim)
        };

    case actionTypes.ADD_APPLIED_CLUB:
      if (
        state.appliedClubs.filter(item => item.id === action.newAppliedClub.id)
          .length > 0
      )
        return {
          ...state,
          appliedClubs: state.appliedClubs.filter(
            item => item.id !== action.newAppliedClub.id
          )
        };
      else
        return {
          ...state,
          appliedClubs: state.appliedClubs.concat(action.newAppliedClub)
        };

    case actionTypes.ADD_JOINED_SOMOIM:
      if (
        state.joinedSomoims.filter(
          item => item.id === action.newJoinedSomoim.id
        ).length > 0
      )
        return {
          ...state,
          joinedSomoims: state.joinedSomoims.filter(
            item => item.id !== action.newJoinedSomoim.id
          )
        };
      else
        return {
          ...state,
          joinedSomoims: state.joinedSomoims.concat(action.newJoinedSomoim)
        };

    default:
      break;
  }
  return state;
};

export default reducer;
