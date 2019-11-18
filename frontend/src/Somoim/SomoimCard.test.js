import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import SomoimCard from "./SomoimCard";
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

  somoims: [
    {
      id: 0,
      title: "Let's LoL!",
      summary: "Playing LoL together!! :D",
      description: "LoL\nLoL\nLol",
      selected_dept: [0, 1],
      available_sem: 1,
      tags: [1],
      goalJoiner: 20,
      joiners: [],
      currentJoiner: 7,
      likes: 10,
      likers: []
    },
    {
      id: 1,
      title: "Book lovers",
      summary: "We read books until we fall asleep..",
      description: "Actually, it's sleep somoim :)",
      selected_dept: [0, 1, 3, 4, 5],
      available_sem: 1,
      tags: [2, 3],
      goalJoiner: 10,
      currentJoiner: 3,
      joiners: [],
      likes: 5,
      likers: []
    },
    {
      id: 2,
      title: "test somoim",
      summary: "i am testing the somoim list",
      description: "Me too bro",
      selected_dept: [0, 1, 3, 4, 5],
      available_sem: 3,
      tags: [4, 5],
      goalJoiner: 10,
      currentJoiner: 9,
      likes: 5,
      likers: []
    },
    {
      id: 3,
      title: "301 assa somoim",
      summary: "We are assa in 301",
      description: "Sad..",
      selected_dept: [0, 1, 3, 4, 5],
      available_sem: 5,
      tags: [6, 7],
      goalJoiner: 10,
      currentJoiner: 1,
      joiners: [],
      likes: 5,
      likers: []
    }
  ]
};

const mockStore = getMockStore(stubInitialState);

describe("<SomoimCard />", () => {
  let somoimCard;
  let spyClickHandler;
  beforeEach(() => {
    somoimCard = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <SomoimCard
                    somoim={stubInitialState.somoims[0]}
                    clickHandler={spyClickHandler}
                  />
                );
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spyClickHandler = jest.fn();
  });

  it("should render without errors", () => {
    const component = mount(somoimCard);
    const wrapper = component.find(".Somoim-Card");
    expect(wrapper.length).toBe(1);
  });

  it("should handle clicks", () => {
    const component = mount(somoimCard);
    const wrapper = component.find(".Somoim-Card");
    wrapper.simulate("click");
    expect(spyClickHandler).toHaveBeenCalledTimes(1);
  });

  it("should render empty component", () => {
    somoimCard = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <SomoimCard somoim={null} clickHandler={spyClickHandler} />
                );
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(somoimCard);
    const wrapper = component.find(".Somoim-Card");
    expect(wrapper.length).toBe(0);
  });

  it("test branch - no tags", () => {
    stubInitialState.tags = [];
    somoimCard = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <SomoimCard
                    somoim={stubInitialState.somoims[0]}
                    clickHandler={spyClickHandler}
                  />
                );
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(somoimCard);
    const wrapper = component.find("#secondary");
    expect(wrapper.length).toBe(0);
  });
});
