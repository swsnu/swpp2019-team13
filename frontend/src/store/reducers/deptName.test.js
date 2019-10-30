import reducer from "./deptName";
import * as actionTypes from "../actions/actionTypes";

describe("deptName Reducer", () => {
  it("should return default state", () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({
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
    });
  });

  it("should get all deptname", () => {
    const stubDeptNameList = [
      {
        id: 0,
        name: "DEPT_1"
      },
      {
        id: 1,
        name: "DEPT_2"
      }
    ];
    const newState = reducer(undefined, {
      type: actionTypes.GET_DEPTNAME_LIST,
      deptnames: stubDeptNameList
    });
    expect(newState).toEqual({
      deptnames: stubDeptNameList
    });
  });
});
