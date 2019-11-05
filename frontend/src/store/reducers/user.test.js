import reducer from "./user";
import * as actionTypes from "../actions/actionTypes";

const stubUser = {
  username: "test2",
  email: "test2@test2.com",
  password: "test2",
  dept: 0,
  major: 4,
  grade: 3,
  available_semester: 2
};

const initialusers = [
  {
    username: "test",
    email: "test@test.com",
    password: "test",
    dept: 0,
    major: 4,
    grade: 3,
    available_semester: 2
  }
];

describe("User Reducer", () => {
  it("should return default state", () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({
      users: initialusers,
      loggedUser: null
    });
  });

  it("should sign in", () => {
    const newState = reducer(undefined, {
      type: actionTypes.SIGN_IN,
      loggedUser: stubUser
    });
    expect(newState).toEqual({
      users: initialusers,
      loggedUser: stubUser
    });
  });

  it("should sign out", () => {
    const newState = reducer(undefined, {
      type: actionTypes.SIGN_OUT
    });
    expect(newState).toEqual({
      users: initialusers,
      loggedUser: null
    });
  });

  it("should sign up", () => {
    const newState = reducer(undefined, {
      type: actionTypes.SIGN_UP,
      user: stubUser
    });
    expect(newState).toEqual({
      users: initialusers.concat(stubUser),
      loggedUser: null
    });
  });
});
