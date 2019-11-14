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
  available_semester: 2,
  available_session_day: 0
};

let stubClubs = [{ fields: {} }, { fields: {} }];
let stubSomoims = [{ fields: {} }, { fields: {} }];

let stubClub = { fields: {} };
let stubSomoim = { fields: {} };

describe("User Actions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Sign Up", done => {
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
      expect(newState.user.users[0]).toStrictEqual(stubUser);
      expect(spySignUp).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("getUserList", done => {
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

  it("Sign In", done => {
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

  it("Sign Out", done => {
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

  it("Get Login Info", done => {
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

  it("Put User Info", done => {
    const spyPutUserInfo = jest.spyOn(axios, "put").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubUser
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.putUserInformation()).then(() => {
      expect(spyPutUserInfo).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("Get Managing Club", done => {
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

  it("Get Liked Club", done => {
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

  it("Get Applied Club", done => {
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

  it("Get Recommended Club", done => {
    const spyGetRecommendedClubs = jest
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

    store.dispatch(actionCreators.getRecommendedClubs(stubUser)).then(() => {
      expect(spyGetRecommendedClubs).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("Get Managing Somoim", done => {
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

  it("Get Liked Somoim", done => {
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

  it("Get Joined Somoim", done => {
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

  it("Get Recommended Somoim", done => {
    const spyGetRecommendedSomoims = jest
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

    store.dispatch(actionCreators.getRecommendedSomoims(stubUser)).then(() => {
      expect(spyGetRecommendedSomoims).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("Add Managing Somoim", done => {
    const spyAddManagingSomoim = jest
      .spyOn(axios, "put")
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubSomoim
          };
          resolve(result);
        });
      });

    store
      .dispatch(actionCreators.addManagingSomoim(stubSomoim, stubUser))
      .then(() => {
        expect(spyAddManagingSomoim).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it("Add Joined Somoim", done => {
    const spyAddJoinedSomoim = jest
      .spyOn(axios, "put")
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubSomoim
          };
          resolve(result);
        });
      });

    store
      .dispatch(actionCreators.addJoinedSomoim(stubSomoim, stubUser))
      .then(() => {
        expect(spyAddJoinedSomoim).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it("Add Applied Club", done => {
    const spyAddAppliedClub = jest
      .spyOn(axios, "put")
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubClub
          };
          resolve(result);
        });
      });

    store
      .dispatch(actionCreators.addAppliedClub(stubClub, stubUser))
      .then(() => {
        expect(spyAddAppliedClub).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it("Add Liked Somoim", done => {
    const spyAddLikedSomoim = jest
      .spyOn(axios, "put")
      .mockImplementation(url => {
        return new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubSomoim
          };
          resolve(result);
        });
      });

    store
      .dispatch(actionCreators.addLikedSomoim(stubSomoim, stubUser))
      .then(() => {
        expect(spyAddLikedSomoim).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it("Add Liked Club", done => {
    const spyAddLikedClub = jest.spyOn(axios, "put").mockImplementation(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubClub
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.addLikedClub(stubClub, stubUser)).then(() => {
      expect(spyAddLikedClub).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
