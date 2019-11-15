import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import ClubInfoTab from "./ClubInfoTab";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as clubActionCreators from "../store/actions/club";

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
  ]
};

const mockStore = getMockStore(stubInitialState);

describe("<ClubInfoTab />", () => {
  let clubInfoTab;
  let spyGetClubByID, spyPutClubInformation, spyPostClubPoster;

  beforeEach(() => {
    clubInfoTab = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={ClubInfoTab} />
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

    spyPutClubInformation = jest
      .spyOn(clubActionCreators, "putClubInformation")
      .mockImplementation(res => {
        return dispatch => {
          return new Promise((resolve, reject) => {
            resolve();
          });
        };
      });

    spyPostClubPoster = jest
      .spyOn(clubActionCreators, "postClubPoster")
      .mockImplementation(res => {
        return dispatch => {
          return new Promise((resolve, reject) => {
            resolve();
          });
        };
      });
  });

  it("should render Page", () => {
    const component = mount(clubInfoTab);

    const wrapper = component.find(".ClubInfoTab");
    expect(wrapper.length).toBe(1);
  });

  it("should render Page when no props", () => {
    const tempInitialState = {};

    let tempClubInfoTab = (
      <Provider store={getMockStore(tempInitialState)}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={ClubInfoTab} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    const component = mount(tempClubInfoTab);

    const wrapper = component.find(".ClubInfoTab");
    expect(wrapper.length).toBe(1);
  });

  it("should render Page when no recruit_day", () => {
    const tempInitialState = {
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
        recruit_start_day: null,
        recruit_end_day: null
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
      ]
    };

    let tempClubInfoTab = (
      <Provider store={getMockStore(tempInitialState)}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={ClubInfoTab} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    const component = mount(tempClubInfoTab);

    const wrapper = component.find(".ClubInfoTab");
    expect(wrapper.length).toBe(1);
  });

  it(`should set state properly on name input`, () => {
    const text = "TEST_TEXT";
    const component = mount(clubInfoTab);

    // Form.Control made two inputs with same id
    const wrapper = component.find("#clubinfo-name-input").at(1);
    wrapper.simulate("change", { target: { value: text } });
    const clubInfoTabInstance = component
      .find(ClubInfoTab.WrappedComponent)
      .instance();
    expect(clubInfoTabInstance.state.name).toEqual(text);
  });

  it(`should set state properly on isshow input`, () => {
    const component = mount(clubInfoTab);

    let wrapper = component.find("#clubinfo-isshow-button-false").at(2);
    wrapper.simulate("click");

    wrapper = component.find("#clubinfo-isshow-button-true").at(2);
    expect(wrapper.length).toBe(1);
    wrapper.simulate("click");

    wrapper = component.find("#clubinfo-isshow-button-false").at(2);
    expect(wrapper.length).toBe(1);
  });

  it(`should set state properly on summary input`, () => {
    const text = "TEST_TEXT";
    const component = mount(clubInfoTab);

    // Form.Control made two inputs with same id
    const wrapper = component.find("#clubinfo-summary-input").at(1);
    wrapper.simulate("change", { target: { value: text } });
    const clubInfoTabInstance = component
      .find(ClubInfoTab.WrappedComponent)
      .instance();
    expect(clubInfoTabInstance.state.summary).toEqual(text);
  });

  it(`should set state properly on description input`, () => {
    const text = "TEST_TEXT";
    const component = mount(clubInfoTab);

    // Form.Control made two inputs with same id
    const wrapper = component.find("#clubinfo-description-input").at(1);
    wrapper.simulate("change", { target: { value: text } });
    const clubInfoTabInstance = component
      .find(ClubInfoTab.WrappedComponent)
      .instance();
    expect(clubInfoTabInstance.state.description).toEqual(text);
  });

  it(`should set state properly on category input`, () => {
    const component = mount(clubInfoTab);

    // Form.Control made two inputs with same id
    const wrapper = component.find("#clubinfo-category-input").at(1);
    wrapper.simulate("change", { target: { value: 3 } });
    const clubInfoTabInstance = component
      .find(ClubInfoTab.WrappedComponent)
      .instance();
    expect(clubInfoTabInstance.state.category).toEqual(3);
  });

  it(`should set state properly on description input`, () => {
    const text = "TEST_TEXT";
    const component = mount(clubInfoTab);

    // Form.Control made two inputs with same id
    const wrapper = component.find("#clubinfo-description-input").at(1);
    wrapper.simulate("change", { target: { value: text } });
    const clubInfoTabInstance = component
      .find(ClubInfoTab.WrappedComponent)
      .instance();
    expect(clubInfoTabInstance.state.description).toEqual(text);
  });

  it(`should set state properly on recruit start day input`, () => {
    const component = mount(clubInfoTab);
    const new_date = new Date("2019-11-13T15:00:00.000Z");

    // Form.Control made two inputs with same id
    const wrapper = component.find("#clubinfo-startday-input").at(1);
    wrapper.simulate("change", { target: { value: new_date } });

    const clubInfoTabInstance = component
      .find(ClubInfoTab.WrappedComponent)
      .instance();
    expect(clubInfoTabInstance.state.recruit_start_day).toEqual(new_date);
  });

  it(`should set state properly on recruit end day input`, () => {
    const component = mount(clubInfoTab);
    const new_date = new Date("2019-11-13T15:00:00.000Z");

    // Form.Control made two inputs with same id
    const wrapper = component.find("#clubinfo-endday-input").at(1);
    wrapper.simulate("change", { target: { value: new_date } });
    const clubInfoTabInstance = component
      .find(ClubInfoTab.WrappedComponent)
      .instance();
    expect(clubInfoTabInstance.state.recruit_end_day).toEqual(new_date);
  });

  it(`should set state properly on dept input`, () => {
    const component = mount(clubInfoTab);

    // Form.Control made two inputs with same id
    const wrapper = component.find("#clubinfo-dept-input").at(1);
    wrapper.simulate("change", { target: { value: "" } });
    const clubInfoTabInstance = component
      .find(ClubInfoTab.WrappedComponent)
      .instance();
    expect(clubInfoTabInstance.state.current_dept).toEqual("");
    expect(clubInfoTabInstance.state.current_major).toEqual("");

    wrapper.simulate("change", { target: { value: "DEPT_1" } });
    expect(clubInfoTabInstance.state.current_dept).toEqual("DEPT_1");
  });

  it(`should set state properly on major input`, () => {
    const component = mount(clubInfoTab);

    // Form.Control made two inputs with same id
    const wrapper = component.find("#clubinfo-major-input").at(1);
    wrapper.simulate("change", { target: { value: 2 } });
    const clubInfoTabInstance = component
      .find(ClubInfoTab.WrappedComponent)
      .instance();
    expect(clubInfoTabInstance.state.current_major).toEqual(2);
  });

  it(`should handle wrong major input`, () => {
    const component = mount(clubInfoTab);

    const clubInfoTabInstance = component
      .find(ClubInfoTab.WrappedComponent)
      .instance();

    clubInfoTabInstance.setState({ current_major: "DEPT_1" });
    clubInfoTabInstance.setState({ current_major: "WRONG_MAJOR" });
    let wrapper = component.find("#clubinfo-addmajor-button").at(2);
    wrapper.simulate("click");

    expect(clubInfoTabInstance.state.available_major).toEqual([1]);
  });

  it(`should handle add major button`, () => {
    const component = mount(clubInfoTab);

    // Form.Control made two inputs with same id
    let wrapper = component.find("#clubinfo-dept-input").at(1);
    wrapper.simulate("change", { target: { value: 2 } });
    wrapper = component.find("#clubinfo-major-input").at(1);
    wrapper.simulate("change", { target: { value: "MAJOR_2" } });
    wrapper = component.find("#clubinfo-addmajor-button").at(2);
    wrapper.simulate("click");

    const clubInfoTabInstance = component
      .find(ClubInfoTab.WrappedComponent)
      .instance();
    expect(clubInfoTabInstance.state.available_major).toEqual([1, 2]);
  });

  it(`should handle add major button if already exist`, () => {
    const component = mount(clubInfoTab);

    // Form.Control made two inputs with same id
    let wrapper = component.find("#clubinfo-dept-input").at(1);
    wrapper.simulate("change", { target: { value: 2 } });
    wrapper = component.find("#clubinfo-major-input").at(1);
    wrapper.simulate("change", { target: { value: "MAJOR_1" } });
    wrapper = component.find("#clubinfo-addmajor-button").at(2);
    wrapper.simulate("click");

    const clubInfoTabInstance = component
      .find(ClubInfoTab.WrappedComponent)
      .instance();
    expect(clubInfoTabInstance.state.available_major).toEqual([1]);
  });

  it(`should handle add all major button`, () => {
    const component = mount(clubInfoTab);

    const wrapper = component.find("#clubinfo-addallmajor-button").at(2);
    wrapper.simulate("click");

    const clubInfoTabInstance = component
      .find(ClubInfoTab.WrappedComponent)
      .instance();
    expect(clubInfoTabInstance.state.available_major).toEqual([1, 2]);
  });

  it(`should handle add major input when no props`, () => {
    const tempInitialState = {
      selectedClub: {
        isShow: false,
        name: "Name",
        summary: "Summary",
        description: "Description",
        category: 1,
        poster_img: ["img1.jpg"],
        available_semester: 2,
        available_major: [],
        session_day: 3,
        tags: [],
        recruit_start_day: "2019-11-15",
        recruit_end_day: "2019-11-16"
      },
      depts: [
        { id: 1, name: "DEPT_1" },
        { id: 2, name: "DEPT_2" }
      ],
      categories: [
        { id: 1, name: "CATEGORY_1" },
        { id: 2, name: "CATEGORY_2" }
      ]
    };

    let tempClubInfoTab = (
      <Provider store={getMockStore(tempInitialState)}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={ClubInfoTab} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    const component = mount(tempClubInfoTab);

    const clubInfoTabInstance = component
      .find(ClubInfoTab.WrappedComponent)
      .instance();

    clubInfoTabInstance.setState({ current_major: "DEPT_1" });
    clubInfoTabInstance.setState({ current_major: "WRONG_MAJOR" });
    let wrapper = component.find("#clubinfo-addmajor-button").at(2);
    wrapper.simulate("click");

    wrapper = component.find("#clubinfo-addallmajor-button").at(2);
    wrapper.simulate("click");

    expect(clubInfoTabInstance.state.available_major).toEqual([]);
  });

  it(`should handle remove one major button`, () => {
    const component = mount(clubInfoTab);

    const wrapper = component.find("#clubinfo-removemajor-button").at(1);
    wrapper.simulate("click");

    const clubInfoTabInstance = component
      .find(ClubInfoTab.WrappedComponent)
      .instance();
    expect(clubInfoTabInstance.state.available_major).toEqual([]);
  });

  it(`should handle remove all major button`, () => {
    const component = mount(clubInfoTab);

    const wrapper = component.find("#clubinfo-removeallmajor-button").at(2);
    wrapper.simulate("click");

    const clubInfoTabInstance = component
      .find(ClubInfoTab.WrappedComponent)
      .instance();
    expect(clubInfoTabInstance.state.available_major).toEqual([]);
  });

  it(`should set state properly on available semester input`, () => {
    const component = mount(clubInfoTab);

    // Form.Control made two inputs with same id
    const wrapper = component.find("#clubinfo-availablesemester-input").at(1);
    wrapper.simulate("change", { target: { value: 2 } });
    const clubInfoTabInstance = component
      .find(ClubInfoTab.WrappedComponent)
      .instance();
    expect(clubInfoTabInstance.state.available_semester).toEqual(2);
  });

  it(`should set state properly on session day input`, () => {
    const component = mount(clubInfoTab);

    // Form.Control made two inputs with same id
    const wrapper = component.find("#clubinfo-sessionday-checkbox").at(1);

    wrapper.simulate("change");
    const clubInfoTabInstance = component
      .find(ClubInfoTab.WrappedComponent)
      .instance();
    expect(clubInfoTabInstance.state.session_day).toEqual(2);
  });

  it(`should set state properly on poster file input`, () => {
    const test_file = [
      {
        name: "test.jpg"
      }
    ];
    const component = mount(clubInfoTab);

    let wrapper = component
      .find("#club-poster-file-input")
      .at(1)
      .find("#image-prompt");

    wrapper.simulate("input", { target: { files: test_file } });

    const clubInfoTabInstance = component
      .find(ClubInfoTab.WrappedComponent)
      .instance();
    clubInfoTabInstance.setState({ new_img: [test_file] });
    wrapper = component.find("#clubinfo-confirmedit-button").at(1);
    wrapper.simulate("click");
  });

  it(`should handle confirm edit`, () => {
    const component = mount(clubInfoTab);
    const wrapper = component.find("#clubinfo-confirmedit-button").at(1);
    wrapper.simulate("click");
  });
});
