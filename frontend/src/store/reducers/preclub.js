import * as actionTypes from "../actions/actionTypes";

const initialState = {
  preclubs: [],
  selectedClub: null
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_PRECLUB:
      const newPreClub = {
        id: state.preclubs.length,
        name: action.name,
        manager: action.manager,
        auth_img: action.auth_img,
        category: action.category
      };
      return { ...state, preclubs: state.preclubs.concat(newPreClub) };
    default:
      break;
  }
  return state;
};

export default reducer;
