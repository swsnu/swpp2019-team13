import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import ManagingClubTab from "./ManagingClubTab";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as userActions from "../store/actions/user";
import * as clubActions from "../store/actions/club";
import * as somoimActions from "../store/actions/somoim";
import * as categoryActions from "../store/actions/category";
import * as tagActions from "../store/actions/tag";
import * as deptActions from "../store/actions/dept";
import * as majorActions from "../store/actions/major";

jest.mock("../Club/ClubDetail", () => {
  return jest.fn(props => {
    return <div id="spyClubDetail" onClick={props.closeHandler}></div>;
  });
});

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
  managingClubs: [
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
  ]
};

let mockStore = getMockStore(stubInitialState);

describe("<ManagingClubTab />", () => {
  let managingClubTab;
  let spyPush;

  beforeEach(() => {
    managingClubTab = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <ManagingClubTab />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spyPush = jest.spyOn(history, "push").mockImplementation(() => {
      return dispatch => {};
    });
  });

  it("should render Page", () => {
    const component = mount(managingClubTab);
    const wrapper = component.find("ManagingClubTab");
    expect(wrapper.length).toBe(1);
  });

  it("list item click handle", () => {
    let component = mount(managingClubTab);
    let mainInstance = component.find("ManagingClubTab").instance();
    let wrapper = component.find("h1");
    wrapper.at(0).simulate("click");
    wrapper = component.find("#list-item-body");
    wrapper.at(1).simulate("click");
    expect(mainInstance.state.clubDetailShow).toBe(true);

    wrapper = component.find("#spyClubDetail");
    wrapper.simulate("click");
    expect(mainInstance.state.clubDetailShow).toBe(false);
  });

  it("manage button click handle", () => {
    let component = mount(managingClubTab);
    let mainInstance = component.find("ManagingClubTab").instance();
    let wrapper = component.find("#manage-club-button");
    wrapper.at(1).simulate("click");
    expect(spyPush).toBeCalledTimes(1);
  });

  it("when managingClubs info is not loaded", () => {
    let savedInfo = stubInitialState.managingClubs;
    stubInitialState.managingClubs = null;
    mockStore = getMockStore(stubInitialState);
    managingClubTab = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <ManagingClubTab />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(managingClubTab);

    stubInitialState.managingClubs = savedInfo;
    mockStore = getMockStore(stubInitialState);
  });
});
