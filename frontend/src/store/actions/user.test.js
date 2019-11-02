// import axios from "axios";
// import * as router from 'connected-react-router';

import * as actionCreators from "./user";
import store from "../store";

let loggedUser = {
  username: "test",
  email: "test@test.com",
  password: "test",
  dept: 0,
  major: 3,
  grade: 3,
  availableSemester: 2
};

describe("Category Actions", () => {
  it("signUp", () => {
    store.dispatch(actionCreators.signUp(loggedUser)).then(() => {
      done();
    });
  });

  it("signIn", () => {
    store.dispatch(actionCreators.signIn(loggedUser)).then(() => {
      done();
    });
  });

  it("signOut", () => {
    store.dispatch(actionCreators.signOut()).then(() => {
      done();
    });
  });
});
