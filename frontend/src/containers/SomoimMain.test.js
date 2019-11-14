import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import SomoimMain from "./SomoimMain";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as userActions from "../store/actions/user";
import * as somoimActions from "../store/actions/somoim";
import * as categoryActions from "../store/actions/category";
import * as tagActions from "../store/actions/tag";
import * as deptActions from "../store/actions/dept";
import * as majorActions from "../store/actions/major";
let temp_somoims = [
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
];
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
  majors: [
    { id: 0, name: "cs" },
    { id: 1, name: "economy" },
    { id: 2, name: "music" }
  ],
  depts: [
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
  ],
  loggedUser: { id: 1 }
};

describe("<SomoimMain />", () => {
  let somoimMain;
  let mockStore = getMockStore(stubInitialState);

  let spyGetLoginInfo,
    spyGetSomoimList,
    spyGetCategoryList,
    spyGetTagList,
    spyGetDeptList,
    spyGetMajorList,
    spyGetRecommendedSomoims;

  beforeEach(() => {
    somoimMain = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <SomoimMain />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spyGetLoginInfo = jest
      .spyOn(userActions, "getLoginInfo")
      .mockImplementation(() => {
        return dispatch => {};
      });

    spyGetSomoimList = jest
      .spyOn(somoimActions, "getSomoimList")
      .mockImplementation(() => {
        return dispatch => {};
      });

    spyGetCategoryList = jest
      .spyOn(categoryActions, "getCategoryList")
      .mockImplementation(() => {
        return dispatch => {};
      });

    spyGetTagList = jest
      .spyOn(tagActions, "getTagList")
      .mockImplementation(() => {
        return dispatch => {};
      });

    spyGetDeptList = jest
      .spyOn(deptActions, "getDeptList")
      .mockImplementation(() => {
        return dispatch => {};
      });

    spyGetMajorList = jest
      .spyOn(majorActions, "getMajorList")
      .mockImplementation(() => {
        return dispatch => {};
      });

    spyGetRecommendedSomoims = jest
      .spyOn(userActions, "getRecommendedSomoims")
      .mockImplementation(() => {
        return dispatch => {};
      });
  });

  it("should render Page", () => {
    const component = mount(somoimMain);
    const wrapper = component.find("SomoimMain");
    expect(wrapper.length).toBe(1);
  });

  it("somoim card click event handling", () => {
    const component = mount(somoimMain);
    const mainInstance = component.find("SomoimMain").instance();
    const wrapper = component.find("SomoimCard");
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.somoimDetailShow).toBe(true);
  });

  it("somoim card click event handling", () => {
    const component = mount(somoimMain);
    const mainInstance = component.find("SomoimMain").instance();
    let wrapper = component.find("SomoimCard");
    wrapper.at(0).simulate("click");
    wrapper = component.find("Header");
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.somoimDetailShow).toBe(true);

    wrapper = component.find("CloseButton");
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.somoimDetailShow).toBe(false);
  });

  it("somoim create button click event handling", () => {
    const component = mount(somoimMain);
    const mainInstance = component.find("SomoimMain").instance();
    let wrapper = component.find(".somoim-create-button");
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.somoimCreateShow).toBe(true);

    wrapper = component.find("CloseButton");
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.somoimCreateShow).toBe(false);
  });

  it("when somoim list info does not loaded yet", () => {
    let savedSomoims = stubInitialState.somoims;
    stubInitialState.somoims = null;
    mockStore = getMockStore(stubInitialState);
    somoimMain = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <SomoimMain />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    const component = mount(somoimMain);
    const wrapper = component.find("SomoimCard");
    expect(wrapper.length).toBe(0);

    stubInitialState.somoims = savedSomoims;
    mockStore = getMockStore(stubInitialState);
  });

  it("when category list info does not loaded yet", () => {
    let savedCategories = stubInitialState.categories;
    stubInitialState.categories = null;
    stubInitialState.somoims = temp_somoims;
    mockStore = getMockStore(stubInitialState);
    somoimMain = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <SomoimMain />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    const component = mount(somoimMain);
    const wrapper = component.find("category-button");
    expect(wrapper.length).toBe(0);

    stubInitialState.categories = savedCategories;
    mockStore = getMockStore(stubInitialState);
  });
});
