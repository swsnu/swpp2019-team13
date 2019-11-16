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
const state1 = {
  loggedUser: null,
  users: [],
  joinedSomoims: [{ id: 3 }],
  likedClubs: [],
  likedSomoims: [],
  appliedClubs: [],
  managingSomoims: [],
  managingClubs: [],
  recommendedClubs: [],
  recommendedSomoims: []
};
const state2 = {
  loggedUser: null,
  users: [],
  joinedSomoims: [],
  likedClubs: [],
  likedSomoims: [],
  appliedClubs: [{ id: 3 }],
  managingSomoims: [],
  managingClubs: [],
  recommendedClubs: [],
  recommendedSomoims: []
};
const state3 = {
  loggedUser: null,
  users: [],
  joinedSomoims: [],
  likedClubs: [],
  likedSomoims: [{ id: 3 }],
  appliedClubs: [],
  managingSomoims: [],
  managingClubs: [],
  recommendedClubs: [],
  recommendedSomoims: []
};
const state4 = {
  loggedUser: null,
  users: [],
  joinedSomoims: [],
  likedClubs: [{ id: 3 }],
  likedSomoims: [],
  appliedClubs: [],
  managingSomoims: [],
  managingClubs: [],
  recommendedClubs: [],
  recommendedSomoims: []
};
const stubClub = {};

const stubSomoim = {};
const stubSomoim2 = { id: 3 };
const stubClub2 = { id: 3 };

const initialusers = [];

describe("User Reducer", () => {
  it("should return default state", () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({
      users: initialusers,
      loggedUser: null,
      likedClubs: [],
      likedSomoims: [],
      appliedClubs: [],
      joinedSomoims: [],
      managingSomoims: [],
      managingClubs: [],
      recommendedClubs: [],
      recommendedSomoims: []
    });
  });

  it("should sign in", () => {
    const newState = reducer(undefined, {
      type: actionTypes.SIGN_IN,
      loggedUser: stubUser
    });
    expect(newState).toEqual({
      users: initialusers,
      loggedUser: stubUser,
      likedClubs: [],
      likedSomoims: [],
      appliedClubs: [],
      joinedSomoims: [],
      managingSomoims: [],
      managingClubs: [],
      recommendedClubs: [],
      recommendedSomoims: []
    });
  });

  it("should sign out", () => {
    const newState = reducer(undefined, {
      type: actionTypes.SIGN_OUT
    });
    expect(newState).toEqual({
      users: initialusers,
      loggedUser: null,
      likedClubs: [],
      likedSomoims: [],
      appliedClubs: [],
      joinedSomoims: [],
      managingSomoims: [],
      managingClubs: [],
      recommendedClubs: [],
      recommendedSomoims: []
    });
  });

  it("should sign up", () => {
    const newState = reducer(undefined, {
      type: actionTypes.SIGN_UP,
      user: stubUser
    });
    expect(newState).toEqual({
      users: initialusers.concat(stubUser),
      loggedUser: null,
      likedClubs: [],
      likedSomoims: [],
      appliedClubs: [],
      joinedSomoims: [],
      managingSomoims: [],
      managingClubs: [],
      recommendedClubs: [],
      recommendedSomoims: []
    });
  });

  it("should get login info", () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_LOGIN_INFO,
      loggedUser: stubUser
    });
    expect(newState).toEqual({
      users: initialusers,
      loggedUser: stubUser,
      likedClubs: [],
      likedSomoims: [],
      appliedClubs: [],
      joinedSomoims: [],
      managingSomoims: [],
      managingClubs: [],
      recommendedClubs: [],
      recommendedSomoims: []
    });
  });

  it("should get login info2", () => {
    const newState = reducer(undefined, {
      type: actionTypes.PUT_USER_INFORMATION,
      loggedUser: stubUser
    });
    expect(newState).toEqual({
      users: initialusers,
      loggedUser: stubUser,
      likedClubs: [],
      likedSomoims: [],
      appliedClubs: [],
      joinedSomoims: [],
      managingSomoims: [],
      managingClubs: [],
      recommendedClubs: [],
      recommendedSomoims: []
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
      managingClubs: stubClub,
      likedClubs: [],
      likedSomoims: [],
      appliedClubs: [],
      joinedSomoims: [],
      managingSomoims: [],
      recommendedClubs: [],
      recommendedSomoims: []
    });
  });

  it("should get recommended clubs", () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_RECOMMENDED_CLUBS,
      clubs: stubClub
    });
    expect(newState).toEqual({
      loggedUser: null,
      users: initialusers,
      managingClubs: [],
      likedClubs: [],
      likedSomoims: [],
      appliedClubs: [],
      joinedSomoims: [],
      managingSomoims: [],
      recommendedClubs: stubClub,
      recommendedSomoims: []
    });
  });

  it("should get recommended somoims", () => {
    const newState = reducer(undefined, {
      type: actionTypes.GET_RECOMMENDED_SOMOIMS,
      somoims: stubSomoim
    });
    expect(newState).toEqual({
      loggedUser: null,
      users: initialusers,
      managingClubs: [],
      likedClubs: [],
      likedSomoims: [],
      appliedClubs: [],
      joinedSomoims: [],
      managingSomoims: [],
      recommendedClubs: [],
      recommendedSomoims: stubSomoim
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
      likedClubs: stubClub,
      likedSomoims: [],
      appliedClubs: [],
      joinedSomoims: [],
      managingSomoims: [],
      managingClubs: [],
      recommendedClubs: [],
      recommendedSomoims: []
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
      appliedClubs: stubClub,
      likedClubs: [],
      likedSomoims: [],
      joinedSomoims: [],
      managingSomoims: [],
      managingClubs: [],
      recommendedClubs: [],
      recommendedSomoims: []
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
      managingSomoims: stubSomoim,
      likedClubs: [],
      likedSomoims: [],
      appliedClubs: [],
      joinedSomoims: [],
      managingClubs: [],
      recommendedClubs: [],
      recommendedSomoims: []
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
      likedSomoims: stubSomoim,
      likedClubs: [],
      appliedClubs: [],
      joinedSomoims: [],
      managingSomoims: [],
      managingClubs: [],
      recommendedClubs: [],
      recommendedSomoims: []
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
      joinedSomoims: stubSomoim,
      likedClubs: [],
      likedSomoims: [],
      appliedClubs: [],
      managingSomoims: [],
      managingClubs: [],
      recommendedClubs: [],
      recommendedSomoims: []
    });
  });

  it("should add joined somoims", () => {
    const newState = reducer(undefined, {
      type: actionTypes.ADD_JOINED_SOMOIM,
      newJoinedSomoim: stubSomoim2
    });
    expect(newState).toEqual({
      loggedUser: null,
      users: initialusers,
      joinedSomoims: [].concat(stubSomoim2),
      likedClubs: [],
      likedSomoims: [],
      appliedClubs: [],
      managingSomoims: [],
      managingClubs: [],
      recommendedClubs: [],
      recommendedSomoims: []
    });
  });

  it("should delete existing joined somoims", () => {
    const newState = reducer(state1, {
      type: actionTypes.ADD_JOINED_SOMOIM,
      newJoinedSomoim: stubSomoim2
    });
    expect(newState).toEqual({
      loggedUser: null,
      users: initialusers,
      joinedSomoims: [],
      likedClubs: [],
      likedSomoims: [],
      appliedClubs: [],
      managingSomoims: [],
      managingClubs: [],
      recommendedClubs: [],
      recommendedSomoims: []
    });
  });

  it("should add liked somoims", () => {
    const newState = reducer(undefined, {
      type: actionTypes.ADD_LIKED_SOMOIM,
      newLikedSomoim: stubSomoim2
    });
    expect(newState).toEqual({
      loggedUser: null,
      users: initialusers,
      joinedSomoims: [],
      likedClubs: [],
      likedSomoims: [].concat(stubSomoim2),
      appliedClubs: [],
      managingSomoims: [],
      managingClubs: [],
      recommendedClubs: [],
      recommendedSomoims: []
    });
  });

  it("should delete existing liked somoims", () => {
    const newState = reducer(state3, {
      type: actionTypes.ADD_LIKED_SOMOIM,
      newLikedSomoim: stubSomoim2
    });
    expect(newState).toEqual({
      loggedUser: null,
      users: initialusers,
      joinedSomoims: [],
      likedClubs: [],
      likedSomoims: [],
      appliedClubs: [],
      managingSomoims: [],
      managingClubs: [],
      recommendedClubs: [],
      recommendedSomoims: []
    });
  });

  it("should add liked clubs", () => {
    const newState = reducer(undefined, {
      type: actionTypes.ADD_LIKED_CLUB,
      newLikedClub: stubClub2
    });
    expect(newState).toEqual({
      loggedUser: null,
      users: initialusers,
      joinedSomoims: [],
      likedClubs: [].concat(stubClub2),
      likedSomoims: [],
      appliedClubs: [],
      managingSomoims: [],
      managingClubs: [],
      recommendedClubs: [],
      recommendedSomoims: []
    });
  });

  it("should delete existing liked clubs", () => {
    const newState = reducer(state4, {
      type: actionTypes.ADD_LIKED_CLUB,
      newLikedClub: stubClub2
    });
    expect(newState).toEqual({
      loggedUser: null,
      users: initialusers,
      joinedSomoims: [],
      likedClubs: [],
      likedSomoims: [],
      appliedClubs: [],
      managingSomoims: [],
      managingClubs: [],
      recommendedClubs: [],
      recommendedSomoims: []
    });
  });

  it("should add managing somoims", () => {
    const newState = reducer(undefined, {
      type: actionTypes.ADD_MANAGING_SOMOIM,
      newManagingSomoim: stubSomoim2
    });
    expect(newState).toEqual({
      loggedUser: null,
      users: initialusers,
      joinedSomoims: [],
      likedClubs: [],
      likedSomoims: [],
      appliedClubs: [],
      managingSomoims: [].concat(stubSomoim2),
      managingClubs: [],
      recommendedClubs: [],
      recommendedSomoims: []
    });
  });

  it("should add applied clubs", () => {
    const newState = reducer(undefined, {
      type: actionTypes.ADD_APPLIED_CLUB,
      newAppliedClub: stubClub2
    });
    expect(newState).toEqual({
      loggedUser: null,
      users: initialusers,
      joinedSomoims: [],
      likedClubs: [],
      likedSomoims: [],
      appliedClubs: [].concat(stubClub2),
      managingSomoims: [],
      managingClubs: [],
      recommendedClubs: [],
      recommendedSomoims: []
    });
  });

  it("should delete existing applied clubs", () => {
    const newState = reducer(state2, {
      type: actionTypes.ADD_APPLIED_CLUB,
      newAppliedClub: stubClub2
    });
    expect(newState).toEqual({
      loggedUser: null,
      users: initialusers,
      joinedSomoims: [],
      likedClubs: [],
      likedSomoims: [],
      appliedClubs: [],
      managingSomoims: [],
      managingClubs: [],
      recommendedClubs: [],
      recommendedSomoims: []
    });
  });
});
