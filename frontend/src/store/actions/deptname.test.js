// import axios from "axios";
// import * as router from 'connected-react-router';

import * as actionCreators from "./dept";
import store from "../store";

describe("Category Actions", () => {
  it("getDeptNameList", () => {
    store.dispatch(actionCreators.getDeptNameList()).then(() => {
      done();
    });
  });
});
