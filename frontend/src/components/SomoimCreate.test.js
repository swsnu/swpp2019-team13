import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import SomoimCreate from "./SomoimCreate";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as userActionCreators from "../store/actions/user";
import * as somoimActionCreators from "../store/actions/somoim";
import * as deptActions from "../store/actions/dept";
import * as majorActions from "../store/actions/major";

const stubInitialState = {
  somoims: [],
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

describe("<SomoimCreate />", () => {
  let somoimCreate;
  let spyPostSomoim, spygetDeptList, spygetMajorList, spyaddManagingSomoim;

  let spyCloseHandler = () => {};

  beforeEach(() => {
    somoimCreate = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <SomoimCreate show={true} closeHandler={spyCloseHandler} />
                );
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spyPostSomoim = jest
      .spyOn(somoimActionCreators, "postSomoim")
      .mockImplementation(res => {
        return dispatch => {
          return new Promise((resolve, reject) => {
            resolve();
          });
        };
      });

    spygetDeptList = jest
      .spyOn(deptActions, "getDeptList")
      .mockImplementation(at => {
        return dispatch => {};
      });

    spygetMajorList = jest
      .spyOn(majorActions, "getMajorList")
      .mockImplementation(at => {
        return dispatch => {};
      });

    spyaddManagingSomoim = jest
      .spyOn(userActionCreators, "addManagingSomoim")
      .mockImplementation(at => {
        return dispatch => {};
      });
  });

  it("should render Page", () => {
    const component = mount(somoimCreate);

    const wrapper = component.find("Bootstrap(Modal)");
    expect(wrapper.length).toBe(1);
  });

  it("should render Page when no props", () => {
    const tempInitialState = {};

    let tempSomoimCreate = (
      <Provider store={getMockStore(tempInitialState)}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={SomoimCreate} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    const component = mount(tempSomoimCreate);

    const wrapper = component.find("Bootstrap(Modal)");
    expect(wrapper.length).toBe(1);
  });

  it("should clear inputs when new props comes (modal reopen)", () => {
    const component = mount(somoimCreate);

    const wrapper = component.find("#somoim-title-input").at(1);
    wrapper.simulate("change", { target: { value: "TEST_TITLE" } });
    const SomoimCreateInstance = component
      .find(SomoimCreate.WrappedComponent)
      .instance();

    SomoimCreateInstance.UNSAFE_componentWillReceiveProps();
    expect(SomoimCreateInstance.state.title).toEqual("");
  });

  it(`should set state properly on title input`, () => {
    const title = "TEST_TITLE";
    const component = mount(somoimCreate);

    // Form.Control made two inputs with same id
    const wrapper = component.find("#somoim-title-input").at(1);
    wrapper.simulate("change", { target: { value: title } });
    const SomoimCreateInstance = component
      .find(SomoimCreate.WrappedComponent)
      .instance();
    expect(SomoimCreateInstance.state.title).toEqual(title);
  });

  it(`should set state properly on summary input`, () => {
    const summary = "TEST_SUMMARY";
    const component = mount(somoimCreate);

    // Form.Control made two inputs with same id
    const wrapper = component.find("#somoim-summary-input").at(1);
    wrapper.simulate("change", { target: { value: summary } });
    const SomoimCreateInstance = component
      .find(SomoimCreate.WrappedComponent)
      .instance();
    expect(SomoimCreateInstance.state.summary).toEqual(summary);
  });

  it(`should set state properly on description input`, () => {
    const description = "TEST_DESCRIPTION";
    const component = mount(somoimCreate);

    // Form.Control made two inputs with same id
    const wrapper = component.find("#somoim-description-input").at(1);
    wrapper.simulate("change", { target: { value: description } });
    const SomoimCreateInstance = component
      .find(SomoimCreate.WrappedComponent)
      .instance();
    expect(SomoimCreateInstance.state.description).toEqual(description);
  });

  it(`should set state properly on goal number input`, () => {
    const component = mount(somoimCreate);

    // Form.Control made two inputs with same id
    const wrapper = component.find("#somoim-goalnumber-input").at(1);
    wrapper.simulate("change", { target: { value: 5 } });
    const SomoimCreateInstance = component
      .find(SomoimCreate.WrappedComponent)
      .instance();
    expect(SomoimCreateInstance.state.goal_number).toEqual(5);
  });

  it(`should set goal number to min value when goal nubmer input below max`, () => {
    const component = mount(somoimCreate);

    // Form.Control made two inputs with same id
    const wrapper = component.find("#somoim-goalnumber-input").at(1);
    wrapper.simulate("change", { target: { value: -1 } });
    const SomoimCreateInstance = component
      .find(SomoimCreate.WrappedComponent)
      .instance();
    expect(SomoimCreateInstance.state.goal_number).toEqual(1);
  });

  it(`should set goal number to max value when goal nubmer input above max`, () => {
    const component = mount(somoimCreate);

    // Form.Control made two inputs with same id
    const wrapper = component.find("#somoim-goalnumber-input").at(1);
    wrapper.simulate("change", { target: { value: 105 } });
    const SomoimCreateInstance = component
      .find(SomoimCreate.WrappedComponent)
      .instance();
    expect(SomoimCreateInstance.state.goal_number).toEqual(100);
  });

  it(`should set state properly on available semester select input`, () => {
    const component = mount(somoimCreate);

    // Form.Control made two inputs with same id
    const wrapper = component.find("#somoim-available-semester-input").at(1);
    wrapper.simulate("change", { target: { value: 5 } });
    const SomoimCreateInstance = component
      .find(SomoimCreate.WrappedComponent)
      .instance();
    expect(SomoimCreateInstance.state.available_semester).toEqual(5);
  });

  it(`should set state properly on session day select input`, () => {
    const component = mount(somoimCreate);

    // Form.Control made two inputs with same id
    const wrapper = component.find("#somoim-sessionday-checkbox").at(1);
    wrapper.simulate("change");
    const SomoimCreateInstance = component
      .find(SomoimCreate.WrappedComponent)
      .instance();
    expect(SomoimCreateInstance.state.session_day).toEqual(1);
  });

  it(`should set state properly on dept input`, () => {
    const component = mount(somoimCreate);

    // Form.Control made two inputs with same id
    const wrapper = component.find("#somoimcreate-dept-input").at(1);
    wrapper.simulate("change", { target: { value: "" } });
    const SomoimCreateInstance = component
      .find(SomoimCreate.WrappedComponent)
      .instance();
    expect(SomoimCreateInstance.state.current_dept).toEqual("");
    expect(SomoimCreateInstance.state.current_major).toEqual("");

    wrapper.simulate("change", { target: { value: "DEPT_1" } });
    expect(SomoimCreateInstance.state.current_dept).toEqual("DEPT_1");
  });

  it(`should set state properly on major input`, () => {
    const component = mount(somoimCreate);

    // Form.Control made two inputs with same id
    const wrapper = component.find("#somoimcreate-major-input").at(1);
    wrapper.simulate("change", { target: { value: 2 } });
    const SomoimCreateInstance = component
      .find(SomoimCreate.WrappedComponent)
      .instance();
    expect(SomoimCreateInstance.state.current_major).toEqual(2);
  });

  it(`should handle add major button`, () => {
    const component = mount(somoimCreate);

    // Form.Control made two inputs with same id
    let wrapper = component.find("#somoimcreate-dept-input").at(1);
    wrapper.simulate("change", { target: { value: 2 } });
    wrapper = component.find("#somoimcreate-major-input").at(1);
    wrapper.simulate("change", { target: { value: "MAJOR_2" } });
    wrapper = component.find("#somoimcreate-addmajor-button").at(1);
    wrapper.simulate("click");

    const SomoimCreateInstance = component
      .find(SomoimCreate.WrappedComponent)
      .instance();
    expect(SomoimCreateInstance.state.available_major).toEqual([2]);
  });

  it(`should handle add major button if already exist`, () => {
    const component = mount(somoimCreate);

    // Form.Control made two inputs with same id
    let wrapper = component.find("#somoimcreate-dept-input").at(1);
    wrapper.simulate("change", { target: { value: 2 } });
    wrapper = component.find("#somoimcreate-major-input").at(1);
    wrapper.simulate("change", { target: { value: "MAJOR_2" } });
    wrapper = component.find("#somoimcreate-addmajor-button").at(1);
    wrapper.simulate("click");

    wrapper.simulate("click");

    const SomoimCreateInstance = component
      .find(SomoimCreate.WrappedComponent)
      .instance();
    expect(SomoimCreateInstance.state.available_major).toEqual([2]);
  });

  it(`should handle add all major button`, () => {
    const component = mount(somoimCreate);

    const wrapper = component.find("#somoimcreate-addallmajor-button").at(1);
    wrapper.simulate("click");

    const SomoimCreateInstance = component
      .find(SomoimCreate.WrappedComponent)
      .instance();
    expect(SomoimCreateInstance.state.available_major).toEqual([1, 2]);
  });

  it(`should handle add all major button when no major props`, () => {
    const tempInitialState = {};

    let tempSomoimCreate = (
      <Provider store={getMockStore(tempInitialState)}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <SomoimCreate show={true} />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    const component = mount(tempSomoimCreate);

    const SomoimCreateInstance = component
      .find(SomoimCreate.WrappedComponent)
      .instance();

    SomoimCreateInstance.setState({ current_dept: "hi", current_major: "hi" });

    let wrapper = component.find("#somoimcreate-addmajor-button").at(1);
    wrapper.simulate("click");

    wrapper = component.find("#somoimcreate-addallmajor-button").at(1);
    wrapper.simulate("click");

    expect(SomoimCreateInstance.state.available_major).toEqual([]);
  });

  it(`should handle remove one major button`, () => {
    const component = mount(somoimCreate);

    let wrapper = component.find("#somoimcreate-dept-input").at(1);
    wrapper.simulate("change", { target: { value: 2 } });
    wrapper = component.find("#somoimcreate-major-input").at(1);
    wrapper.simulate("change", { target: { value: "MAJOR_2" } });
    wrapper = component.find("#somoimcreate-addmajor-button").at(1);
    wrapper.simulate("click");

    wrapper = component.find("#somoimcreate-removemajor-button").at(1);
    wrapper.simulate("click");

    const SomoimCreateInstance = component
      .find(SomoimCreate.WrappedComponent)
      .instance();
    expect(SomoimCreateInstance.state.available_major).toEqual([]);
  });

  it(`should handle remove all major button`, () => {
    const component = mount(somoimCreate);

    let wrapper = component.find("#somoimcreate-addallmajor-button").at(1);
    wrapper.simulate("click");

    wrapper = component.find("#somoimcreate-removeallmajor-button").at(1);
    wrapper.simulate("click");

    const SomoimCreateInstance = component
      .find(SomoimCreate.WrappedComponent)
      .instance();
    expect(SomoimCreateInstance.state.available_major).toEqual([]);
  });

  it(`should handle confirm button`, () => {
    const spyWindowAlert = jest
      .spyOn(window, "alert")
      .mockImplementation(path => {});

    const component = mount(somoimCreate);

    const SomoimCreateInstance = component
      .find(SomoimCreate.WrappedComponent)
      .instance();

    SomoimCreateInstance.setState({
      title: "title",
      summary: "summary",
      description: "description"
    });

    const wrapper = component.find("#confirm-create-somoim-button").at(1);
    wrapper.simulate("click");

    expect(spyWindowAlert).toBeCalledTimes(1);
    expect(spyPostSomoim).toBeCalledTimes(1);
  });

  it(`should set state properly on category select input`, () => {
    const component = mount(somoimCreate);

    // Form.Control made two inputs with same id
    const wrapper = component.find("#somoim-category-input").at(1);
    wrapper.simulate("change", { target: { value: "CATEGORY_1" } });
    const SomoimCreateInstance = component
      .find(SomoimCreate.WrappedComponent)
      .instance();
    expect(SomoimCreateInstance.state.category).toEqual(1);
  });
});
