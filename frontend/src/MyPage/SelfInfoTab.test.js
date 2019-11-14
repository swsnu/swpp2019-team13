import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import SelfInfoTab from "./SelfInfoTab";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as userActions from "../store/actions/user";
import * as clubActions from "../store/actions/club";
import * as somoimActions from "../store/actions/somoim";
import * as categoryActions from "../store/actions/category";
import * as tagActions from "../store/actions/tag";
import * as deptActions from "../store/actions/dept";
import * as majorActions from "../store/actions/major";

let stubInitialState = {
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
    }
  ],
  majors: [
    {
      id: 0,
      dept_id: 0,
      name: "건설환경공학부"
    },
    {
      id: 1,
      dept_id: 0,
      name: "기계항공공학부"
    },
    {
      id: 2,
      dept_id: 0,
      name: "재료공학부"
    },
    {
      id: 3,
      dept_id: 0,
      name: "전기정보공학부"
    },
    {
      id: 4,
      dept_id: 0,
      name: "컴퓨터공학부"
    }
  ],
  loggedUser: {
    username: "test",
    email: "test@test.com",
    password: "test",
    dept: 0,
    major: 3,
    grade: 3,
    available_semester: 2
  }
};

let mockStore = getMockStore(stubInitialState);

describe("<SelfInfoTab />", () => {
  let selfInfoTab;
  let spyPutUserInformation;

  beforeEach(() => {
    selfInfoTab = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <SelfInfoTab />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spyPutUserInformation = jest
      .spyOn(userActions, "putUserInformation")
      .mockImplementation(() => {
        return dispatch => {};
      });
  });

  it("should render Page", () => {
    const component = mount(selfInfoTab);
    const wrapper = component.find("SelfInfoTab");
    expect(wrapper.length).toBe(1);
  });

  it("update name", () => {
    let component = mount(selfInfoTab);
    let wrapper = component.find("#formBasicUsername");
    let mainInstance = component.find("SelfInfoTab").instance();
    wrapper.simulate("change", { target: { value: "aa" } });
    wrapper.simulate("change", { target: { value: "bb" } });
    expect(mainInstance.state.name).toEqual("bb");
  });

  it("update dept", () => {
    let component = mount(selfInfoTab);
    let wrapper = component.find("#formDept");
    let mainInstance = component.find("SelfInfoTab").instance();
    wrapper.simulate("change", { target: { value: 0 } });
    wrapper.simulate("change", { target: { value: 2 } });
    expect(mainInstance.state.dept).toEqual(2);
  });

  it("update major", () => {
    let component = mount(selfInfoTab);
    let wrapper = component.find("#formMajor");
    let mainInstance = component.find("SelfInfoTab").instance();
    wrapper.simulate("change", { target: { value: 0 } });
    wrapper.simulate("change", { target: { value: 2 } });
    expect(mainInstance.state.major).toEqual(2);
  });

  it("update grade", () => {
    let component = mount(selfInfoTab);
    let wrapper = component.find("#formGrade");
    let mainInstance = component.find("SelfInfoTab").instance();
    wrapper.simulate("change", { target: { value: 3 } });
    wrapper.simulate("change", { target: { value: 6 } });
    expect(mainInstance.state.grade).toEqual(6);
  });

  it("update available semester", () => {
    let component = mount(selfInfoTab);
    let wrapper = component.find("#formavailable_semester");
    let mainInstance = component.find("SelfInfoTab").instance();
    wrapper.simulate("change", { target: { value: 2 } });
    wrapper.simulate("change", { target: { value: 4 } });
    expect(mainInstance.state.available_semester).toEqual(4);
  });

  it("update signup session day", () => {
    let component = mount(selfInfoTab);
    let mainInstance = component.find("SelfInfoTab").instance();
    mainInstance.setState({
      ...mainInstance.state,
      forceRender: Math.random()
    });
    let wrapper = component.find("#mypage-sessionday-checkbox");
    wrapper.at(2).prop("onChange")({ currentTarget: { checked: false } });
    expect(mainInstance.state.available_session_day).toEqual(2);
  });

  it("not logged in user", () => {
    let spyPush = jest.spyOn(history, "push").mockImplementation(path => {});

    let saved = stubInitialState.loggedUser;
    stubInitialState.loggedUser = null;
    mockStore = getMockStore(stubInitialState);
    selfInfoTab = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <SelfInfoTab />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    let component = mount(selfInfoTab);
    let mainInstance = component.find("SelfInfoTab").instance();
    mainInstance.setState({
      ...mainInstance.state,
      forceRender: Math.random()
    });
    expect(spyPush).toBeCalledTimes(1);

    stubInitialState.loggedUser = saved;
    mockStore = getMockStore(stubInitialState);
  });

  it("update info button handle", () => {
    let component = mount(selfInfoTab);
    let wrapper = component.find(".edit-info-button");
    let mainInstance = component.find("SelfInfoTab").instance();
    mainInstance.setState({
      ...mainInstance.state,
      forceRender: Math.random()
    });
    mainInstance.setState({
      ...mainInstance.state,
      name: "stringTest",
      email: "stringTest",
      dept: "stringTest",
      major: "stringTest",
      grade: "stringTest",
      available_semester: "stringTest",
      available_session_day: "stringTest"
    });
    wrapper.at(0).simulate("click");
    expect(spyPutUserInformation).toBeCalledTimes(1);
  });

  it("when dept info does not loaded yet", () => {
    let savedInfo = stubInitialState.depts;
    stubInitialState.depts = null;
    mockStore = getMockStore(stubInitialState);
    selfInfoTab = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <SelfInfoTab />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(selfInfoTab);

    stubInitialState.depts = savedInfo;
    mockStore = getMockStore(stubInitialState);
  });

  it("when major info does not loaded yet", () => {
    let savedInfo = stubInitialState.majors;
    stubInitialState.majors = null;
    mockStore = getMockStore(stubInitialState);
    selfInfoTab = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <SelfInfoTab />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(selfInfoTab);

    stubInitialState.majors = savedInfo;
    mockStore = getMockStore(stubInitialState);
  });
});
