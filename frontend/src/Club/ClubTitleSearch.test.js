import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch, MemoryRouter } from "react-router-dom";

import ClubTitleSearch from "./ClubTitleSearch";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as userActions from "../store/actions/user";
import * as clubActions from "../store/actions/club";
import * as categoryActions from "../store/actions/category";
import * as tagActions from "../store/actions/tag";
import * as deptActions from "../store/actions/dept";
import * as majorActions from "../store/actions/major";

jest.mock("../Club/ClubDetail", () => {
  return jest.fn(props => {
    return <div id="spyClubDetail" onClick={props.closeHandler}></div>;
  });
});

jest.mock("../Club/ClubCard", () => {
  return jest.fn(props => {
    return <div id="spyClubCard" onClick={props.clickHandler}></div>;
  });
});

let temp_clubs = [
  {
    id: 0,
    name: "SNUStone",
    description: "SNU Best HearthStone Club",
    managers: [
      {
        name: "manager0",
        major: { id: 0, name: "major0" }
      }
    ],
    category: 0,
    auth_img: "1",
    isRegistered: true,
    available_major: [1],
    tags: [1, 2],
    likers: [],
    recruit_start_day: "2019-12-8",
    recruit_end_day: "2019-12-16",
    member: 50,
    hits: 1,
    poster_img: []
  },
  {
    id: 1,
    name: "SnuWOD",
    description: "SNU Best Training Club",
    managers: [
      {
        name: "manager1",
        major: { id: 1, name: "major1" }
      }
    ],
    category: 6,
    auth_img: "2",
    isRegistered: true,
    tags: [2, 3],
    available_major: [1],
    likers: [],
    recruit_start_day: "2019-12-8",
    recruit_end_day: "2019-12-16",
    member: 50,
    hits: 1,
    poster_img: []
  },
  {
    id: 2,
    name: "SnuLoL",
    description: "SNU Best LoL Club",
    managers: [
      {
        name: "manager2",
        major: { id: 2, name: "major2" }
      }
    ],
    category: 6,
    auth_img: "3",
    isRegistered: true,
    tags: [2, 3],
    available_major: [1],
    likers: [],
    recruit_start_day: "2019-12-8",
    recruit_end_day: "2019-12-16",
    member: 50,
    hits: 1,
    poster_img: []
  }
];

let stubInitialState = {
  clubs: [
    {
      id: 0,
      name: "SNUStone",
      description: "SNU Best HearthStone Club",
      managers: [
        {
          name: "manager0",
          major: { id: 0, name: "major0" }
        }
      ],
      category: 0,
      auth_img: "1",
      isRegistered: true,
      available_major: [1],
      tags: [1, 2],
      likers: [],
      likes: 10,
      poster_img: []
    },
    {
      id: 1,
      name: "SnuWOD",
      description: "SNU Best Training Club",
      managers: [
        {
          name: "manager1",
          major: { id: 1, name: "major1" }
        }
      ],
      category: 6,
      auth_img: "2",
      isRegistered: true,
      tags: [2, 3],
      available_major: [1],
      likers: [],
      likes: 15,
      poster_img: []
    },
    {
      id: 2,
      name: "SnuLoL",
      description: "SNU Best LoL Club",
      managers: [
        {
          name: "manager2",
          major: { id: 2, name: "major2" }
        }
      ],
      category: 6,
      auth_img: "3",
      isRegistered: true,
      tags: [2, 3],
      available_major: [1],
      likers: [],
      likes: 20,
      poster_img: []
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
    id: 1,
    name: "test",
    email: "test@test.com",
    password: "test",
    dept: 0,
    major: 1,
    grade: 3,
    available_semester: 2,
    available_session_day: 1
  },

  recommendedClubs: null
};

let mockStore = getMockStore(stubInitialState);

describe("<ClubTitleSearch />", () => {
  let clubTitleSearch;
  let spyGetLoginInfo,
    spyGetClubList,
    spyGetCategoryList,
    spyGetTagList,
    spyGetDeptList,
    spyGetMajorList,
    spyGetRecommendedClubs;

  beforeEach(() => {
    clubTitleSearch = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <ClubTitleSearch
                    match={{ params: { search_key: "SNUStone" } }}
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

    spyGetClubList = jest
      .spyOn(clubActions, "getClubList")
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

    spyGetRecommendedClubs = jest
      .spyOn(userActions, "getRecommendedClubs")
      .mockImplementation(() => {
        return dispatch => {};
      });
  });

  it("should render Page", () => {
    const component = mount(clubTitleSearch);
    const wrapper = component.find(".ClubTitleSearch");
    expect(wrapper.length).toBe(1);
  });

  it("club card click handle", () => {
    let component = mount(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={["/SNUStone"]}>
          <Switch>
            <Route
              path="/:search_key"
              exact
              render={() => {
                return (
                  <ClubTitleSearch
                    match={{ params: { search_key: "SNUStone" } }}
                  />
                );
              }}
            />
          </Switch>
        </MemoryRouter>
      </Provider>
    );
    let mainInstance = component.find("ClubTitleSearch").instance();
    mainInstance.setState({
      ...mainInstance.state,
      forceRender: Math.random()
    });
    component.update();
    let wrapper = component.find("#spyClubCard").at(0);
    wrapper.simulate("click");
    wrapper = component.find("#spyClubDetail");
    wrapper.simulate("click");
    expect(wrapper.length).toBe(1);
  });

  it("club info does not loaded yet", () => {
    mockStore = getMockStore({ ...stubInitialState, clubs: null });
    let component = mount(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={["/SNUStone"]}>
          <Switch>
            <Route
              path="/:search_key"
              exact
              render={() => {
                return (
                  <ClubTitleSearch
                    match={{ params: { search_key: "SNUStone" } }}
                  />
                );
              }}
            />
          </Switch>
        </MemoryRouter>
      </Provider>
    );
    const wrapper = component.find("ClubTitleSearch");
    expect(wrapper.length).toBe(1);
    mockStore = getMockStore(stubInitialState);
  });
});
