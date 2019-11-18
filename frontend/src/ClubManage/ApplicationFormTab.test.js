import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import ApplicationFormTab from "./ApplicationFormTab";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as userActions from "../store/actions/user";
import * as clubActions from "../store/actions/club";
import * as somoimActions from "../store/actions/somoim";
import * as categoryActions from "../store/actions/category";
import * as tagActions from "../store/actions/tag";
import * as deptActions from "../store/actions/dept";
import * as majorActions from "../store/actions/major";

// jest.mock("../Club/ClubDetail", () => {
//   return jest.fn(props => {
//     return <div id="spyClubDetail" onClick={props.closeHandler}></div>;
//   });
// });

let stubInitialState = {
  applicationForm: {
    short_texts: [{ title: "short_title", order: 0 }],
    long_texts: [{ title: "long_title", order: 1 }],
    multi_choices: [
      {
        title: "multi_title",
        order: 2,
        choices: [{ content: "a", isDeleted: false, id: 0 }],
        choiceID: 1
      }
    ],
    images: [{ title: "image_title", order: 4 }],
    files: [{ title: "file_title", order: 3 }]
  }
};

let mockStore = getMockStore(stubInitialState);

describe("<ApplicationFormTab />", () => {
  let applicationFormTab;
  let spyGetApplicationFormByID, spyPutApplicationFormByID;

  beforeEach(() => {
    applicationFormTab = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <ApplicationFormTab />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spyGetApplicationFormByID = jest
      .spyOn(clubActions, "getApplicationFormByID")
      .mockImplementation(() => {
        return dispatch => {};
      });
    spyPutApplicationFormByID = jest
      .spyOn(clubActions, "putApplicationFormByID")
      .mockImplementation(() => {
        return dispatch => {};
      });
  });

  it("should render Page", () => {
    const component = mount(applicationFormTab);
    const wrapper = component.find("ApplicationFormTab");
    expect(wrapper.length).toBe(1);
  });

  it("should load and render forms", () => {
    let component = mount(applicationFormTab);
    let wrapper = component.find("ApplicationFormTab");
    let mainInstance = component.find("ApplicationFormTab").instance();

    mainInstance.setState({
      ...mainInstance.state,
      forceRender: Math.random()
    });
    expect(wrapper.length).toBe(1);
  });

  it("short form add button click handle", () => {
    let component = mount(applicationFormTab);
    let mainInstance = component.find("ApplicationFormTab").instance();
    let wrapper = component.find(".short-form-button");
    let id = mainInstance.state.formID;
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.formID).toBe(id + 1);
  });
  it("long form add button click handle", () => {
    let component = mount(applicationFormTab);
    let mainInstance = component.find("ApplicationFormTab").instance();
    let wrapper = component.find(".long-form-button");
    let id = mainInstance.state.formID;
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.formID).toBe(id + 1);
  });
  it("multi choice form add button click handle", () => {
    let component = mount(applicationFormTab);
    let mainInstance = component.find("ApplicationFormTab").instance();
    let wrapper = component.find(".multi-form-button");
    let id = mainInstance.state.formID;
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.formID).toBe(id + 1);
  });
  it("image form add button click handle", () => {
    let component = mount(applicationFormTab);
    let mainInstance = component.find("ApplicationFormTab").instance();
    let wrapper = component.find(".image-form-button");
    let id = mainInstance.state.formID;
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.formID).toBe(id + 1);
  });
  it("file form add button click handle", () => {
    let component = mount(applicationFormTab);
    let mainInstance = component.find("ApplicationFormTab").instance();
    let wrapper = component.find(".file-form-button");
    let id = mainInstance.state.formID;
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.formID).toBe(id + 1);
  });

  it("save button click handle", () => {
    let component = mount(applicationFormTab);
    let mainInstance = component.find("ApplicationFormTab").instance();
    let wrapper = component.find(".form-save-button");
    mainInstance.setState({
      ...mainInstance.state,
      forceRender: Math.random()
    });
    wrapper.at(0).simulate("click");
    expect(spyPutApplicationFormByID).toBeCalledTimes(1);
  });

  it("choice add/remove click handle", () => {
    let component = mount(applicationFormTab);
    let mainInstance = component.find("ApplicationFormTab").instance();
    mainInstance.setState({
      ...mainInstance.state,
      forceRender: Math.random()
    });
    component.update();
    let wrapper = component.find(".choice-add-button");
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.formList[2].choices.length).toBe(2);
    wrapper.at(0).simulate("click");
    wrapper = component.find(".choice-remove-button");
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.formList[2].choices[0].isDeleted).toBe(true);
  });

  it("multi choice default onChange handle", () => {
    let component = mount(applicationFormTab);
    let mainInstance = component.find("ApplicationFormTab").instance();
    mainInstance.setState({
      ...mainInstance.state,
      forceRender: Math.random()
    });
    component.update();
    let wrapper = component.find(".multi-default-choice");
    wrapper.at(0).simulate("change", { target: { value: "aa" } });
    expect(mainInstance.state.formList[2].defaultChoice).toEqual("aa");
  });

  it("multi choice onChange handle", () => {
    let component = mount(applicationFormTab);
    let mainInstance = component.find("ApplicationFormTab").instance();
    mainInstance.setState({
      ...mainInstance.state,
      forceRender: Math.random()
    });
    component.update();
    let wrapper = component.find(".choice-add-button");
    wrapper.at(0).simulate("click");
    wrapper.at(0).simulate("click");
    wrapper = component.find(".multi-choice-textbox");
    wrapper.at(0).simulate("change", { target: { value: "aa" } });
    expect(mainInstance.state.formList[2].choices[0].content).toEqual("aa");
  });

  it("form delete button click handle", () => {
    let component = mount(applicationFormTab);
    let mainInstance = component.find("ApplicationFormTab").instance();
    mainInstance.setState({
      ...mainInstance.state,
      forceRender: Math.random()
    });
    component.update();
    let wrapper = component.find(".form-delete-button");
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.formList[0].isDeleted).toEqual(true);
  });

  it("form title input onChange handle", () => {
    let component = mount(applicationFormTab);
    let mainInstance = component.find("ApplicationFormTab").instance();
    mainInstance.setState({
      ...mainInstance.state,
      forceRender: Math.random()
    });
    component.update();
    let wrapper = component.find(".form-title-input");
    wrapper.at(0).simulate("change", { target: { value: "aa" } });
    expect(mainInstance.state.formList[0].title).toEqual("aa");
  });

  it("non-existing form case (cannot happen)", () => {
    let component = mount(applicationFormTab);
    let wrapper = component.find("ApplicationFormTab");
    let mainInstance = component.find("ApplicationFormTab").instance();

    mainInstance.setState({
      ...mainInstance.state,
      formList: mainInstance.state.formList.concat({ type: "", id: 100 })
    });
    expect(wrapper.length).toBe(1);
  });

  it("form data is not prepared (cannot happen)", () => {
    let saved = stubInitialState.applicationForm;
    stubInitialState.applicationForm = null;
    mockStore = getMockStore(stubInitialState);
    applicationFormTab = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <ApplicationFormTab />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    let component = mount(applicationFormTab);
    let wrapper = component.find("ApplicationFormTab");
    let mainInstance = component.find("ApplicationFormTab").instance();

    mainInstance.setState({
      ...mainInstance.state,
      formList: mainInstance.state.formList.concat({ type: "", id: 100 })
    });
    expect(wrapper.length).toBe(1);

    stubInitialState.applicationForm = saved;
    mockStore = getMockStore(stubInitialState);
  });
});
