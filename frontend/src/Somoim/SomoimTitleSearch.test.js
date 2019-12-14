import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch, MemoryRouter } from "react-router-dom";

import SomoimTitleSearch from "./SomoimTitleSearch";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as userActions from "../store/actions/user";
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

jest.mock("../Somoim/SomoimCard", () => {
  return jest.fn(props => {
    return <div id="spySomoimCard" onClick={props.clickHandler}></div>;
  });
});
let temp_somoims = [
  {
    id: 0,
    title: "title0",
    summary: "summary0",
    description: "description0",
    managers: [
      {
        name: "manager0",
        major: { id: 0, name: "major0" }
      }
    ],
    available_semester: 1,
    tags: [1],
    goalJoiner: 20,
    available_major: [0, 1],
    joiners: [],
    likers: [],
    session_day: 0
  },
  {
    id: 1,
    title: "title1",
    summary: "summary1",
    description: "description1",
    managers: [
      {
        name: "manager1",
        major: { id: 1, name: "major1" }
      }
    ],
    available_semester: 1,
    tags: [2],
    goalJoiner: 10,
    available_major: [0, 1],
    joiners: [],
    likers: [{ id: 0 }],
    session_day: 1
  },
  {
    id: 2,
    title: "title2",
    summary: "summary2",
    description: "description2",
    managers: [
      {
        name: "manager2",
        major: { id: 2, name: "major2" }
      }
    ],
    available_semester: 3,
    tags: [3],
    goalJoiner: 10,
    available_major: [2],
    joiners: [],
    likers: [{ id: 0 }]
  }
];
let stubInitialState = {
  somoims: [
    {
      id: 0,
      title: "title0",
      summary: "summary0",
      description: "description0",
      managers: [
        {
          name: "manager0",
          major: { id: 0, name: "major0" }
        }
      ],
      available_semester: 1,
      tags: [1],
      goalJoiner: 20,
      available_major: [0, 1],
      category: 0,
      joiners: [],
      likers: [],
      session_day: 0
    },
    {
      id: 1,
      title: "title1",
      summary: "summary1",
      description: "description1",
      managers: [
        {
          name: "manager1",
          major: { id: 1, name: "major1" }
        }
      ],
      available_semester: 1,
      category: 2,
      tags: [2],
      goalJoiner: 10,
      available_major: [0, 1],
      joiners: [],
      likers: [{ id: 0 }],
      session_day: 1
    },
    {
      id: 2,
      title: "title2",
      summary: "summary2",
      description: "description2",
      managers: [
        {
          name: "manager2",
          major: { id: 2, name: "major2" }
        }
      ],
      available_semester: 3,
      category: 6,
      tags: [3],
      goalJoiner: 10,
      available_major: [2],
      joiners: [],
      likers: [{ id: 0 }]
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

  recommendedSomoims: null
};

let mockStore = getMockStore(stubInitialState);

describe("<SomoimTitleSearch />", () => {
  let somoimTitleSearch;
  let spyGetLoginInfo,
    spyGetSomoimList,
    spyGetCategoryList,
    spyGetTagList,
    spyGetDeptList,
    spyGetMajorList,
    spyGetRecommendedSomoims;

  beforeEach(() => {
    somoimTitleSearch = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <SomoimTitleSearch
                    match={{ params: { search_key: "title0" } }}
                  />
                );
              }}
            />{" "}
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
    const component = mount(somoimTitleSearch);
    const wrapper = component.find(".SomoimTitleSearch");
    expect(wrapper.length).toBe(1);
  });

  it("somoim card click handle", () => {
    let component = mount(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={["/title0"]}>
          <Switch>
            <Route
              path="/:search_key"
              exact
              render={() => {
                return (
                  <SomoimTitleSearch
                    match={{ params: { search_key: "title0" } }}
                  />
                );
              }}
            />
          </Switch>
        </MemoryRouter>
      </Provider>
    );
    let mainInstance = component.find("SomoimTitleSearch").instance();
    mainInstance.setState({
      ...mainInstance.state,
      forceRender: Math.random()
    });
    component.update();
    let wrapper = component.find("#spySomoimCard").at(0);
    wrapper.simulate("click");
    wrapper = component.find("#spySomoimDetail");
    wrapper.simulate("click");
    expect(wrapper.length).toBe(1);
  });

  it("somoim info does not loaded yet", () => {
    mockStore = getMockStore({ ...stubInitialState, somoims: null });
    let component = mount(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={["/title0"]}>
          <Switch>
            <Route
              path="/:search_key"
              exact
              render={() => {
                return (
                  <SomoimTitleSearch
                    match={{ params: { search_key: "title0" } }}
                  />
                );
              }}
            />
          </Switch>
        </MemoryRouter>
      </Provider>
    );
    const wrapper = component.find("SomoimTitleSearch");
    expect(wrapper.length).toBe(1);
    mockStore = getMockStore(stubInitialState);
  });
});
