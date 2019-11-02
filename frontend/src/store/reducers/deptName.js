import * as actionTypes from "../actions/actionTypes";

const initialState = {
  deptnames: [
    {
      id: 0,
      name: "공과대학"
    },
    {
      id: 1,
      name: "인문대학"
    },
    {
      id: 2,
      name: "자연과학대학"
    },
    {
      id: 3,
      name: "사회과학대학"
    },
    {
      id: 4,
      name: "경영대학"
    },
    {
      id: 5,
      name: "농업생명과학대학"
    },
    {
      id: 6,
      name: "사범대학"
    },
    {
      id: 7,
      name: "생활과학대학"
    },
    {
      id: 8,
      name: "의과대학"
    },
    {
      id: 9,
      name: "수의과대학"
    },
    {
      id: 10,
      name: "약학대학"
    },
    {
      id: 11,
      name: "간호대학"
    },
    {
      id: 12,
      name: "음악대학"
    },
    {
      id: 13,
      name: "미술대학"
    },
    {
      id: 14,
      name: "자유전공학부"
    }
  ]
};

// TODO : implement reducer actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DEPT_LIST:
      return { ...state, deptnames: action.deptnames };
    default:
      break;
  }
  return state;
};

export default reducer;
