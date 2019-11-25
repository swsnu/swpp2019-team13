import axios from "axios";
// import * as router from 'connected-react-router';

import * as actionCreators from "./tag";
import store from "../store";

describe("Tag Actions", () => {
  it("getTagList", done => {
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

  it("get Extract Tag", done => {
    const spyGetExtractTag = jest
      .spyOn(axios, "post")
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: 1
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.getExtractedTag()).then(() => {
      const newState = store.getState();
      expect(newState.tag.extracted_tag).toBe(1);
      expect(spyGetExtractTag).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
