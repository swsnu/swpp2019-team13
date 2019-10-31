import * as actionTypes from "../actions/actionTypes";

const initialState = {
  clubs: [
    {
      id: 0,
      name: "SNUStone",
      content: "SNU Best HearthStone Club",
      clubmanager: "김지훈",
      selected_category: 0,
      auth_img_file: "1",
      isRegistered: true,
      tag: [0, 1],
      likes: 10
    },
    {
      id: 1,
      name: "SnuWOD",
      content: "SNU Best Training Club",
      clubmanager: "김동우",
      selected_category: 6,
      auth_img_file: "2",
      isRegistered: true,
      tag: [2, 3],
      likes: 15
    },

    {
      id: 2,
      name: "SnuLoL",
      content: "SNU Best LoL Club",
      clubmanager: "김도현",
      selected_category: 6,
      auth_img_file: "3",
      isRegistered: true,
      tag: [2, 3],
      likes: 20
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
        id: state.clubs.length,
        name: action.name,
        content: "empty",
        clubmanager: action.clubmanager,
        auth_img_file: action.auth_img_file,
        selected_category: action.selected_category,
        tag: [],
        likes: 0
      };
      return { ...state, clubs: state.clubs.concat(newClub) };
    default:
      break;
  }
  return state;
};

export default reducer;
