import axios from "axios";

import * as actionCreators from "./major";
import store from "../store";

const stubMajor = {
  id: 0,
  dept_id: 1,
  name: "major 1"
};

describe("Major Actions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("getMajorList", done => {
    const stubMajorList = [stubMajor];

    const spyGetDeptList = jest.spyOn(axios, "get").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubMajorList
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getMajorList()).then(() => {
      const newState = store.getState();
      expect(newState.major.majors).toBe(stubMajorList);
      expect(spyGetDeptList).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
