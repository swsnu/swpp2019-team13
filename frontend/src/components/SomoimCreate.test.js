import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import SomoimCreate from "./SomoimCreate";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as somoimActionCreators from "../store/actions/somoim";

const stubInitialState = {
  somoims: [
    {
      id: 0,
      title: "Let's LoL!",
      summary: "Playing LoL together!! :D",
      description: "LoL\nLoL\nLol",
      selected_dept: [0, 1],
      category: 1,
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
      category: 1,
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
      category: 1,
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
      category: 1,
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
  depts: [
    { id: 0, name: "DEPT_1" },
    { id: 1, name: "DEPT_2" }
  ],
  categories: [
    { id: 0, name: "CATEGORY_1" },
    { id: 1, name: "CATEGORY_2" }
  ]
};

const mockStore = getMockStore(stubInitialState);

describe("<SomoimCreate />", () => {
  let somoimCreate;
  let spyPostSomoim;

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
      .mockImplementation(at => {
        return dispatch => {};
      });
  });

  it("should render Page", () => {
    const component = mount(somoimCreate);

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
  /*
  it(`should set state properly after select new dept name`, () => {
    const component = mount(somoimCreate);

    // Form.Check made two inputs with same id, so it will have 4 in this case
    // (depts have 2 elements in mockstate)
    const wrapper = component.find("#somoim-dept-checkbox").at(1);
    wrapper.simulate("change", { target: { checked: true } });
    const SomoimCreateInstance = component
      .find(SomoimCreate.WrappedComponent)
      .instance();
    expect(SomoimCreateInstance.state.selected_dept).toEqual([0]);
  });

  it(`should set state properly after deselect dept name`, () => {
    const component = mount(somoimCreate);

    // Form.Check made two inputs with same id, so it will have 4 in this case
    // (depts have 2 elements in mockstate)
    const wrapper = component.find("#somoim-dept-checkbox").at(1);
    wrapper.simulate("change", { target: { checked: true } });
    wrapper.simulate("change", { target: { checked: false } });
    const SomoimCreateInstance = component
      .find(SomoimCreate.WrappedComponent)
      .instance();
    expect(SomoimCreateInstance.state.selected_dept).toEqual([]);
  });
*/
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

  it(`should handle confirm button`, () => {
    const spyWindowAlert = jest
      .spyOn(window, "alert")
      .mockImplementation(path => {});
    const component = mount(somoimCreate);
    const wrapper = component.find("#confirm-create-somoim-button").at(1);
    wrapper.simulate("click");
    //expect(spyWindowAlert).toBeCalledWith("Create Somoim Success!");
    //expect(spyPostSomoim).toHaveBeenCalledTimes(1);
  });
  it(`should set state properly on category select input`, () => {
    const component = mount(somoimCreate);

    // Form.Control made two inputs with same id
    const wrapper = component.find("#somoim-category-input").at(1);
    wrapper.simulate("change", { target: { value: "CATEGORY_1" } });
    const SomoimCreateInstance = component
      .find(SomoimCreate.WrappedComponent)
      .instance();
    expect(SomoimCreateInstance.state.category).toEqual(0);
  });
});
