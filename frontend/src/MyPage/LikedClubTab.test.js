import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import LikedClubTab from "./LikedClubTab";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as userActions from "../store/actions/user";
import * as clubActions from "../store/actions/club";
import * as somoimActions from "../store/actions/somoim";
import * as categoryActions from "../store/actions/category";
import * as tagActions from "../store/actions/tag";
import * as deptActions from "../store/actions/dept";
import * as majorActions from "../store/actions/major";

jest.mock("../components/ClubDetail", () => {
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
  likedClubs: [
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

describe("<LikedClubTab />", () => {
  let likedClubTab;
  let spyAddLikedClub;

  beforeEach(() => {
    likedClubTab = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <LikedClubTab />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spyAddLikedClub = jest
      .spyOn(userActions, "addLikedClub")
      .mockImplementation(() => {
        return dispatch => {};
      });
  });

  it("should render Page", () => {
    const component = mount(likedClubTab);
    const wrapper = component.find("LikedClubTab");
    expect(wrapper.length).toBe(1);
  });

  it("list item click handle", () => {
    let component = mount(likedClubTab);
    let mainInstance = component.find("LikedClubTab").instance();
    let wrapper = component.find("h1");
    wrapper.at(0).simulate("click");
    wrapper = component.find("#list-item-body");
    wrapper.at(1).simulate("click");
    expect(mainInstance.state.clubDetailShow).toBe(true);

    wrapper = component.find("#spyClubDetail");
    wrapper.simulate("click");
    expect(mainInstance.state.clubDetailShow).toBe(false);
  });

  it("unlike button click handle", () => {
    let component = mount(likedClubTab);
    let mainInstance = component.find("LikedClubTab").instance();
    let wrapper = component.find("#club-unlike-button");
    wrapper.at(1).simulate("click");
    expect(spyAddLikedClub).toBeCalledTimes(1);
  });

  it("when likedClubs info is not loaded", () => {
    let savedInfo = stubInitialState.likedClubs;
    stubInitialState.likedClubs = null;
    mockStore = getMockStore(stubInitialState);
    likedClubTab = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <LikedClubTab />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(likedClubTab);

    stubInitialState.likedClubs = savedInfo;
    mockStore = getMockStore(stubInitialState);
  });
});
