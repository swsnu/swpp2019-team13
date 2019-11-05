import axios from "axios";

import * as actionCreators from "./user";
import store from "../store";

let stubUser = {
  id: 0,
  name: "test",
  email: "test@test.com",
  password: "test",
  dept: 0,
  major: 3,
  grade: 3,
  available_semester: 2
};

let stubClubs = [{ fields: {} }, { fields: {} }];
let stubSomoims = [{ fields: {} }, { fields: {} }];

describe("User Actions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("getUserList", () => {
    const stubUserList = [stubUser];

    const spyGetUserList = jest.spyOn(axios, "get").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubUserList
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getUserList()).then(() => {
      const newState = store.getState();
      expect(newState.user.users).toBe(stubUserList);
      expect(spyGetUserList).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("Sign In", () => {
    const spySignIn = jest.spyOn(axios, "post").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubUser
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.signIn()).then(() => {
      const newState = store.getState();
      expect(newState.user.loggedUser).toBe(stubUser);
      expect(spySignIn).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("Sign Out", () => {
    const spySignOut = jest.spyOn(axios, "get").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 204
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.signOut()).then(() => {
      expect(spySignOut).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("Sign Up", () => {
    const spySignUp = jest.spyOn(axios, "post").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubUser
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.signUp(stubUser)).then(() => {
      const newState = store.getState();
      expect(newState.user.users).toBe([stubUser]);
      expect(spySignUp).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("Get Login Info", () => {
    const spyGetLoginInfo = jest.spyOn(axios, "get").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubUser
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.getLoginInfo()).then(() => {
      expect(spyGetLoginInfo).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("Get Managing Club", () => {
    const spyGetManagingClubs = jest
      .spyOn(axios, "get")
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubClubs
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.getManagingClubs(stubUser)).then(() => {
      expect(spyGetManagingClubs).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("Get Liked Club", () => {
    const spyGetLikedClubs = jest
      .spyOn(axios, "get")
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubClubs
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.getLikedClubs(stubUser)).then(() => {
      expect(spyGetLikedClubs).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("Get Applied Club", () => {
    const spyGetAppliedClubs = jest
      .spyOn(axios, "get")
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubClubs
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.getAppliedClubs(stubUser)).then(() => {
      expect(spyGetAppliedClubs).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("Get Managing Somoim", () => {
    const spyGetManagingSomoims = jest
      .spyOn(axios, "get")
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubSomoims
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.getManagingSomoims(stubUser)).then(() => {
      expect(spyGetManagingSomoims).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("Get Liked Somoim", () => {
    const spyGetLikedSomoims = jest
      .spyOn(axios, "get")
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubSomoims
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.getLikedSomoims(stubUser)).then(() => {
      expect(spyGetLikedSomoims).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("Get Joined Somoim", () => {
    const spyGetJoinedSomoims = jest
      .spyOn(axios, "get")
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubSomoims
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.getJoinedSomoims(stubUser)).then(() => {
      expect(spyGetJoinedSomoims).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
