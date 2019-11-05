import reducer from "./user";
import * as actionTypes from "../actions/actionTypes";

const stubUser = {
  name: "test2",
  email: "test2@test2.com",
  password: "test2",
  dept: 0,
  major: 4,
  grade: 3,
  available_semester: 2
};

const stubClub = {};

const stubSomoim = {};

const initialusers = [];

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

  it("should get login info", () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_LOGIN_INFO,
      loggedUser: stubUser
    });
    expect(newState).toEqual({
      users: initialusers,
      loggedUser: stubUser
    });
  });

  it("should get managing clubs", () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_MANAGING_CLUBS,
      clubs: stubClub
    });
    expect(newState).toEqual({
      loggedUser: null,
      users: initialusers,
      managingClubs: stubClub
    });
  });

  it("should get liked clubs", () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_LIKED_CLUBS,
      clubs: stubClub
    });
    expect(newState).toEqual({
      loggedUser: null,
      users: initialusers,
      likedClubs: stubClub
    });
  });

  it("should get applies clubs", () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_APPLIED_CLUBS,
      clubs: stubClub
    });
    expect(newState).toEqual({
      loggedUser: null,
      users: initialusers,
      appliedClubs: stubClub
    });
  });

  it("should get managing somoims", () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_MANAGING_SOMOIMS,
      somoims: stubSomoim
    });
    expect(newState).toEqual({
      loggedUser: null,
      users: initialusers,
      managingSomoims: stubSomoim
    });
  });

  it("should get liked somoims", () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_LIKED_SOMOIMS,
      somoims: stubSomoim
    });
    expect(newState).toEqual({
      loggedUser: null,
      users: initialusers,
      likedSomoims: stubSomoim
    });
  });

  it("should get joined somoims", () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_JOINED_SOMOIMS,
      somoims: stubSomoim
    });
    expect(newState).toEqual({
      loggedUser: null,
      users: initialusers,
      joinedSomoims: stubSomoim
    });
  });
});
