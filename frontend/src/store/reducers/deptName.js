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
      name: "농생대"
    },
    {
      id: 6,
      name: "사범대"
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
      name: "음대"
    },
    {
      id: 13,
      name: "미대"
    },
    {
      id: 14,
      name: "자유전공학부"
    },
    {
      id: 15,
      name: "약대"
    }
  ]
};

// TODO : implement reducer actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DEPTNAME_LIST:
      return { ...state };
    default:
      break;
  }
  return state;
};

export default reducer;
