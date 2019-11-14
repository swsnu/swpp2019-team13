import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import ClubCard from "./ClubCard";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
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
      likes: 10
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
      likes: 15
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
      likes: 20
    }
  ]
};

const mockStore = getMockStore(stubInitialState);

describe("<ClubCard />", () => {
  let clubCard;
  let spyClickHandler;
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
  });

  it("should render without errors", () => {
    const component = mount(clubCard);
    const wrapper = component.find("ClubCard");
    expect(wrapper.length).toBe(1);
  });

  it("should handle clicks", () => {
    const component = mount(clubCard);
    const wrapper = component.find("Card");
    wrapper.simulate("click");
    expect(spyClickHandler).toHaveBeenCalledTimes(1);
  });
});
