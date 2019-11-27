import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import ApplyMain from "./ApplyMain";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as userActions from "../store/actions/user";
import * as clubActions from "../store/actions/club";
import * as somoimActions from "../store/actions/somoim";
import * as categoryActions from "../store/actions/category";
import * as tagActions from "../store/actions/tag";
import * as deptActions from "../store/actions/dept";
import * as majorActions from "../store/actions/major";

jest.mock("../Header/Header", () => {
  return jest.fn(props => {
    return <div id="spyHeader"></div>;
  });
});

let stubInitialState = {
  selectedApplication: {
    short_texts: [{ title: "short_title", order: 0 }],
    long_texts: [{ title: "long_title", order: 1 }],
    multi_choices: [
      {
        title: "multi_title",
        order: 2,
        choices: [
          { content: "a", id: 0 },
          { content: "b", id: 1 }
        ],
        choiceID: 1
      }
    ],
    images: [
      { title: "image_title", order: 4, content: "test" },
      { title: "image_title", order: 6 }
    ],
    files: [
      { title: "file_title", order: 3, content: "test" },
      { title: "file_title", order: 5 }
    ]
  },
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

describe("<ApplyMain />", () => {
  let applyMain;
  let spyGetClubByID, spyGetApplicationByID, spyPutApplicationByID;

  beforeEach(() => {
    applyMain = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <ApplyMain />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spyGetClubByID = jest
      .spyOn(clubActions, "getClubByID")
      .mockImplementation(() => {
        return dispatch => {};
      });

    spyGetApplicationByID = jest
      .spyOn(clubActions, "getApplicationByID")
      .mockImplementation(() => {
        return dispatch => {};
      });
    spyPutApplicationByID = jest
      .spyOn(clubActions, "putApplicationByID")
      .mockImplementation(() => {
        return dispatch => {};
      });
  });

  it("should render Page", () => {
    const component = mount(applyMain);
    const wrapper = component.find("ApplyMain");
    expect(wrapper.length).toBe(1);
  });

  it("load all forms", () => {
    let component = mount(applyMain);
    let mainInstance = component.find("ApplyMain").instance();
    mainInstance.setState({
      ...mainInstance.state,
      forceUpdate: Math.random()
    });
    component.update();
    mainInstance.setState({
      ...mainInstance.state,
      formList: mainInstance.state.formList.concat({ id: Math.random() })
    });
    component.update();

    expect(mainInstance.state.formList.length).toEqual(8);
  });

  it("shorttext change handle", () => {
    let component = mount(applyMain);
    let mainInstance = component.find("ApplyMain").instance();
    mainInstance.setState({
      ...mainInstance.state,
      forceUpdate: Math.random()
    });
    component.update();

    let wrapper = component.find(".short-input");
    wrapper.at(0).simulate("change", { target: { value: "aa" } });
    expect(mainInstance.state.formList[0].content).toEqual("aa");
  });

  it("longtext change handle", () => {
    let component = mount(applyMain);
    let mainInstance = component.find("ApplyMain").instance();
    mainInstance.setState({
      ...mainInstance.state,
      forceUpdate: Math.random()
    });
    component.update();

    let wrapper = component.find(".long-input");
    wrapper.at(0).simulate("change", { target: { value: "aa" } });
    expect(mainInstance.state.formList[1].content).toEqual("aa");
  });

  it("checkbox handle", () => {
    let component = mount(applyMain);
    let mainInstance = component.find("ApplyMain").instance();
    mainInstance.setState({
      ...mainInstance.state,
      forceUpdate: Math.random()
    });
    component.update();

    let wrapper = component.find("[type='checkbox']");
    wrapper.at(1).prop("onChange")({ currentTarget: { checked: true } });
    expect(mainInstance.state.formList[2].choices[1].checked).toEqual(true);
  });

  it("image, file select handle", async () => {
    let component = mount(applyMain);
    let mainInstance = component.find("ApplyMain").instance();
    mainInstance.setState({
      ...mainInstance.state,
      forceUpdate: Math.random()
    });
    component.update();

    let wrapper = component.find("[type='file']");
    await wrapper
      .at(0)
      .prop("onChange")({ target: { files: [new Blob()] } })
      .then(
        wrapper.at(1).prop("onChange")({ target: { files: [new Blob()] } })
      );

    // expect(mainInstance.state.formList[2].defaultChoice).toEqual("aa");
  });

  it("save button click handle", () => {
    let component = mount(applyMain);
    let mainInstance = component.find("ApplyMain").instance();
    mainInstance.setState({
      ...mainInstance.state,
      forceUpdate: Math.random()
    });
    component.update();
    let wrapper = component.find(".form-save-button");
    wrapper.at(0).simulate("click");
    expect(spyPutApplicationByID).toBeCalledTimes(1);
  });

  it("club info existing case", () => {
    stubInitialState.selectedClub = { name: "test-club" };
    mockStore = getMockStore(stubInitialState);
    applyMain = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <ApplyMain />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    let component = mount(applyMain);
    let wrapper = component.find(".club-name-indicator");

    expect(wrapper.at(0).text()).toBe("test-club 지원하기");

    stubInitialState.selectedClub = null;
    mockStore = getMockStore(stubInitialState);
  });

  it("application info already exist", () => {
    stubInitialState.myApplication = [];
    mockStore = getMockStore(stubInitialState);
    applyMain = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <ApplyMain />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    let component = mount(applyMain);
    let mainInstance = component.find("ApplyMain").instance();
    mainInstance.setState({
      ...mainInstance.state,
      forceUpdate: Math.random()
    });
    component.update();

    expect(mainInstance.state.formList.length).toEqual(0);

    stubInitialState.myApplication = null;
    mockStore = getMockStore(stubInitialState);
  });

  it("user not logged in", () => {
    let savedData = stubInitialState.loggedUser;
    stubInitialState.loggedUser = null;
    mockStore = getMockStore(stubInitialState);
    applyMain = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <ApplyMain />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    let component = mount(applyMain);
    let mainInstance = component.find("ApplyMain").instance();
    let spyPush = jest.spyOn(history, "push").mockImplementation(() => {
      return dispatch => new Promise(resolve => resolve());
    });
    mainInstance.setState({
      ...mainInstance.state,
      forceUpdate: Math.random()
    });
    component.update();

    expect(spyPush).toBeCalledTimes(1);

    stubInitialState.loggedUser = savedData;
    mockStore = getMockStore(stubInitialState);
  });

  it("user not logged in", () => {
    let savedData = stubInitialState.selectedApplication;
    stubInitialState.selectedApplication = null;
    mockStore = getMockStore(stubInitialState);
    applyMain = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <ApplyMain />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    let component = mount(applyMain);
    let mainInstance = component.find("ApplyMain").instance();

    mainInstance.setState({
      ...mainInstance.state,
      forceUpdate: Math.random()
    });
    component.update();

    expect(mainInstance.state.formList.length).toEqual(0);

    stubInitialState.selectedApplication = savedData;
    mockStore = getMockStore(stubInitialState);
  });
});
