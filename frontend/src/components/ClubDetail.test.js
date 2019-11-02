import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import ClubDetail from "./ClubDetail";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";

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

  clubs: [
    {
      id: 0,
      name: "SNUStone",
      content: "SNU Best HearthStone Club",
      clubmanager: "김지훈",
      selected_category: 0,
      auth_img_file: "1",
      isRegistered: true,
      tag: [0, 1],
      likes: 10
    },
    {
      id: 1,
      name: "SnuWOD",
      content: "SNU Best Training Club",
      clubmanager: "김동우",
      selected_category: 6,
      auth_img_file: "2",
      isRegistered: true,
      tag: [2, 3],
      likes: 15
    },

    {
      id: 2,
      name: "SnuLoL",
      content: "SNU Best LoL Club",
      clubmanager: "김도현",
      selected_category: 6,
      auth_img_file: "3",
      isRegistered: true,
      tag: [2, 3],
      likes: 20
    }
  ]
};

const mockStore = getMockStore(stubInitialState);

describe("<ClubDetail />", () => {
  let clubDetail, clubDetail2, clubDetail3;
  let spyCloseHandler;

  beforeEach(() => {
    spyCloseHandler = jest.fn();

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
});
