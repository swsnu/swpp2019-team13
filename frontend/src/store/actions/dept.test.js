// import axios from "axios";
// import * as router from 'connected-react-router';

import * as actionCreators from "./dept";
import store from "../store";

describe("Category Actions", () => {
  it("getDeptList", () => {
    store.dispatch(actionCreators.getDeptList()).then(() => {
      done();
    });
  });
});
