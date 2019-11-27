import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import ApplicationDetail from "./ApplicationDetail";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";

const stubInitialState = {
  selectedApplication: {
    short_texts: [{ title: "short_title", order: 0 }],
    long_texts: [{ title: "long_title", order: 1 }],
    multi_choices: [
      {
        title: "multi_title",
        order: 2,
        choices: [
          { content: "a", id: 0, checked: true },
          { content: "b", id: 1, checked: false }
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
  }
};

const mockStore = getMockStore(stubInitialState);

describe("<ApplicationDetail />", () => {
  let applicationDetail;
  beforeEach(() => {
    applicationDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <ApplicationDetail
                    selectedApplication={stubInitialState.selectedApplication}
                    forceRender={Math.random()}
                    show={true}
                  />
                );
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it("render without errors", () => {
    const component = mount(applicationDetail);
    const wrapper = component.find("ApplicationDetail");
    expect(wrapper.length).toBe(1);
  });

  it("load all forms", () => {
    let component = mount(applicationDetail);
    let mainInstance = component.find("ApplicationDetail").instance();
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

  it("with user information", () => {
    applicationDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <ApplicationDetail
                    selectedApplication={stubInitialState.selectedApplication}
                    forceRender={Math.random()}
                    user={{
                      user: { last_name: "" },
                      dept: { name: "" },
                      major: { name: "" },
                      grade: 0
                    }}
                    show={true}
                  />
                );
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    let component = mount(applicationDetail);
    let wrapper = component.find("span");

    expect(wrapper.at(0).text()).toBe("");
  });

  it("with no selected application (invalid case)", () => {
    applicationDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <ApplicationDetail
                    selectedApplication={null}
                    forceRender={Math.random()}
                    user={{
                      user: { last_name: "" },
                      dept: { name: "" },
                      major: { name: "" },
                      grade: 0
                    }}
                    show={true}
                  />
                );
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    let component = mount(applicationDetail);
    let mainInstance = component.find("ApplicationDetail").instance();
    mainInstance.setState({
      ...mainInstance.state,
      forceUpdate: Math.random()
    });
    component.update();

    // expect(wrapper.at(0).text()).toBe("test-club 지원하기");
  });
});
