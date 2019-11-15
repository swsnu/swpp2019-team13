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
    { id: 0, name: "friendship" },
    { id: 1, name: "love" },
    { id: 2, name: "sport" },
    { id: 3, name: "game" },
    { id: 4, name: "study" },
    { id: 5, name: "music" },
    { id: 6, name: "art" },
    { id: 7, name: "nothing" }
  ],
  majors: [
    { id: 0, name: "cs" },
    { id: 1, name: "economy" },
    { id: 2, name: "music" }
  ],

  clubs: [
    {
      id: 0,
      name: "SNUStone",
      content: "SNU Best HearthStone Club",
      clubmanager: "김지훈",
      selected_category: 0,
      auth_img: "1",
      poster_img: "1",
      isRegistered: true,
      available_major: [1],
      tags: [1],
      likers: [],
      likes: 10
    },
    {
      id: 1,
      name: "SnuWOD",
      content: "SNU Best Training Club",
      clubmanager: "김동우",
      selected_category: 6,
      auth_img: "2",
      poster_img: "1",
      isRegistered: true,
      tags: [2, 3],
      available_major: [1],
      likers: [],
      likes: 15
    },

    {
      id: 2,
      name: "SnuLoL",
      content: "SNU Best LoL Club",
      clubmanager: "김도현",
      selected_category: 6,
      auth_img: "3",
      poster_img: "1",
      isRegistered: true,
      tags: [2, 3],
      available_major: [1],
      likers: [],
      likes: 20
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
    available_session_day: 0
  },
  users: [{
    id: 0,
    name: "test",
    email: "test@test.com",
    password: "test",
    dept: 0,
    major: 1,
    grade: 3,
    available_semester: 2,
    available_session_day: 0
  }]
};

const mockStore = getMockStore(stubInitialState);

describe("<ClubDetail />", () => {
  let clubDetail, clubDetail2, clubDetail3;
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
  /*
    it("should click like", () => {
      const component = mount(clubDetail);
      const wrapper = component.find(".likebutton2").at(0);
      wrapper.simulate("click");
      expect(wrapper.length).toBe(1);
    });
    */
});
