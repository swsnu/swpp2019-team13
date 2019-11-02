import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import ClubMain from "./ClubMain";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as clubActionCreators from "../store/actions/club";

let stubInitialState = {
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
  ],
  categories: [
    {
      id: 0,
      name: "학술매체"
    },
    {
      id: 1,
      name: "취미교양"
    },
    {
      id: 2,
      name: "연행예술"
    },
    {
      id: 3,
      name: "인권봉사"
    },
    {
      id: 4,
      name: "무예운동"
    },
    {
      id: 5,
      name: "종교"
    },
    {
      id: 6,
      name: "운동부"
    }
  ],
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
  deptnames: [
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
    },
    {
      id: 3,
      name: "사회과학대학"
    },
    {
      id: 4,
      name: "경영대학"
    },
    {
      id: 5,
      name: "농업생명과학대학"
    },
    {
      id: 6,
      name: "사범대학"
    },
    {
      id: 7,
      name: "생활과학대학"
    },
    {
      id: 8,
      name: "의과대학"
    },
    {
      id: 9,
      name: "수의과대학"
    },
    {
      id: 10,
      name: "약학대학"
    },
    {
      id: 11,
      name: "간호대학"
    },
    {
      id: 12,
      name: "음학대학"
    },
    {
      id: 13,
      name: "미술대학"
    },
    {
      id: 14,
      name: "자유전공학부"
    }
  ]
};

let mockStore = getMockStore(stubInitialState);

describe("<ClubMain />", () => {
  let clubMain;

  beforeEach(() => {
    clubMain = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <ClubMain />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it("should render Page", () => {
    const component = mount(clubMain);
    const wrapper = component.find("ClubMain");
    expect(wrapper.length).toBe(1);
  });

  it("club card click event handling", () => {
    const component = mount(clubMain);
    const mainInstance = component.find("ClubMain").instance();
    const wrapper = component.find("ClubCard");
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.ClubDetailShow).toBe(true);
  });

  it("club card click event handling", () => {
    const component = mount(clubMain);
    const mainInstance = component.find("ClubMain").instance();
    let wrapper = component.find("ClubCard");
    wrapper.at(0).simulate("click");
    wrapper = component.find("Header");
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.ClubDetailShow).toBe(true);

    wrapper = component.find("CloseButton");
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.ClubDetailShow).toBe(false);
  });

  it("club create button click event handling", () => {
    const component = mount(clubMain);
    const mainInstance = component.find("ClubMain").instance();
    let wrapper = component.find(".club-create-button");
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.ClubRegisterShow).toBe(true);

    wrapper = component.find("CloseButton");
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.ClubRegisterShow).toBe(false);
  });

  it("when club list info does not loaded yet", () => {
    stubInitialState.clubs = null;
    mockStore = getMockStore(stubInitialState);
    clubMain = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <ClubMain />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    const component = mount(clubMain);
    const wrapper = component.find("ClubCard");
    expect(wrapper.length).toBe(0);
  });

  it("when category list info does not loaded yet", () => {
    stubInitialState.categories = null;
    mockStore = getMockStore(stubInitialState);
    clubMain = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <ClubMain />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    const component = mount(clubMain);
    const wrapper = component.find("category-button");
    expect(wrapper.length).toBe(0);
  });
});