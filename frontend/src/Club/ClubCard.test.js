import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import ClubCard from "./ClubCard";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as clubActions from "../store/actions/club";

const stubInitialState = {
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

  clubs: [
    {
      id: 0,
      name: "SNUStone",
      content: "SNU Best HearthStone Club",
      clubmanager: "김지훈",
      selected_category: 0,
      auth_img: "1",
      isRegistered: true,
      available_major: [1],
      tags: [1, 2],
      likers: [],
      recruit_start_day: "2019-12-8",
      recruit_end_day: "2019-12-16",
      member: 50,
      hits: 1,
      poster_img: ["test.jpg"]
    },
    {
      id: 1,
      name: "SnuWOD",
      content: "SNU Best Training Club",
      clubmanager: "김동우",
      selected_category: 6,
      auth_img: "2",
      isRegistered: true,
      tags: [2, 3],
      available_major: [1],
      likers: [],
      recruit_start_day: "2019-12-8",
      recruit_end_day: "2019-12-16",
      member: 50,
      hits: 1,
      poster_img: null
    },

    {
      id: 2,
      name: "SnuLoL",
      content: "SNU Best LoL Club",
      clubmanager: "김도현",
      selected_category: 6,
      auth_img: "3",
      isRegistered: true,
      tags: [2, 3],
      available_major: [1],
      likers: [],
      recruit_start_day: "2019-12-8",
      recruit_end_day: "2019-12-16",
      member: 50,
      hits: 1,
      poster_img: []
    }
  ]
};

const mockStore = getMockStore(stubInitialState);

describe("<ClubCard />", () => {
  let clubCard;
  let spyClickHandler, spyAddClubHitCount;
  beforeEach(() => {
    clubCard = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <ClubCard
                    club={stubInitialState.clubs[0]}
                    clickHandler={spyClickHandler}
                  />
                );
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spyClickHandler = jest.fn();

    spyAddClubHitCount = jest
      .spyOn(clubActions, "addClubHitCount")
      .mockImplementation(() => {
        return dispatch => {};
      });
  });

  it("should render without errors", () => {
    const component = mount(clubCard);
    const wrapper = component.find(".Club-Card");
    expect(wrapper.length).toBe(1);

    const wrapper2 = component.find(".club-poster-img");
    expect(wrapper2.length).toBe(1);
  });

  it("should handle clicks", () => {
    const component = mount(clubCard);
    const wrapper = component.find(".Club-Card");
    wrapper.simulate("click");
    expect(spyClickHandler).toHaveBeenCalledTimes(1);
  });

  it("should render empty component", () => {
    clubCard = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return <ClubCard club={null} clickHandler={spyClickHandler} />;
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(clubCard);
    const wrapper = component.find(".Club-Card");
    expect(wrapper.length).toBe(0);
  });

  it("test branch - no image", () => {
    clubCard = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <ClubCard
                    club={stubInitialState.clubs[1]}
                    clickHandler={spyClickHandler}
                  />
                );
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(clubCard);
    const wrapper2 = component.find(".club-poster-img");
    expect(wrapper2.length).toBe(1);
  });

  it("test branch - no image(2)", () => {
    clubCard = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <ClubCard
                    club={stubInitialState.clubs[2]}
                    clickHandler={spyClickHandler}
                  />
                );
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(clubCard);
    const wrapper = component.find(".club-poster-img");
    expect(wrapper.length).toBe(1);
  });

  it("test branch - no tags", () => {
    stubInitialState.tags = [];
    clubCard = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <ClubCard
                    club={stubInitialState.clubs[0]}
                    clickHandler={spyClickHandler}
                  />
                );
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(clubCard);
    const wrapper = component.find("#secondary");
    expect(wrapper.length).toBe(0);
  });
});
