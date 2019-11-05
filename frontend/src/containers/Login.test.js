import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import Login from "./Login";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as actionCreators from "../store/actions/user";

const stubInitialState = {
  users: [
    {
      username: "test",
      email: "TEST_EMAIL",
      password: "TEST_PASSWORD",
      dept: 1,
      major: 1,
      grade: 1,
      available_semester: 1
    }
  ]
};

const mockStore = getMockStore(stubInitialState);

describe("<Login />", () => {
  let login;
  let spyOnHide = () => {};
  let spySignIn;

  beforeEach(() => {
    login = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <Login show={true} onHide={spyOnHide} />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spySignIn = jest.spyOn(actionCreators, "signIn").mockImplementation(() => {
      return dispatch => {
        return new Promise(() => {});
      };
    });
  });

  it("should render Login", () => {
    const component = mount(login);

    const wrapper = component.find("Login");
    expect(wrapper.length).toBe(1);

    const wrapper2 = component.find(".modal-header");
    expect(wrapper2.length).toBe(1);
    expect(wrapper2.text()).toBe("로그인");
  });

  it("should clear inputs when modal reopen", () => {
    const component = mount(login);

    const wrapper = component.find("#formBasicEmail");
    wrapper.simulate("change", { target: { value: "TEST_EMAIL" } });
    const loginInstance = component.find(Login.WrappedComponent).instance();
    loginInstance.UNSAFE_componentWillReceiveProps();
    expect(loginInstance.state.email).toEqual("");
  });

  it(`should set state properly on email input`, () => {
    const email = "TEST_EMAIL";
    const component = mount(login);
    const wrapper = component.find("#formBasicEmail");
    wrapper.simulate("change", { target: { value: email } });
    const loginInstance = component.find(Login.WrappedComponent).instance();
    expect(loginInstance.state.email).toEqual(email);
  });

  it(`should set state properly on password input`, () => {
    const password = "TEST_PASSWORD";
    const component = mount(login);
    const wrapper = component.find("#formBasicPassword");
    wrapper.simulate("change", { target: { value: password } });
    const loginInstance = component.find(Login.WrappedComponent).instance();
    expect(loginInstance.state.password).toEqual(password);
  });

  it(`should sign in`, () => {
    const component = mount(login);

    const email = "TEST_EMAIL";
    component
      .find("#formBasicEmail")
      .simulate("change", { target: { value: email } });
    const password = "TEST_PASSWORD";
    component
      .find("#formBasicPassword")
      .simulate("change", { target: { value: password } });

    const wrapper = component.find(".btn-dark");
    wrapper.simulate("click");
    expect(spySignIn).toBeCalledTimes(1);

    jest.clearAllMocks();
  });

  it(`should close modal`, () => {
    const component = mount(login);

    const wrapper = component.find(".modal-backdrop");
    wrapper.simulate("click");
  });
});
