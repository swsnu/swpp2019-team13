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

// jest.mock("../components/ClubDetail", () => {
//   return jest.fn(props => {
//     return <div id="spyClubDetail" onClick={props.closeHandler}></div>;
//   });
// });

let stubInitialState = {
  applicationForm: {
    short_texts: [{ title: "short_title", order: 0 }],
    long_texts: [{ title: "long_title", order: 1 }],
    multi_choices: [{ title: "long_title", order: 2, choices: [] }],
    images: [{ title: "image_title", order: 3 }],
    files: [{ title: "file_title", order: 4 }]
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
    expect(wrapper.length).toBe(1);

    mainInstance.setState({ ...component.state, forceRender: Math.random() });
  });

  //   it("list item click handle", () => {
  //     let component = mount(applicationFormTab);
  //     let mainInstance = component.find("ApplicationFormTab").instance();
  //     let wrapper = component.find("h1");
  //     wrapper.at(0).simulate("click");
  //     wrapper = component.find("#list-item-body");
  //     wrapper.at(1).simulate("click");
  //     expect(mainInstance.state.clubDetailShow).toBe(true);

  //     wrapper = component.find("#spyClubDetail");
  //     wrapper.simulate("click");
  //     expect(mainInstance.state.clubDetailShow).toBe(false);
  //   });

  //   it("unlike button click handle", () => {
  //     let component = mount(applicationFormTab);
  //     let mainInstance = component.find("ApplicationFormTab").instance();
  //     let wrapper = component.find("#club-unlike-button");
  //     wrapper.at(1).simulate("click");
  //     expect(spyAddLikedClub).toBeCalledTimes(1);
  //   });

  //   it("when likedClubs info is not loaded", () => {
  //     let savedInfo = stubInitialState.likedClubs;
  //     stubInitialState.likedClubs = null;
  //     mockStore = getMockStore(stubInitialState);
  //     applicationFormTab = (
  //       <Provider store={mockStore}>
  //         <ConnectedRouter history={history}>
  //           <Switch>
  //             <Route
  //               path="/"
  //               exact
  //               render={() => {
  //                 return <ApplicationFormTab />;
  //               }}
  //             />
  //           </Switch>
  //         </ConnectedRouter>
  //       </Provider>
  //     );
  //     const component = mount(applicationFormTab);

  //     stubInitialState.likedClubs = savedInfo;
  //     mockStore = getMockStore(stubInitialState);
  //   });
});
