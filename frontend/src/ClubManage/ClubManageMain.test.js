import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import ClubManageMain from "./ClubManageMain";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as clubActionCreators from "../store/actions/club";
import * as tagActionCreators from "../store/actions/tag";
import * as majorActionCreators from "../store/actions/major";
import * as deptActionCreators from "../store/actions/dept";
import * as categoryActionCreators from "../store/actions/category";

jest.mock("../Header/Header", () => {
  return jest.fn(props => {
    return <div className="Header" />;
  });
});

jest.mock("./ClubInfoTab", () => {
  return jest.fn(props => {
    return <div className="ClubInfoTab" />;
  });
});

jest.mock("./ApplicationFormTab", () => {
  return jest.fn(props => {
    return <div className="ApplicationFormTab" />;
  });
});

const stubInitialState = {
  selectedClub: {
    isShow: false,
    name: "Name",
    summary: "Summary",
    description: "Description",
    category: 1,
    poster_img: ["img1.jpg"],
    available_semester: 2,
    available_major: [1],
    session_day: 3,
    tags: [],
    recruit_start_day: "2019-11-15",
    recruit_end_day: "2019-11-16"
  },
  majors: [
    { id: 1, dept_id: 1, name: "MAJOR_1" },
    { id: 2, dept_id: 2, name: "MAJOR_2" }
  ],
  depts: [
    { id: 1, name: "DEPT_1" },
    { id: 2, name: "DEPT_2" }
  ],
  categories: [
    { id: 1, name: "CATEGORY_1" },
    { id: 2, name: "CATEGORY_2" }
  ],
  tags: [
    { id: 1, name: "TAG_1" },
    { id: 2, name: "TAG_2" }
  ]
};

const mockStore = getMockStore(stubInitialState);

describe("<ClubManageMain />", () => {
  let clubManageMain;

  let spyGetClubByID,
    spyGetTagList,
    spyGetDeptList,
    spyGetMajorList,
    spyGetCategoryList;

  beforeEach(() => {
    clubManageMain = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={ClubManageMain} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spyGetClubByID = jest
      .spyOn(clubActionCreators, "getClubByID")
      .mockImplementation(res => {
        return dispatch => {
          return new Promise((resolve, reject) => {
            resolve();
          });
        };
      });

    spyGetTagList = jest
      .spyOn(tagActionCreators, "getTagList")
      .mockImplementation(res => {
        return dispatch => {
          return new Promise((resolve, reject) => {
            resolve();
          });
        };
      });

    spyGetDeptList = jest
      .spyOn(deptActionCreators, "getDeptList")
      .mockImplementation(res => {
        return dispatch => {
          return new Promise((resolve, reject) => {
            resolve();
          });
        };
      });

    spyGetMajorList = jest
      .spyOn(majorActionCreators, "getMajorList")
      .mockImplementation(res => {
        return dispatch => {
          return new Promise((resolve, reject) => {
            resolve();
          });
        };
      });

    spyGetCategoryList = jest
      .spyOn(categoryActionCreators, "getCategoryList")
      .mockImplementation(res => {
        return dispatch => {
          return new Promise((resolve, reject) => {
            resolve();
          });
        };
      });
  });

  it("should render Page", () => {
    const component = mount(clubManageMain);

    const wrapper = component.find(".clubManageMain");
    expect(wrapper.length).toBe(1);
    expect(spyGetClubByID).toBeCalledTimes(1);
    expect(spyGetTagList).toBeCalledTimes(1);
    expect(spyGetDeptList).toBeCalledTimes(1);
    expect(spyGetMajorList).toBeCalledTimes(1);
    expect(spyGetCategoryList).toBeCalledTimes(1);
  });

  it(`should handle club info button`, () => {
    const component = mount(clubManageMain);

    let wrapper = component.find("#clubmanage-main-clubinfo-button").at(1);
    wrapper.simulate("click");

    const clubManageMainInstance = component
      .find(ClubManageMain.WrappedComponent)
      .instance();
    expect(clubManageMainInstance.state.tab).toEqual(0);
  });

  it(`should handle application form button`, () => {
    const component = mount(clubManageMain);

    let wrapper = component
      .find("#clubmanage-main-applicationform-button")
      .at(1);
    wrapper.simulate("click");

    const clubManageMainInstance = component
      .find(ClubManageMain.WrappedComponent)
      .instance();
    expect(clubManageMainInstance.state.tab).toEqual(1);
  });

  it(`should handle applicant status button`, () => {
    const component = mount(clubManageMain);

    let wrapper = component
      .find("#clubmanage-main-applicantstatus-button")
      .at(1);
    wrapper.simulate("click");

    const clubManageMainInstance = component
      .find(ClubManageMain.WrappedComponent)
      .instance();
    expect(clubManageMainInstance.state.tab).toEqual(2);
  });

  it(`should handle tab when tab number is invalid`, () => {
    const component = mount(clubManageMain);

    const clubManageMainInstance = component
      .find(ClubManageMain.WrappedComponent)
      .instance();

    clubManageMainInstance.setState({ tab: -1 });

    let wrapper = component.find(".ClubInfoTab");
    expect(wrapper.length).toEqual(0);
  });
});
