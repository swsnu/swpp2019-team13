import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import JoinedSomoimTab from "./JoinedSomoimTab";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as userActions from "../store/actions/user";
import * as clubActions from "../store/actions/club";
import * as somoimActions from "../store/actions/somoim";
import * as categoryActions from "../store/actions/category";
import * as tagActions from "../store/actions/tag";
import * as deptActions from "../store/actions/dept";
import * as majorActions from "../store/actions/major";

jest.mock("../Somoim/SomoimDetail", () => {
  return jest.fn(props => {
    return <div id="spySomoimDetail" onClick={props.closeHandler}></div>;
  });
});

let stubInitialState = {
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
  joinedSomoims: [
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

let mockStore = getMockStore(stubInitialState);

describe("<JoinedSomoimTab />", () => {
  let joinedSomoimTab;
  let spyAddLikedSomoim;

  beforeEach(() => {
    joinedSomoimTab = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <JoinedSomoimTab />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyAddLikedSomoim = jest
      .spyOn(userActions, "addLikedSomoim")
      .mockImplementation(() => {
        return dispatch => {};
      });
  });

  it("should render Page", () => {
    const component = mount(joinedSomoimTab);
    const wrapper = component.find("JoinedSomoimTab");
    expect(wrapper.length).toBe(1);
  });

  it("list item click handle", () => {
    let component = mount(joinedSomoimTab);
    let mainInstance = component.find("JoinedSomoimTab").instance();
    let wrapper = component.find("h1");
    wrapper.at(0).simulate("click");
    wrapper = component.find("#list-item-body");
    wrapper.at(1).simulate("click");
    expect(mainInstance.state.somoimDetailShow).toBe(true);

    wrapper = component.find("#spySomoimDetail");
    wrapper.simulate("click");
    expect(mainInstance.state.somoimDetailShow).toBe(false);
  });

  it("when joinedSomoims info is not loaded", () => {
    let savedInfo = stubInitialState.joinedSomoims;
    stubInitialState.joinedSomoims = null;
    mockStore = getMockStore(stubInitialState);
    joinedSomoimTab = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <JoinedSomoimTab />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(joinedSomoimTab);

    stubInitialState.joinedSomoims = savedInfo;
    mockStore = getMockStore(stubInitialState);
  });
});
