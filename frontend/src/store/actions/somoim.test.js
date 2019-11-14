import axios from "axios";
// import * as router from 'connected-react-router';

import * as actionCreators from "./somoim";
import store from "../store";

describe("Category Actions", () => {
  it("postSomoim", () => {
    const spypostSomoim = jest.spyOn(axios, "post").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: 1
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.postSomoim(1)).then(() => {
      const newState = store.getState();
      expect(newState.somoim.somoims).toBe([1]);
      expect(spypostSomoim).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it("getSomoimList", () => {
    store.dispatch(actionCreators.getSomoimList()).then(() => {
      done();
    });
  });

  it("getSomoimByID", () => {
    store.dispatch(actionCreators.getSomoimByID()).then(() => {
      done();
    });
  });
});
