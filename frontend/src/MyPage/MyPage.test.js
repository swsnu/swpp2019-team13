import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import MyPage from "./MyPage";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";

let stubInitialState = {
  deptnames: [
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
    availableSemester: 2
  }
};

let mockStore = getMockStore(stubInitialState);

describe("<MyPage />", () => {
  let myPage;

  beforeEach(() => {
    myPage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <MyPage />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it("should render Page", () => {
    const component = mount(myPage);
    const wrapper = component.find("MyPage");
    expect(wrapper.length).toBe(1);
  });

  it("when logged user info does not loaded yet", () => {
    let savedLoggedUser = stubInitialState.loggedUser;
    stubInitialState.loggedUser = null;
    mockStore = getMockStore(stubInitialState);
    myPage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <MyPage />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(myPage);

    stubInitialState.loggedUser = savedLoggedUser;
    mockStore = getMockStore(stubInitialState);
  });

  it("when dept info does not loaded yet", () => {
    let savedInfo = stubInitialState.deptnames;
    stubInitialState.deptnames = null;
    mockStore = getMockStore(stubInitialState);
    myPage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <MyPage />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(myPage);

    stubInitialState.deptnames = savedInfo;
    mockStore = getMockStore(stubInitialState);
  });

  it("when major info does not loaded yet", () => {
    let savedInfo = stubInitialState.majors;
    stubInitialState.majors = null;
    mockStore = getMockStore(stubInitialState);
    myPage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <MyPage />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(myPage);

    stubInitialState.majors = savedInfo;
    mockStore = getMockStore(stubInitialState);
  });
});
