import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import SignUp from "./SignUp";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as actionCreators from "../store/actions/user";

const stubInitialState = {
  deptnames: [
    {
      id: 0,
      name: "TEST_DEPT"
    }
  ],
  majors: [
    {
      id: 0,
      dept_id: 0,
      name: "TEST_MAJOR"
    }
  ]
};

const mockStore = getMockStore(stubInitialState);

jest.mock("../components/Header", () => {
  return jest.fn(props => {
    return <div className="spyHeader">헤더</div>;
  });
});

describe("<SignUp />", () => {
  let signup;

  beforeEach(() => {
    signup = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <SignUp />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it("should render SignUp", () => {
    const component = mount(signup);
    const wrapper = component.find(".SignUp");
    expect(wrapper.length).toBe(1);

    const wrapper4 = component.find(".spyHeader");
    expect(wrapper4.length).toBe(1);
    expect(wrapper4.text()).toBe("헤더");

    const wrapper2 = component.find("p");
    expect(wrapper2.length).toBe(1);
    expect(wrapper2.text()).toBe("어서 오시게나");

    const wrapper3 = component.find("h1");
    expect(wrapper3.length).toBe(1);
    expect(wrapper3.text()).toBe("회원 가입");
  });

  it(`should set state properly on username input`, () => {
    const username = "TEST_USERNAME";
    const component = mount(signup);
    const wrapper = component.find("#formBasicUsername");
    wrapper.simulate("change", { target: { value: username } });
    const signUpInstance = component.find(SignUp.WrappedComponent).instance();
    expect(signUpInstance.state.username).toEqual(username);
  });

  it(`should set state properly on email input`, () => {
    const email = "TEST_EMAIL";
    const component = mount(signup);
    const wrapper = component.find("#formBasicEmail");
    wrapper.simulate("change", { target: { value: email } });
    const signUpInstance = component.find(SignUp.WrappedComponent).instance();
    expect(signUpInstance.state.email).toEqual(email);
  });

  it(`should set state properly on password input`, () => {
    const password = "TEST_PASSWORD";
    const component = mount(signup);
    const wrapper = component.find("#formBasicPassword");
    wrapper.simulate("change", { target: { value: password } });
    const signUpInstance = component.find(SignUp.WrappedComponent).instance();
    expect(signUpInstance.state.password).toEqual(password);
  });

  it(`should set state properly on password-again input`, () => {
    const passwordAgain = "TEST_PASSWORD_AGAIN";
    const component = mount(signup);
    const wrapper = component.find("#formBasicPasswordAgain");
    wrapper.simulate("change", { target: { value: passwordAgain } });
    const signUpInstance = component.find(SignUp.WrappedComponent).instance();
    expect(signUpInstance.state.passwordAgain).toEqual(passwordAgain);
  });

  it(`should set state properly on dept input`, () => {
    const dept = "TEST_DEPT";
    const component = mount(signup);
    const wrapper = component.find("#formDept");
    wrapper.simulate("change", { target: { value: dept } });
    const signUpInstance = component.find(SignUp.WrappedComponent).instance();
    expect(signUpInstance.state.dept).toEqual(dept);
  });

  it(`should set state properly on major input`, () => {
    const major = "TEST_MAJOR";
    const component = mount(signup);
    const wrapper = component.find("#formMajor");
    wrapper.simulate("change", { target: { value: major } });
    const signUpInstance = component.find(SignUp.WrappedComponent).instance();
    expect(signUpInstance.state.major).toEqual(major);
  });

  it(`should set state properly on grade input`, () => {
    const grade = "TEST_GRADE";
    const component = mount(signup);
    const wrapper = component.find("#formGrade");
    wrapper.simulate("change", { target: { value: grade } });
    const signUpInstance = component.find(SignUp.WrappedComponent).instance();
    expect(signUpInstance.state.grade).toEqual(grade);
  });

  it(`should set state properly on availableSemester input`, () => {
    const availableSemester = "TEST_AVAILABLE_SEMESTER";
    const component = mount(signup);
    const wrapper = component.find("#formAvailableSemester");
    wrapper.simulate("change", { target: { value: availableSemester } });
    const signUpInstance = component.find(SignUp.WrappedComponent).instance();
    expect(signUpInstance.state.availableSemester).toEqual(availableSemester);
  });

  it(`should signup`, () => {
    const spyHistoryPush = jest
      .spyOn(history, "push")
      .mockImplementation(path => {});

    const spySignUp = jest
      .spyOn(actionCreators, "signUp")
      .mockImplementation(() => {
        return dispatch => {};
      });

    const spySignIn = jest
      .spyOn(actionCreators, "signIn")
      .mockImplementation(() => {
        return dispatch => {};
      });

    const spyAlert = jest.spyOn(window, "alert").mockImplementation(() => {});

    const component = mount(signup);

    const username = "TEST_USERNAME";
    component
      .find("#formBasicUsername")
      .simulate("change", { target: { value: username } });
    const email = "TEST_EMAIL";
    component
      .find("#formBasicEmail")
      .simulate("change", { target: { value: email } });
    const password = "TEST_PASSWORD";
    component
      .find("#formBasicPassword")
      .simulate("change", { target: { value: password } });
    const passwordAgain = password;
    component
      .find("#formBasicPasswordAgain")
      .simulate("change", { target: { value: passwordAgain } });
    const dept = "TEST_DEPT";
    component.find("#formDept").simulate("change", { target: { value: dept } });
    const major = "TEST_MAJOR";
    component
      .find("#formMajor")
      .simulate("change", { target: { value: major } });
    const grade = "TEST_GRADE";
    component
      .find("#formGrade")
      .simulate("change", { target: { value: grade } });
    const availableSemester = "TEST_AVAILABLE_SEMESTER";
    component
      .find("#formAvailableSemester")
      .simulate("change", { target: { value: availableSemester } });

    const wrapper = component.find(".btn-dark");
    wrapper.simulate("click");
    expect(spySignUp).toBeCalledTimes(1);
    expect(spyAlert).toHaveBeenCalledTimes(1);
    expect(spySignIn).toBeCalledTimes(1);
    expect(spyHistoryPush).toHaveBeenCalledWith("/club");
  });

  it(`test : when user didn't select dept or major`, () => {
    const component = mount(signup);

    const username = "TEST_USERNAME";
    component
      .find("#formBasicUsername")
      .simulate("change", { target: { value: username } });
    const email = "TEST_EMAIL";
    component
      .find("#formBasicEmail")
      .simulate("change", { target: { value: email } });
    const password = "TEST_PASSWORD";
    component
      .find("#formBasicPassword")
      .simulate("change", { target: { value: password } });
    const passwordAgain = password;
    component
      .find("#formBasicPasswordAgain")
      .simulate("change", { target: { value: passwordAgain } });
    const dept = "TEST_DEPT_";
    component.find("#formDept").simulate("change", { target: { value: dept } });
    const major = "TEST_MAJOR_";
    component
      .find("#formMajor")
      .simulate("change", { target: { value: major } });
    const grade = "TEST_GRADE";
    component
      .find("#formGrade")
      .simulate("change", { target: { value: grade } });
    const availableSemester = "TEST_AVAILABLE_SEMESTER";
    component
      .find("#formAvailableSemester")
      .simulate("change", { target: { value: availableSemester } });

    const wrapper = component.find(".btn-dark");
    wrapper.simulate("click");
  });

  it(`should render option list of dept & major`, () => {
    const component = mount(signup);
    const wrapper = component.find("#formDept").find("option");
    expect(wrapper.length).toBe(2);
    expect(wrapper.at(1).text()).toBe("TEST_DEPT");

    const dept = "TEST_DEPT";
    component.find("#formDept").simulate("change", { target: { value: dept } });
    const wrapper2 = component.find("#formMajor").find("option");
    expect(wrapper2.length).toBe(2);
    expect(wrapper2.at(1).text()).toBe("TEST_MAJOR");
  });

  it(`test : if there is no depts & majors`, () => {
    const mockInitialStore = getMockStore({
      deptnames: null,
      majors: null
    });
    const component = mount(
      <Provider store={mockInitialStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={SignUp} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    const wrapper = component.find("#formDept").find("option");
    expect(wrapper.length).toBe(1);
    expect(wrapper.text()).toBe("");

    const wrapper2 = component.find("#formMajor").find("option");
    expect(wrapper2.length).toBe(1);
    expect(wrapper2.text()).toBe("");

    const username = "TEST_USERNAME";
    component
      .find("#formBasicUsername")
      .simulate("change", { target: { value: username } });
    const email = "TEST_EMAIL";
    component
      .find("#formBasicEmail")
      .simulate("change", { target: { value: email } });
    const password = "TEST_PASSWORD";
    component
      .find("#formBasicPassword")
      .simulate("change", { target: { value: password } });
    const passwordAgain = password;
    component
      .find("#formBasicPasswordAgain")
      .simulate("change", { target: { value: passwordAgain } });
    const dept = "TEST_DEPT";
    component.find("#formDept").simulate("change", { target: { value: dept } });
    const major = "TEST_MAJOR";
    component
      .find("#formMajor")
      .simulate("change", { target: { value: major } });
    const grade = "TEST_GRADE";
    component
      .find("#formGrade")
      .simulate("change", { target: { value: grade } });
    const availableSemester = "TEST_AVAILABLE_SEMESTER";
    component
      .find("#formAvailableSemester")
      .simulate("change", { target: { value: availableSemester } });

    const wrapper3 = component.find(".btn-dark");
    wrapper3.simulate("click");
  });
});