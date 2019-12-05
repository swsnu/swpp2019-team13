import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import SomoimDetail from "./SomoimDetail";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as userActions from "../store/actions/user";
import * as clubActions from "../store/actions/club";
import * as somoimActions from "../store/actions/somoim";
import * as categoryActions from "../store/actions/category";
import * as tagActions from "../store/actions/tag";
import * as deptActions from "../store/actions/dept";
import * as majorActions from "../store/actions/major";

const stubInitialState = {
  tags: [
    { id: 0, name: "tag0" },
    { id: 1, name: "tag1" },
    { id: 2, name: "tag2" }
  ],

  majors: [
    { id: 0, name: "major0" },
    { id: 1, name: "major1" },
    { id: 2, name: "major2" }
  ],

  somoims: [
    {
      id: 0,
      title: "title0",
      summary: "summary0",
      description: "description0",
      managers: [
        {
          name: "manager0",
          major: { id: 0, name: "major0" }
        }
      ],
      available_semester: 1,
      tags: [1],
      goalJoiner: 20,
      available_major: [0, 1, 2],
      joiners: [],
      likers: [],
      session_day: 0
    },
    {
      id: 1,
      title: "title1",
      summary: "summary1",
      description: "description1",
      managers: [
        {
          name: "manager1",
          major: { id: 1, name: "major1" }
        }
      ],
      available_semester: 1,
      tags: [2],
      goalJoiner: 10,
      available_major: [0, 1],
      joiners: [],
      likers: [{ id: 0 }],
      session_day: 1
    },
    {
      id: 2,
      title: "title2",
      summary: "summary2",
      description: "description2",
      managers: [
        {
          name: "manager2",
          major: { id: 2, name: "major2" }
        }
      ],
      available_semester: 3,
      tags: [3],
      goalJoiner: 10,
      available_major: [2],
      joiners: [],
      likers: [{ id: 0 }]
    }
  ],

  loggedUser: {
    id: 0,
    name: "test",
    email: "test@test.com",
    password: "test",
    dept: 0,
    major: 1,
    grade: 3,
    available_semester: 2,
    available_session_day: 1
  },

  users: [
    {
      id: 0,
      name: "test",
      email: "test@test.com",
      password: "test",
      dept: 0,
      major: 1,
      grade: 3,
      available_semester: 2,
      available_session_day: 1
    }
  ]
};

const stubInitialState2 = {
  tags: [],

  majors: [
    { id: 0, name: "major0" },
    { id: 1, name: "major1" },
    { id: 2, name: "major2" }
  ],

  somoims: [
    {
      id: 0,
      title: "title0",
      summary: "summary0",
      description: "description0",
      managers: [
        {
          name: "manager0",
          major: { id: 0, name: "major0" }
        }
      ],
      available_semester: 1,
      tags: [1],
      goalJoiner: 20,
      available_major: [0, 1, 2],
      joiners: [],
      likers: [{ id: 0 }],
      session_day: 0
    },
    {
      id: 1,
      title: "title1",
      summary: "summary1",
      description: "description1",
      managers: [
        {
          name: "manager1",
          major: { id: 1, name: "major1" }
        }
      ],
      available_semester: 1,
      tags: [2],
      goalJoiner: 10,
      available_major: [0, 1],
      joiners: [],
      likers: [{ id: 0 }],
      session_day: 1
    },
    {
      id: 2,
      title: "title2",
      summary: "summary2",
      description: "description2",
      managers: [
        {
          name: "manager2",
          major: { id: 2, name: "major2" }
        }
      ],
      available_semester: 3,
      tags: [3],
      goalJoiner: 10,
      available_major: [2],
      joiners: [],
      likers: []
    }
  ],

  loggedUser: null,

  users: [
    {
      id: 0,
      name: "test",
      email: "test@test.com",
      password: "test",
      dept: 0,
      major: 1,
      grade: 3,
      available_semester: 2,
      available_session_day: 1
    }
  ]
};
const mockStore = getMockStore(stubInitialState);
const mockStore2 = getMockStore(stubInitialState2);

describe("<SomoimDetail />", () => {
  let somoimDetail, somoimDetail2, somoimDetail3, somoimDetail4, somoimDetail5;
  let spyCloseHandler, spyaddLikedSomoim, spyaddJoinedSomoim;

  beforeEach(() => {
    spyCloseHandler = jest.fn();

    spyaddLikedSomoim = jest
      .spyOn(userActions, "addLikedSomoim")
      .mockImplementation(() => {
        return dispatch => {};
      });

    spyaddJoinedSomoim = jest
      .spyOn(userActions, "addJoinedSomoim")
      .mockImplementation(() => {
        return dispatch => {};
      });

    somoimDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <SomoimDetail
                    show={true}
                    somoim={stubInitialState.somoims[0]}
                    closeHandler={spyCloseHandler}
                  />
                );
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    somoimDetail2 = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <SomoimDetail
                    show={true}
                    somoim={stubInitialState.somoims[1]}
                    closeHandler={spyCloseHandler}
                  />
                );
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    somoimDetail3 = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <SomoimDetail
                    show={true}
                    somoim={stubInitialState.somoims[2]}
                    closeHandler={spyCloseHandler}
                  />
                );
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    somoimDetail4 = (
      <Provider store={mockStore2}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <SomoimDetail
                    show={true}
                    somoim={stubInitialState2.somoims[0]}
                    closeHandler={spyCloseHandler}
                  />
                );
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    somoimDetail5 = (
      <Provider store={mockStore2}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <SomoimDetail
                    show={true}
                    somoim={stubInitialState2.somoims[1]}
                    closeHandler={spyCloseHandler}
                  />
                );
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it("should render modal", () => {
    const component = mount(somoimDetail);

    const wrapper = component.find("Bootstrap(Modal)");
    expect(wrapper.length).toBe(1);
  });

  it("should render modal2", () => {
    const component = mount(somoimDetail2);

    const wrapper = component.find("Bootstrap(Modal)");
    expect(wrapper.length).toBe(1);
  });

  it("should render modal3", () => {
    const component = mount(somoimDetail3);

    const wrapper = component.find("Bootstrap(Modal)");
    expect(wrapper.length).toBe(1);
  });

  it("should render modal4", () => {
    const component = mount(somoimDetail4);

    const wrapper = component.find("Bootstrap(Modal)");
    expect(wrapper.length).toBe(1);
  });

  it("should not render modal when somoim info is invalid", () => {
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <SomoimDetail show={true} closeHandler={spyCloseHandler} />
                );
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    const wrapper = component.find("Bootstrap(Modal)");
    expect(wrapper.length).toBe(0);
  });

  it("should click like", () => {
    const component = mount(somoimDetail);
    const wrapper = component.find(".liked-likebutton");
    wrapper.simulate("click");
    expect(wrapper.length).toBe(1);
  });

  it("should click unlike", () => {
    const component = mount(somoimDetail2);
    const wrapper = component.find(".unliked-likebutton");
    wrapper.simulate("click");
    expect(wrapper.length).toBe(1);
  });

  it("should click join", () => {
    const component = mount(somoimDetail2);
    const wrapper = component.find(".joinbutton").at(0);
    wrapper.simulate("click");
    expect(wrapper.length).toBe(1);
  });

  it("available_major_string_when_logged_in_1", () => {
    const component = mount(somoimDetail);
    const wrapper = component.find("#available_major_string");
    expect(wrapper.text()).toBe(" : major1가 포함되어 있습니다.");
  });

  it("available_major_string_when_logged_in_2", () => {
    const component = mount(somoimDetail3);
    const wrapper = component.find("#available_major_string");
    expect(wrapper.text()).toBe(" : major1가 없습니다.");
  });

  it("available_major_string_when_not_logged_in_1", () => {
    const component = mount(somoimDetail4);
    const wrapper = component.find("#available_major_string");
    expect(wrapper.text()).toBe(" : 제한 없음.");
  });

  it("available_major_string_when_not_logged_in_2", () => {
    const component = mount(somoimDetail5);
    const wrapper = component.find("#available_major_string");
    expect(wrapper.text()).toBe(" : major1 외 1개 학과");
  });
});
