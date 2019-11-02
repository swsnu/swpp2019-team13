// import axios from "axios";
// import * as router from 'connected-react-router';

import * as actionCreators from "./tag";
import store from "../store";

describe("Category Actions", () => {
  it("getTagList", done => {
    actionCreators.getTagList();
    store.dispatch(actionCreators.getTagList()).then(() => {
      done();
    });
  });
});
