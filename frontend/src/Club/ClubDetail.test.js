import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import ClubDetail from "./ClubDetail";
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

  clubs: [
    {
      id: 0,
      category: 0,
      name: "name0",
      description: "description0",
      managers: [
        {
          name: "manager0",
          major: { id: 0, name: "major0" }
        }
      ],
      poster_img: ["1", "2", "3", "4", "5", "6"],
      recruit_end_day: "end_day0",
      recruit_start_day: "start_day0",
      available_major: [0, 1, 2],
      tags: [1, 2],
      img_tag: [0, 1, 2],
      likers: [],
      available_semester: 1,
      session_day: 1
    },
    {
      id: 1,
      category: 1,
      name: "name1",
      description: "description1",
      img_tag: [0, 2, 1],
      managers: [
        {
          name: "manager1",
          major: { id: 1, name: "major1" }
        }
      ],
      poster_img: [],
      recruit_end_day: "end_day1",
      recruit_start_day: "start_day1",
      available_major: [1],
      tags: [1, 2],
      likers: [{ id: 0 }],
      available_semester: 2,
      session_day: 1
    },
    {
      id: 2,
      category: 2,
      name: "name2",
      description: "description2",
      managers: [
        {
          name: "manager2",
          major: { id: 2, name: "major2" }
        }
      ],
      poster_img: null,
      img_tag: [2, 1, 0],
      recruit_end_day: "end_day2",
      recruit_start_day: "start_day2",
      available_major: [2],
      tags: [1, 2],
      likers: [],
      available_semester: 3,
      session_day: 3
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

  clubs: [
    {
      id: 0,
      category: 0,
      name: "name0",
      description: "description0",
      managers: [
        {
          name: "manager0",
          major: { id: 0, name: "major0" }
        }
      ],
      poster_img: ["1", "2", "3", "4", "5", "6"],
      recruit_end_day: "end_day0",
      recruit_start_day: "start_day0",
      available_major: [0, 1, 2],
      tags: [1, 2],
      likers: [],
      available_semester: 1,
      session_day: 1
    },
    {
      id: 1,
      category: 1,
      name: "name1",
      description: "description1",
      managers: [
        {
          name: "manager1",
          major: { id: 1, name: "major1" }
        }
      ],
      poster_img: ["1", "2"],
      recruit_end_day: "end_day1",
      recruit_start_day: "start_day1",
      available_major: [1],
      tags: [1, 2],
      likers: [{ id: 0 }],
      available_semester: 1,
      session_day: 1
    },
    {
      id: 2,
      category: 2,
      name: "name2",
      description: "description2",
      managers: [
        {
          name: "manager2",
          major: { id: 2, name: "major2" }
        }
      ],
      poster_img: ["1", "2"],
      recruit_end_day: "end_day2",
      recruit_start_day: "start_day2",
      available_major: [2],
      tags: [1, 2],
      likers: [],
      available_semester: 1,
      session_day: 1
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

describe("<ClubDetail />", () => {
  let clubDetail, clubDetail2, clubDetail3, clubDetail4, clubDetail5;
  let spyCloseHandler, spyaddLikedClub, spyaddAppliedClub;

  beforeEach(() => {
    let spyCloseHandler = jest.fn();

    spyaddLikedClub = jest
      .spyOn(userActions, "addLikedClub")
      .mockImplementation(() => {
        return dispatch => { };
      });

    spyaddAppliedClub = jest
      .spyOn(userActions, "addAppliedClub")
      .mockImplementation(() => {
        return dispatch => { };
      });

    clubDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <ClubDetail
                    show={true}
                    club={stubInitialState.clubs[0]}
                    closeHandler={spyCloseHandler}
                  />
                );
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    clubDetail2 = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <ClubDetail
                    show={true}
                    club={stubInitialState.clubs[1]}
                    closeHandler={spyCloseHandler}
                  />
                );
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    clubDetail3 = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <ClubDetail
                    show={true}
                    club={stubInitialState.clubs[2]}
                    closeHandler={spyCloseHandler}
                  />
                );
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    clubDetail4 = (
      <Provider store={mockStore2}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <ClubDetail
                    show={true}
                    club={stubInitialState2.clubs[0]}
                    closeHandler={spyCloseHandler}
                  />
                );
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    clubDetail5 = (
      <Provider store={mockStore2}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <ClubDetail
                    show={true}
                    club={stubInitialState2.clubs[1]}
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
    const component = mount(clubDetail);

    const wrapper = component.find("Bootstrap(Modal)");
    expect(wrapper.length).toBe(1);
  });

  it("should render modal2", () => {
    const component = mount(clubDetail2);

    const wrapper = component.find("Bootstrap(Modal)");
    expect(wrapper.length).toBe(1);
  });

  it("should render modal3", () => {
    const component = mount(clubDetail3);

    const wrapper = component.find("Bootstrap(Modal)");
    expect(wrapper.length).toBe(1);
  });

  it("should render modal4", () => {
    const component = mount(clubDetail4);

    const wrapper = component.find("Bootstrap(Modal)");
    expect(wrapper.length).toBe(1);
  });

  it("should not render modal when club info is invalid", () => {
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <ClubDetail show={true} closeHandler={spyCloseHandler} />
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
    const component = mount(clubDetail);
    const wrapper = component.find(".liked-likebutton");
    wrapper.simulate("click");
    expect(wrapper.length).toBe(1);
  });

  it("should click unlike", () => {
    const component = mount(clubDetail2);
    const wrapper = component.find(".unliked-likebutton");
    wrapper.simulate("click");
    expect(wrapper.length).toBe(1);
  });

  it("should click next & prev_and working", () => {
    const component = mount(clubDetail);
    const wrapper = component.find(".detail-gallery-button").at(1);
    wrapper.simulate("click");
    expect(wrapper.length).toBe(1);

    const clubDetailInstance1 = component
      .find(ClubDetail.WrappedComponent)
      .instance();
    expect(clubDetailInstance1.state.selected_gallery).toEqual(2);

    const wrapper2 = component.find(".detail-gallery-button").at(0);
    wrapper2.simulate("click");
    expect(wrapper2.length).toBe(1);

    const clubDetailInstance2 = component
      .find(ClubDetail.WrappedComponent)
      .instance();
    expect(clubDetailInstance2.state.selected_gallery).toEqual(1);
  });

  it("should click next & prev_but not working", () => {
    const component = mount(clubDetail2);
    const wrapper = component.find(".detail-gallery-button").at(1);
    wrapper.simulate("click");
    expect(wrapper.length).toBe(1);

    const clubDetailInstance1 = component
      .find(ClubDetail.WrappedComponent)
      .instance();
    expect(clubDetailInstance1.state.selected_gallery).toEqual(1);

    const wrapper2 = component.find(".detail-gallery-button").at(0);
    wrapper2.simulate("click");
    expect(wrapper2.length).toBe(1);

    const clubDetailInstance2 = component
      .find(ClubDetail.WrappedComponent)
      .instance();
    expect(clubDetailInstance2.state.selected_gallery).toEqual(1);
  });

  it("should click apply", () => {
    const component = mount(clubDetail2);
    const wrapper = component.find(".applybutton").at(0);
    wrapper.simulate("click");
    expect(wrapper.length).toBe(1);
  });

  it("available_major_string_when_logged_in_1", () => {
    const component = mount(clubDetail);
    const wrapper = component.find("#available_major_string");
    expect(wrapper.text()).toBe(" : major1가 포함되어 있습니다.");
  });

  it("available_major_string_when_logged_in_2", () => {
    const component = mount(clubDetail3);
    const wrapper = component.find("#available_major_string");
    expect(wrapper.text()).toBe(" : major1가 없습니다.");
  });

  it("available_major_string_when_not_logged_in_1", () => {
    const component = mount(clubDetail4);
    const wrapper = component.find("#available_major_string");
    expect(wrapper.text()).toBe(" : 제한 없음.");
  });

  it("available_major_string_when_not_logged_in_2", () => {
    const component = mount(clubDetail5);
    const wrapper = component.find("#available_major_string");
    expect(wrapper.text()).toBe(" : major1 외 0개 학과");
  });
});
