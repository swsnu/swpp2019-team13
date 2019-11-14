import axios from "axios";
// import * as router from 'connected-react-router';

import * as actionCreators from "./tag";
import store from "../store";

describe("Category Actions", () => {
  it("getTagList", () => {
    const stubTagList = [1];

    const spyGetTagList = jest.spyOn(axios, "get").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubTagList
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getTagList()).then(() => {
      const newState = store.getState();
      expect(newState.tag.tags).toBe(stubTagList);
      expect(spyGetTagList).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
