import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import SomoimMain from "./SomoimMain";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as somoimActionCreators from "../store/actions/somoim";

let stubInitialState = {
  somoims: [
    {
      id: 0,
      title: "TEST_SOMOIM_1",
      summary: "TEST_SUMMARY_1",
      description: "TEST_DESCRIPTION_1",
      selected_dept: [0],
      available_sem: 1,
      tag: [0],
      goalJoiner: 10,
      currentJoiner: 7,
      likes: 10
    },
    {
      id: 1,
      title: "TEST_SOMOIM_2",
      summary: "TEST_SUMMARY_2",
      description: "TEST_DESCRIPTION_2",
      selected_dept: [0, 1],
      available_sem: 3,
      tag: [1],
      goalJoiner: 1,
      currentJoiner: 0,
      likes: 0
    }
  ],
  categories: [
    {
      id: 0,
      name: "학술매체"
    },
    {
      id: 1,
      name: "취미교양"
    },
    {
      id: 2,
      name: "연행예술"
    },
    {
      id: 3,
      name: "인권봉사"
    },
    {
      id: 4,
      name: "무예운동"
    },
    {
      id: 5,
      name: "종교"
    },
    {
      id: 6,
      name: "운동부"
    }
  ],
  tags: [
    { id: 0, name: "friendship" },
    { id: 1, name: "love" },
    { id: 2, name: "sport" },
    { id: 3, name: "game" },
    { id: 4, name: "study" },
    { id: 5, name: "music" },
    { id: 6, name: "art" },
    { id: 7, name: "nothing" }
  ],
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
    },
    {
      id: 3,
      name: "사회과학대학"
    },
    {
      id: 4,
      name: "경영대학"
    },
    {
      id: 5,
      name: "농업생명과학대학"
    },
    {
      id: 6,
      name: "사범대학"
    },
    {
      id: 7,
      name: "생활과학대학"
    },
    {
      id: 8,
      name: "의과대학"
    },
    {
      id: 9,
      name: "수의과대학"
    },
    {
      id: 10,
      name: "약학대학"
    },
    {
      id: 11,
      name: "간호대학"
    },
    {
      id: 12,
      name: "음학대학"
    },
    {
      id: 13,
      name: "미술대학"
    },
    {
      id: 14,
      name: "자유전공학부"
    }
  ]
};

let mockStore = getMockStore(stubInitialState);

describe("<SomoimMain />", () => {
  let somoimMain;

  beforeEach(() => {
    somoimMain = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <SomoimMain />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it("should render Page", () => {
    const component = mount(somoimMain);
    const wrapper = component.find("SomoimMain");
    expect(wrapper.length).toBe(1);
  });

  it("somoim card click event handling", () => {
    const component = mount(somoimMain);
    const mainInstance = component.find("SomoimMain").instance();
    const wrapper = component.find("SomoimCard");
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.somoimDetailShow).toBe(true);
  });

  it("somoim card click event handling", () => {
    const component = mount(somoimMain);
    const mainInstance = component.find("SomoimMain").instance();
    let wrapper = component.find("SomoimCard");
    wrapper.at(0).simulate("click");
    wrapper = component.find("Header");
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.somoimDetailShow).toBe(true);

    wrapper = component.find("CloseButton");
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.somoimDetailShow).toBe(false);
  });

  it("somoim create button click event handling", () => {
    const component = mount(somoimMain);
    const mainInstance = component.find("SomoimMain").instance();
    let wrapper = component.find(".somoim-create-button");
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.somoimCreateShow).toBe(true);

    wrapper = component.find("CloseButton");
    wrapper.at(0).simulate("click");
    expect(mainInstance.state.somoimCreateShow).toBe(false);
  });

  it("when somoim list info does not loaded yet", () => {
    stubInitialState.somoims = null;
    mockStore = getMockStore(stubInitialState);
    somoimMain = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <SomoimMain />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    const component = mount(somoimMain);
    const wrapper = component.find("SomoimCard");
    expect(wrapper.length).toBe(0);
  });

  it("when category list info does not loaded yet", () => {
    stubInitialState.categories = null;
    mockStore = getMockStore(stubInitialState);
    somoimMain = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <SomoimMain />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    const component = mount(somoimMain);
    const wrapper = component.find("category-button");
    expect(wrapper.length).toBe(0);
  });
});
