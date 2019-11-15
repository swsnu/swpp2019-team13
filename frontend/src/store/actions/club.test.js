import axios from "axios";
// import * as router from 'connected-react-router';

import * as actionCreators from "./club";
import store from "../store";

describe("Category Actions", () => {
  it("postClubPoster", done => {
    const spypostClubPoster = jest.spyOn(axios, "post").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: 1
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.postClubPoster(1, [1])).then(() => {
      const newState = store.getState();
      //expect(newState.somoim.somoims).toBe([1]);
      expect(spypostClubPoster).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it("getClubList", done => {
    const spygetClubList = jest.spyOn(axios, "get").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: 1
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getClubList(1)).then(() => {
      expect(spygetClubList).toHaveBeenCalledTimes(1);
      done();
    });
  });
  it("getClubByID", done => {
    const spygetClubByID = jest.spyOn(axios, "get").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: 1
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getClubByID(1)).then(() => {
      expect(spygetClubByID).toHaveBeenCalled();
      done();
    });
  });

  it("putClubInformation", done => {
    const spyputClubInformation = jest.spyOn(axios, "put").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: 1
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.putClubInformation(1, 1)).then(() => {
      expect(spyputClubInformation).toHaveBeenCalled();
      done();
    });
  });

  it("putApplicationFormByID", done => {
    const spyputApplicationFormByID = jest.spyOn(axios, "put").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: 1
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.putApplicationFormByID(1, 1)).then(() => {
      expect(spyputApplicationFormByID).toHaveBeenCalled();
      done();
    });
  });


  it("getApplicationFormByID", done => {
    const spygetApplicationFormByID = jest.spyOn(axios, "get").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: 1
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getApplicationFormByID(1, 1)).then(() => {
      expect(spygetApplicationFormByID).toHaveBeenCalled();
      done();
    });
  });
});
