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
    poster_img: [],
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
      .mockImplementation(at => {
        return dispatch => {};
      });

    spyPutClubInformation = jest
      .spyOn(clubActionCreators, "putClubInformation")
      .mockImplementation(at => {
        return dispatch => {};
      });

    spyPostClubPoster = jest
      .spyOn(clubActionCreators, "postClubPoster")
      .mockImplementation(at => {
        return dispatch => {};
      });
  });

  it("should render Page", () => {
    const component = mount(clubInfoTab);

    console.log(component.debug());

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

    // Form.Control made two inputs with same id
    let wrapper = component.find("#clubinfo-isshow-button-false");

    console.log(wrapper.debug());
    wrapper.simulate("click");

    wrapper = component.find("#clubinfo-isshow-button-true");
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

  it(`should set state properly on add major button`, () => {
    const component = mount(clubInfoTab);

    // Form.Control made two inputs with same id
    let wrapper = component.find("#clubinfo-dept-input").at(1);
    wrapper.simulate("change", { target: { value: 2 } });
    wrapper = component.find("#clubinfo-major-input").at(1);
    wrapper.simulate("change", { target: { value: 2 } });
    wrapper = component.find("#clubinfo-addmajor-button");
    wrapper.simulate("click");

    const clubInfoTabInstance = component
      .find(ClubInfoTab.WrappedComponent)
      .instance();
    expect(clubInfoTabInstance.state.available_major).toEqual([1, 2]);
  });
});
