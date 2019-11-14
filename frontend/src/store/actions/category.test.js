import axios from "axios";
// import * as router from 'connected-react-router';

import * as actionCreators from "./category";
import store from "../store";

describe("Category Actions", () => {
  it("getCategoryList", () => {
    const spygetClubByID = jest.spyOn(axios, "get").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: 1
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getCategoryList(1)).then(() => {
      expect(spygetClubByID).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
