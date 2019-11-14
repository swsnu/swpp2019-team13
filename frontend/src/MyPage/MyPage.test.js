import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import MyPage from "./MyPage";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as userActions from "../store/actions/user";
import * as clubActions from "../store/actions/club";
import * as somoimActions from "../store/actions/somoim";
import * as categoryActions from "../store/actions/category";
import * as tagActions from "../store/actions/tag";
import * as deptActions from "../store/actions/dept";
import * as majorActions from "../store/actions/major";

let stubInitialState = {
  clubs: [
    {
      id: 0,
      name: "SNUStone",
      content: "SNU Best HearthStone Club",
      clubmanager: "김지훈",
      category: 0,
      auth_img: "1",
      isRegistered: true,
      available_major: [1],
      tags: [1, 2],
      likers: [],
      likes: 10,
      majors: []
    },
    {
      id: 1,
      name: "SnuWOD",
      content: "SNU Best Training Club",
      clubmanager: "김동우",
      category: 6,
      auth_img: "2",
      isRegistered: true,
      tags: [2, 3],
      available_major: [1],
      likers: [],
      likes: 15,
      majors: []
    },

    {
      id: 2,
      name: "SnuLoL",
      content: "SNU Best LoL Club",
      clubmanager: "김도현",
      category: 6,
      auth_img: "3",
      isRegistered: true,
      tags: [2, 3],
      available_major: [1],
      likers: [],
      likes: 20,
      majors: []
    }
  ],
  somoims: [
    {
      id: 0,
      title: "Let's LoL!",
      summary: "Playing LoL together!! :D",
      description: "LoL\nLoL\nLol",
      selected_dept: [0, 1],
      available_semester: 1,
      tags: [1],
      goalJoiner: 20,
      currentJoiner: 7,
      likes: 10,
      available_major: [0, 1],
      joiners: [],
      likers: []
    },
    {
      id: 1,
      title: "Book lovers",
      summary: "We read books until we fall asleep..",
      description: "Actually, it's sleep somoim :)",
      selected_dept: [0, 1, 3, 4, 5],
      available_semester: 1,
      tags: [2, 3],
      goalJoiner: 10,
      currentJoiner: 3,
      likes: 5,
      available_major: [0, 1],
      joiners: [],
      likers: []
    },
    {
      id: 2,
      title: "test somoim",
      summary: "i am testing the somoim list",
      description: "Me too bro",
      selected_dept: [0, 1, 3, 4, 5],
      available_semester: 3,
      tags: [4, 5],
      goalJoiner: 10,
      currentJoiner: 9,
      likes: 5,
      available_major: [0, 1],
      joiners: [],
      likers: []
    },
    {
      id: 3,
      title: "301 assa somoim",
      summary: "We are assa in 301",
      description: "Sad..",
      selected_dept: [0, 1, 3, 4, 5],
      available_semester: 5,
      tags: [6, 7],
      goalJoiner: 10,
      currentJoiner: 1,
      likes: 5,
      available_major: [0, 1],
      joiners: [],
      likers: []
    }
  ],
  depts: [
    {
      id: 0,
      name: "공과대학"
    },
    {
      id: 1,
      name: "인문대학"
    },
    {
      id: 2,
      name: "자연과학대학"
    }
  ],
  majors: [
    {
      id: 0,
      dept_id: 0,
      name: "건설환경공학부"
    },
    {
      id: 1,
      dept_id: 0,
      name: "기계항공공학부"
    },
    {
      id: 2,
      dept_id: 0,
      name: "재료공학부"
    },
    {
      id: 3,
      dept_id: 0,
      name: "전기정보공학부"
    },
    {
      id: 4,
      dept_id: 0,
      name: "컴퓨터공학부"
    }
  ],
  loggedUser: {
    username: "test",
    email: "test@test.com",
    password: "test",
    dept: 0,
    major: 3,
    grade: 3,
    available_semester: 2
  }
};

let mockStore = getMockStore(stubInitialState);

describe("<MyPage />", () => {
  let myPage;
  let spyGetLoginInfo,
    spyGetClubList,
    spyGetSomoimList,
    spyGetCategoryList,
    spyGetTagList,
    spyGetDeptList,
    spyGetMajorList,
    spyGetManagingClubs,
    spyGetLikedClubs,
    spyGetAppliedClubs,
    spyGetManagingSomoims,
    spyGetLikedSomoims,
    spyGetJoinedSomoims;

  beforeEach(() => {
    myPage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <MyPage />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spyGetLoginInfo = jest
      .spyOn(userActions, "getLoginInfo")
      .mockImplementation(() => {
        return dispatch => {};
      });

    spyGetClubList = jest
      .spyOn(clubActions, "getClubList")
      .mockImplementation(() => {
        return dispatch => {};
      });

    spyGetSomoimList = jest
      .spyOn(somoimActions, "getSomoimList")
      .mockImplementation(() => {
        return dispatch => {};
      });

    spyGetCategoryList = jest
      .spyOn(categoryActions, "getCategoryList")
      .mockImplementation(() => {
        return dispatch => {};
      });

    spyGetTagList = jest
      .spyOn(tagActions, "getTagList")
      .mockImplementation(() => {
        return dispatch => {};
      });

    spyGetDeptList = jest
      .spyOn(deptActions, "getDeptList")
      .mockImplementation(() => {
        return dispatch => {};
      });

    spyGetMajorList = jest
      .spyOn(majorActions, "getMajorList")
      .mockImplementation(() => {
        return dispatch => {};
      });

    spyGetManagingClubs = jest
      .spyOn(userActions, "getManagingClubs")
      .mockImplementation(() => {
        return dispatch => {};
      });
    spyGetLikedClubs = jest
      .spyOn(userActions, "getLikedClubs")
      .mockImplementation(() => {
        return dispatch => {};
      });
    spyGetAppliedClubs = jest
      .spyOn(userActions, "getAppliedClubs")
      .mockImplementation(() => {
        return dispatch => {};
      });

    spyGetManagingSomoims = jest
      .spyOn(userActions, "getManagingSomoims")
      .mockImplementation(() => {
        return dispatch => {};
      });
    spyGetLikedSomoims = jest
      .spyOn(userActions, "getLikedSomoims")
      .mockImplementation(() => {
        return dispatch => {};
      });
    spyGetJoinedSomoims = jest
      .spyOn(userActions, "getJoinedSomoims")
      .mockImplementation(() => {
        return dispatch => {};
      });
  });

  it("should render Page", () => {
    const component = mount(myPage);
    const wrapper = component.find("MyPage");
    expect(wrapper.length).toBe(1);
  });

  it("should render all tabs", () => {
    let component = mount(myPage);
    let mainInstance = component.find("MyPage").instance();
    let wrapper = component.find("SelfInfoTab");
    expect(wrapper.length).toBe(1);
    mainInstance.setState({ ...mainInstance.state, tab: 1 });
    component.update();
    wrapper = component.find("ManagingClubTab");
    expect(wrapper.length).toBe(1);
    mainInstance.setState({ ...mainInstance.state, tab: 2 });
    component.update();
    wrapper = component.find("LikedClubTab");
    expect(wrapper.length).toBe(1);
    mainInstance.setState({ ...mainInstance.state, tab: 3 });
    component.update();
    wrapper = component.find("AppliedClubTab");
    expect(wrapper.length).toBe(1);
    mainInstance.setState({ ...mainInstance.state, tab: 4 });
    component.update();
    wrapper = component.find("ManagingSomoimTab");
    expect(wrapper.length).toBe(1);
    mainInstance.setState({ ...mainInstance.state, tab: 5 });
    component.update();
    wrapper = component.find("LikedSomoimTab");
    expect(wrapper.length).toBe(1);
    mainInstance.setState({ ...mainInstance.state, tab: 6 });
    component.update();
    wrapper = component.find("JoinedSomoimTab");
    expect(wrapper.length).toBe(1);
  });

  it("self info button click event handling", () => {
    const component = mount(myPage);
    const mainInstance = component.find("MyPage").instance();
    const wrapper = component.find(".self-info-button");
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.tab).toBe(0);
  });

  it("manage club button click event handling", () => {
    const component = mount(myPage);
    const mainInstance = component.find("MyPage").instance();
    const wrapper = component.find(".manage-club-button");
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.tab).toBe(1);
  });

  it("like club button click event handling", () => {
    const component = mount(myPage);
    const mainInstance = component.find("MyPage").instance();
    const wrapper = component.find(".like-club-button");
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.tab).toBe(2);
  });

  it("apply club button click event handling", () => {
    const component = mount(myPage);
    const mainInstance = component.find("MyPage").instance();
    const wrapper = component.find(".apply-club-button");
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.tab).toBe(3);
  });

  it("manage somoim button click event handling", () => {
    const component = mount(myPage);
    const mainInstance = component.find("MyPage").instance();
    const wrapper = component.find(".manage-somoim-button");
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.tab).toBe(4);
  });

  it("like somoim button click event handling", () => {
    const component = mount(myPage);
    const mainInstance = component.find("MyPage").instance();
    const wrapper = component.find(".like-somoim-button");
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.tab).toBe(5);
  });

  it("join somoim button click event handling", () => {
    const component = mount(myPage);
    const mainInstance = component.find("MyPage").instance();
    const wrapper = component.find(".join-somoim-button");
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.tab).toBe(6);
  });

  it("not existing tab (cannot happen)", () => {
    const component = mount(myPage);
    const mainInstance = component.find("MyPage").instance();
    mainInstance.setState({ ...mainInstance.state, tab: 7 });
    component.update();
    expect(mainInstance.state.tab).toBe(7);
  });

  it("when logged user info does not loaded yet", () => {
    let savedLoggedUser = stubInitialState.loggedUser;
    stubInitialState.loggedUser = null;
    mockStore = getMockStore(stubInitialState);
    myPage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <MyPage />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(myPage);

    stubInitialState.loggedUser = savedLoggedUser;
    mockStore = getMockStore(stubInitialState);
  });

  it("when dept info does not loaded yet", () => {
    let savedInfo = stubInitialState.depts;
    stubInitialState.depts = null;
    mockStore = getMockStore(stubInitialState);
    myPage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <MyPage />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(myPage);

    stubInitialState.depts = savedInfo;
    mockStore = getMockStore(stubInitialState);
  });

  it("when major info does not loaded yet", () => {
    let savedInfo = stubInitialState.majors;
    stubInitialState.majors = null;
    mockStore = getMockStore(stubInitialState);
    myPage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <MyPage />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(myPage);

    stubInitialState.majors = savedInfo;
    mockStore = getMockStore(stubInitialState);
  });

  it("not logged in user", () => {
    let saved = stubInitialState.loggedUser;
    stubInitialState.loggedUser = null;
    mockStore = getMockStore(stubInitialState);
    myPage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <MyPage />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    let component = mount(myPage);
    component.update();
    let mainInstance = component.find("MyPage").instance();
    // expect(spyGetRecommendedClubs).toBeCalledTimes(7);
    mainInstance.setState({ ...mainInstance.state, isUserInfoLoaded: true });

    stubInitialState.loggedUser = saved;
    mockStore = getMockStore(stubInitialState);
  });
});
