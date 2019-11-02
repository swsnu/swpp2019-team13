// import axios from "axios";
// import * as router from 'connected-react-router';

import * as actionCreators from "./somoim";
import store from "../store";

describe("Category Actions", () => {
  it("postSomoim", done => {
    let input = {
      title: null,
      summary: null,
      description: null,
      selected_dept: null,
      available_sem: null,
      goalJoiner: null
    };
    store.dispatch(actionCreators.postSomoim(input)).then(() => {
      done();
    });
  });

  it("getSomoimList", done => {
    store.dispatch(actionCreators.getSomoimList()).then(() => {
      done();
    });
  });

  it("getSomoimByID", done => {
    store.dispatch(actionCreators.getSomoimByID()).then(() => {
      done();
    });
  });
});
