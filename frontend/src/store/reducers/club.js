import * as actionTypes from "../actions/actionTypes";

const initialState = {
  clubs: [
    {
      id: 1,
      name: "SNUStone",
      content: "SNU Best HearthStone Club",
      clubmanager: "김지훈",
      selected_category: 0,
      auth_img_file: null,
      isRegistered: true
    },
    {
      id: 2,
      name: "SnuWOD",
      content: "SNU Best Training Club",
      clubmanager: "김동우",
      selected_category: 6,
      auth_img_file: null,
      isRegistered: true
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
