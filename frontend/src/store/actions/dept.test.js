import axios from "axios";

import * as actionCreators from "./dept";
import store from "../store";

const stubDept = {
  id: 0,
  name: "dept 1"
};

describe("Dept Actions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("getDeptList", done => {
    const stubDeptList = [stubDept];

    const spyGetDeptList = jest.spyOn(axios, "get").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubDeptList
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getDeptList()).then(() => {
      const newState = store.getState();
      expect(newState.dept.depts).toBe(stubDeptList);
      expect(spyGetDeptList).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
