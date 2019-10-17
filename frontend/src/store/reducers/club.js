import * as actionTypes from "../actions/actionTypes";

const initialState = {
  clubs: [
    {
      id: 1,
      title: "SNUStone",
      content: "SNU Best HearthStone Club",
      tag: ["Game", "Friendship"]
    },
    {
      id: 2,
      title: "SnuWOD",
      content: "SNU Best Training Club",
      tag: ["Training", "Non-Alcohol"]
    }
  ]
};

// TODO : implement reducer actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CLUB_LIST:
      return { ...state };
    case actionTypes.GET_CLUB_BY_ID:
      return { ...state };
    case actionTypes.POST_CLUB:
      const newClub = {
        id: action.id,
        title: action.title,
        content: action.content,
        tag: action.tag
      };
      return { ...state, clubs: state.clubs.concat(newClub) };
    default:
      break;
  }
  return state;
};

export default reducer;
