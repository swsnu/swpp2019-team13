import * as actionTypes from "../actions/actionTypes";

const initialState = {
  somoims: [
    {
      id: 1,
      title: "수면 소모임",
      description: "잠을 잘 자기 위한 소모임",
      goal_number: 10,
      selected_dept: [true, false, false, false, false, false, false],
      available_sem: 1
    },
    {
      id: 2,
      title: "소모임 2",
      description: "설명\n설명\n설명",
      goal_number: 5,
      selected_dept: [false, false, true, false, true, false, false],
      available_sem: 3
    }
  ]
};

// TODO : implement reducer actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SOMOIM_LIST:
      return { ...state };
    case actionTypes.GET_SOMOIM_BY_ID:
      return { ...state };
    case actionTypes.POST_SOMOIM:
      const newSomoim = {
        id: action.id,
        title: action.title,
        description: action.description,
        goal_number: action.goal_number,
        selected_dept: action.selected_dept,
        available_sem: action.available_sem
      };
      return { ...state, clubs: state.somoims.concat(newSomoim) };
    default:
      break;
  }
  return state;
};

export default reducer;
