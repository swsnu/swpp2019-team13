import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import SomoimDetail from "./SomoimDetail";
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
  majors: [
    { id: 0, name: "cs" },
    { id: 1, name: "economy" },
    { id: 2, name: "music" }
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
  ]
};

const mockStore = getMockStore(stubInitialState);

describe("<SomoimDetail />", () => {
  let somoimDetail;
  let spyCloseHandler;

  beforeEach(() => {
    spyCloseHandler = jest.fn();

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
  });

  it("should render modal", () => {
    const component = mount(somoimDetail);

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
});
