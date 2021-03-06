import axios from "axios";
// import * as router from 'connected-react-router';

import * as actionCreators from "./somoim";
import store from "../store";

describe("Somoim Actions", () => {
  it("postSomoim", done => {
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
      expect(spypostSomoim).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it("getSomoimList", done => {
    const spygetSomoimList = jest
      .spyOn(axios, "get")
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: []
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.getSomoimList(1)).then(() => {
      expect(spygetSomoimList).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("addSomoimHitCount success", done => {
    const spyaddSomoimHitCount = jest
      .spyOn(axios, "put")
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.addSomoimHitCount(1)).then(() => {
      expect(spyaddSomoimHitCount).toBeCalledTimes(1);
      done();
    });
  });

  it("addSomoimHitCount fail", done => {
    const spyaddSomoimHitCount = jest
      .spyOn(axios, "put")
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 204
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.addSomoimHitCount(1)).then(() => {
      expect(spyaddSomoimHitCount).toBeCalledTimes(2);
      done();
    });
  });
});
