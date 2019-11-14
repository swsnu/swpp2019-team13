import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import ClubRegister from "./ClubRegister";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as clubActionCreators from "../store/actions/club";

const stubInitialState = {
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
      tags: [1],
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
  ],
  categories: [
    { id: 0, name: "CATEGORY_1" },
    { id: 1, name: "CATEGORY_2" }
  ]
};

const mockStore = getMockStore(stubInitialState);

describe("<ClubRegister />", () => {
  let clubRegister;
  let spyPostClub, spyWindowAlert, spyCreateObjectURL;

  let spyCloseHandler = () => {};

  beforeEach(() => {
    clubRegister = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                return (
                  <ClubRegister show={true} closeHandler={spyCloseHandler} />
                );
              }}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spyWindowAlert = jest.spyOn(window, "alert").mockImplementation(path => {});
    spyCreateObjectURL = jest
      .spyOn(window.URL, "createObjectURL")
      .mockImplementation(path => {
        return "mockFile";
      });

    spyPostClub = jest
      .spyOn(clubActionCreators, "postClub")
      .mockImplementation(at => {
        return dispatch => {};
      });
  });

  it("should render Page", () => {
    const component = mount(clubRegister);

    const wrapper = component.find("Bootstrap(Modal)");
    expect(wrapper.length).toBe(1);
  });

  it("should clear inputs when new props comes (modal reopen)", () => {
    const component = mount(clubRegister);

    const wrapper = component.find("#club-name-input").at(1);
    wrapper.simulate("change", { target: { value: "TEST_NAME" } });
    const ClubRegisterInstance = component
      .find(ClubRegister.WrappedComponent)
      .instance();

    ClubRegisterInstance.UNSAFE_componentWillReceiveProps();
    expect(ClubRegisterInstance.state.name).toEqual("");
  });

  it(`should set state properly on club name input`, () => {
    const name = "TEST_NAME";
    const component = mount(clubRegister);

    // Form.Control made two inputs with same id
    const wrapper = component.find("#club-name-input").at(1);
    wrapper.simulate("change", { target: { value: name } });
    const ClubRegisterInstance = component
      .find(ClubRegister.WrappedComponent)
      .instance();
    expect(ClubRegisterInstance.state.name).toEqual(name);
  });

  it(`should set state properly on category select input`, () => {
    const component = mount(clubRegister);

    // Form.Control made two inputs with same id
    const wrapper = component.find("#club-category-input").at(1);
    wrapper.simulate("change", { target: { value: 2 } });
    const ClubRegisterInstance = component
      .find(ClubRegister.WrappedComponent)
      .instance();
    expect(ClubRegisterInstance.state.selected_category).toEqual(2);
  });

  it(`should set state properly on proper file input`, () => {
    const component = mount(clubRegister);
    const filelist = [{ name: "TEST_FILE_1", type: "image/png", size: 1 }];

    const wrapper = component.find("#club-auth-file-input");
    wrapper.simulate("change", { target: { files: filelist } });
    const ClubRegisterInstance = component
      .find(ClubRegister.WrappedComponent)
      .instance();
    expect(ClubRegisterInstance.state.auth_img_file).toEqual(["mockFile"]);
  });

  it(`should alert err message when file is not image file`, () => {
    const component = mount(clubRegister);
    const filelist = [{ name: "TEST_FILE_1", type: "wrong_type", size: 1 }];

    const wrapper = component.find("#club-auth-file-input");
    wrapper.simulate("change", { target: { files: filelist } });
    expect(spyWindowAlert).toBeCalledWith(
      "wrong_type is not a supported format\n"
    );
  });

  it(`should alert err message when file is more than 3 files`, () => {
    const component = mount(clubRegister);
    const filelist = [
      { name: "1", type: "image/png", size: 1 },
      { name: "2", type: "image/png", size: 1 },
      { name: "3", type: "image/png", size: 1 },
      { name: "4", type: "image/png", size: 1 }
    ];

    const wrapper = component.find("#club-auth-file-input");
    wrapper.simulate("change", { target: { files: filelist } });
    expect(spyWindowAlert).toBeCalledWith(
      "Only 3 images can be uploaded at a time"
    );
    const ClubRegisterInstance = component
      .find(ClubRegister.WrappedComponent)
      .instance();
    expect(ClubRegisterInstance.state.auth_img_file).toEqual(null);
  });

  it(`should alert err message when file is over max size`, () => {
    const component = mount(clubRegister);
    const filelist = [
      { name: "TEST_FILE_1", type: "image/png", size: 3000000 }
    ];

    const wrapper = component.find("#club-auth-file-input");
    wrapper.simulate("change", { target: { files: filelist } });
    expect(spyWindowAlert).toBeCalledWith(
      "TEST_FILE_1 is too large, please pick a smaller file\n"
    );
  });

  it(`should set state properly on manager input`, () => {
    const manager = "TEST_MANAGER";
    const component = mount(clubRegister);

    // Form.Control made two inputs with same id
    const wrapper = component.find(".club-manager-input").at(1);
    wrapper.simulate("change", { target: { value: manager } });
    const ClubRegisterInstance = component
      .find(ClubRegister.WrappedComponent)
      .instance();
    expect(ClubRegisterInstance.state.clubmanager).toEqual(manager);
  });
});
