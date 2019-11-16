import reducer from "./dept";
import * as actionTypes from "../actions/actionTypes";

describe("dept Reducer", () => {
  it("should return default state", () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({
      depts: []
    });
  });

  it("should get all dept", () => {
    const stubDeptList = [
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
      type: actionTypes.GET_DEPT_LIST,
      depts: stubDeptList
    });
    expect(newState).toEqual({
      depts: stubDeptList
    });
  });
});
