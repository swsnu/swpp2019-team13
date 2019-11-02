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
      availableSemester: 1
    }
  ]
};

const mockStore = getMockStore(stubInitialState);

describe("<Login />", () => {
  let login;

  let spyOnHide = () => {};

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
  });

  it("should render Login", () => {
    const component = mount(login);

    const wrapper = component.find("Login");
    expect(wrapper.length).toBe(1);

    const wrapper2 = component.find(".modal-header");
    expect(wrapper2.length).toBe(1);
    expect(wrapper2.text()).toBe("로그인");
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

  it(`should signin`, () => {
    const spySignIn = jest
      .spyOn(actionCreators, "signIn")
      .mockImplementation(() => {
        return dispatch => {
          dispatch();
        };
      });

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

  it(`should not signin`, () => {
    const spySignIn = jest
      .spyOn(actionCreators, "signIn")
      .mockImplementation(() => {
        return dispatch => {};
      });

    const component = mount(login);

    const email = "WRONG_EMAIL";
    component
      .find("#formBasicEmail")
      .simulate("change", { target: { value: email } });
    const password = "WRONG_PASSWORD";
    component
      .find("#formBasicPassword")
      .simulate("change", { target: { value: password } });

    const wrapper = component.find(".btn-dark");
    wrapper.simulate("click");
    expect(spySignIn).toBeCalledTimes(0);

    const wrapper2 = component.find("#wrong-input");
    expect(wrapper2.length).toBe(1);
    expect(wrapper2.text()).toBe("Email or Password is wrong, try again");
  });

  it(`should close modal`, () => {
    const component = mount(login);

    const wrapper = component.find(".modal-backdrop");
    wrapper.simulate("click");
  });
});
