import axios from "axios";

import * as actionCreators from "./preclub";
import store from "../store";

const stubPreClub = {
  id: 1,
  name: "name",
  manager: "manager",
  auth_img: "auth_img",
  category: 1
};

describe("Preclub Actions", () => {
  it("postPreClub", done => {
    const spyPostPreClub = jest.spyOn(axios, "post").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubPreClub
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.postPreClub(stubPreClub)).then(() => {
      expect(spyPostPreClub).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
