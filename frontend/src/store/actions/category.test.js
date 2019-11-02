// import axios from "axios";
// import * as router from 'connected-react-router';

import * as actionCreators from "./category";
import store from "../store";

describe("Category Actions", () => {
  it("getCategoryList", () => {
    store.dispatch(actionCreators.getCategoryList()).then(() => {
      done();
    });
  });
});
