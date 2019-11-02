// import axios from "axios";
// import * as router from 'connected-react-router';

import * as actionCreators from "./club";
import store from "../store";

describe("Category Actions", () => {
  it("postClub", done => {
    let input = {
      name: null,
      clubmanager: null,
      auth_img_file: null,
      selected_category: null
    };
    store.dispatch(actionCreators.postClub(input)).then(() => {
      done();
    });
  });

  it("getClubList", done => {
    store.dispatch(actionCreators.getClubList()).then(() => {
      done();
    });
  });

  it("getClubByID", done => {
    store.dispatch(actionCreators.getClubByID()).then(() => {
      done();
    });
  });
});
