import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import ClubRegister from "./ClubRegister";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as preclubActionCreators from "../store/actions/preclub";

const stubInitialState = {
  categories: [
    { id: 0, name: "CATEGORY_1" },
    { id: 1, name: "CATEGORY_2" }
  ]
};

const mockStore = getMockStore(stubInitialState);

describe("<ClubRegister />", () => {
  let clubRegister;
  let spyPostClub, spyWindowAlert, spyCreateObjectURL;

  let spyCloseHandler = () => {};

  beforeEach(() => {
    clubRegister = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <ClubRegister show={true} closeHandler={spyCloseHandler} />
                );
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spyWindowAlert = jest.spyOn(window, "alert").mockImplementation(path => {});

    spyPostClub = jest
      .spyOn(preclubActionCreators, "postPreClub")
      .mockImplementation(at => {
        return dispatch => {};
      });
  });

  it("should render Page", () => {
    const component = mount(clubRegister);

    const wrapper = component.find("Bootstrap(Modal)");
    expect(wrapper.length).toBe(1);
  });

  it("should clear inputs when new props comes (modal reopen)", () => {
    const component = mount(clubRegister);

    const wrapper = component.find("#club-name-input").at(1);
    wrapper.simulate("change", { target: { value: "TEST_NAME" } });
    const ClubRegisterInstance = component
      .find(ClubRegister.WrappedComponent)
      .instance();

    ClubRegisterInstance.UNSAFE_componentWillReceiveProps();
    expect(ClubRegisterInstance.state.name).toEqual("");
  });

  it(`should set state properly on club name input`, () => {
    const name = "TEST_NAME";
    const component = mount(clubRegister);

    // Form.Control made two inputs with same id
    const wrapper = component.find("#club-name-input").at(1);
    wrapper.simulate("change", { target: { value: name } });
    const ClubRegisterInstance = component
      .find(ClubRegister.WrappedComponent)
      .instance();
    expect(ClubRegisterInstance.state.name).toEqual(name);
  });

  it(`should set state properly on category select input`, () => {
    const component = mount(clubRegister);

    // Form.Control made two inputs with same id
    const wrapper = component.find("#club-category-input").at(1);
    wrapper.simulate("change", { target: { value: 2 } });
    const ClubRegisterInstance = component
      .find(ClubRegister.WrappedComponent)
      .instance();
    expect(ClubRegisterInstance.state.selected_category).toEqual(2);
  });

  it(`should set state properly on proper file input`, () => {
    const component = mount(clubRegister);

    const wrapper = component.find("#auth-img-input").at(1);

    wrapper.props().onChange([{ blob: "blob" }]);
    const ClubRegisterInstance = component
      .find(ClubRegister.WrappedComponent)
      .instance();
    expect(ClubRegisterInstance.state.auth_img_file).toEqual("blob");
  });

  it(`should set state properly on manager input`, () => {
    const manager = "TEST_MANAGER";
    const component = mount(clubRegister);

    const wrapper = component.find(".club-manager-input").at(1);
    wrapper.simulate("change", { target: { value: manager } });
    const ClubRegisterInstance = component
      .find(ClubRegister.WrappedComponent)
      .instance();
    expect(ClubRegisterInstance.state.clubmanager).toEqual(manager);
  });

  it(`should handle confirm button`, () => {
    const component = mount(clubRegister);

    const ClubRegisterInstance = component
      .find(ClubRegister.WrappedComponent)
      .instance();

    ClubRegisterInstance.setState({
      name: "name",
      clubmanager: "manager",
      auth_img_file: "auth"
    });

    let wrapper = component.find("#confirm-create-button").at(1);
    wrapper.simulate("click");

    expect(spyPostClub).toHaveBeenCalledTimes(1);
    expect(spyWindowAlert).toHaveBeenCalledTimes(1);
  });
});
