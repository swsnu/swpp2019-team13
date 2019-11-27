import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import ApplicantTab from "./ApplicantTab";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as userActionCreators from "../store/actions/user";
import * as clubActionCreators from "../store/actions/club";
import * as tagActionCreators from "../store/actions/tag";

jest.mock("../Apply/ApplicationDetail", () => {
  return jest.fn(props => {
    return <div className="spyDetail" onClick={props.closeHandler} />;
  });
});

const stubInitialState = {
  users: [
    {
      id: 1,
      user: { last_name: "test" },
      dept: { name: "test" },
      major: { name: "test" }
    }
  ],
  applicationList: [{ user: 1 }]
};

let mockStore = getMockStore(stubInitialState);

describe("<ApplicantTab />", () => {
  let applicantTab;
  let spyUserList, spyApplicationList, spyPostClubPoster, spyGetExtractedTag;

  beforeEach(() => {
    applicantTab = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={ApplicantTab} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spyUserList = jest
      .spyOn(userActionCreators, "getUserList")
      .mockImplementation(res => {
        return dispatch => {
          return new Promise((resolve, reject) => {
            resolve();
          });
        };
      });

    spyApplicationList = jest
      .spyOn(clubActionCreators, "getApplicationList")
      .mockImplementation(res => {
        return dispatch => {
          return new Promise((resolve, reject) => {
            resolve();
          });
        };
      });
  });

  it("should render Page", () => {
    const component = mount(applicantTab);
    const wrapper = component.find("ApplicantTab");
    expect(wrapper.length).toBe(1);
  });

  it("load all applicants", () => {
    let component = mount(applicantTab);
    let wrapper = component.find("Card");
    expect(wrapper.length).toEqual(1);
  });

  it("list item click handle", () => {
    let component = mount(applicantTab);
    let mainInstance = component.find("ApplicantTab").instance();
    let wrapper = component.find("#list-item-body");
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.detailShow).toBe(true);

    wrapper = component.find(".spyDetail");
    wrapper.simulate("click");
    expect(mainInstance.state.detailShow).toBe(false);
  });

  it("when info is not loaded", () => {
    let savedInfo = stubInitialState.users;
    stubInitialState.users = null;
    mockStore = getMockStore(stubInitialState);
    applicantTab = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <ApplicantTab />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(applicantTab);
    let wrapper = component.find("Card");
    expect(wrapper.length).toEqual(0);

    stubInitialState.users = savedInfo;
    mockStore = getMockStore(stubInitialState);
  });
});
