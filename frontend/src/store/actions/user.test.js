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
  availableSemester: 2
};

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

  // it("Sign In Fail case", () => {
  //   const spySignIn = jest.spyOn(axios, "post").mockImplementation(url => {
  //     return new Promise((resolve, reject) => {
  //       reject();
  //     });
  //   });

  //   store.dispatch(actionCreators.signIn()).then(() => {
  //     expect(spySignIn).toHaveBeenCalledTimes(1);
  //     done();
  //   });
  // });

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

  it("Get Liked Club", () => {
    const spyGetLikedClubs = jest
      .spyOn(axios, "get")
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200
          };
          resolve(result);
        });
      });

    store.dispatch(actionCreators.getLikedClubs(stubUser)).then(() => {
      expect(spyGetLikedClubs).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
