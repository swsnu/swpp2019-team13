import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch, Redirect } from "react-router-dom";

import Header from "./Header";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as actionCreators from "../store/actions/user";

const stubInitialState = {
  loggedUser: null
};

const mockStore = getMockStore(stubInitialState);

jest.mock("../containers/Login", () => {
  return jest.fn(props => {
    return (
      <div className="spyLogin">
        <div id="showModal">{props.show ? "로그인" : ""}</div>
        <button id="closeModal" onClick={props.onHide}></button>
      </div>
    );
  });
});

describe("<Header />", () => {
  let header;
  let spyGetLoginInfo;

  beforeEach(() => {
    header = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <Header />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spyGetLoginInfo = jest
      .spyOn(actionCreators, "getLoginInfo")
      .mockImplementation(() => {
        return dispatch => {};
      });
  });

  it("should render Header", () => {
    const component = mount(header);
    const wrapper = component.find(".Header");
    expect(wrapper.length).toBe(1);
    expect(spyGetLoginInfo).toBeCalledTimes(1);
  });

  it("should render Logo", () => {
    const component = mount(header);
    const wrapper = component.find(".home");
    expect(wrapper.length).toBe(1);
    expect(wrapper.at(0).text()).toBe("Club4u");
  });

  it("should go to home(/club) page when click logo", () => {
    const spyHistoryPush = jest
      .spyOn(history, "push")
      .mockImplementation(path => {});
    const component = mount(header);
    const wrapper = component.find(".home");
    wrapper.simulate("click");
    expect(spyHistoryPush).toHaveBeenCalledWith("/club");
  });

  it("should render navigation", () => {
    const component = mount(header);
    const wrapper = component.find(".menu-item");
    expect(wrapper.length).toBe(2);
    expect(wrapper.at(0).text()).toBe("동아리");
    expect(wrapper.at(1).text()).toBe("소모임");
  });

  it("should go to /club page when click club navigation", () => {
    const spyHistoryPush = jest
      .spyOn(history, "push")
      .mockImplementation(path => {});
    const component = mount(header);

    const wrapper = component.find(".menu-item").at(0);
    wrapper.simulate("click");
    expect(spyHistoryPush).toHaveBeenCalledWith("/club");
  });

  it("should go to /somoim page when click somoim navigation", () => {
    const spyHistoryPush = jest
      .spyOn(history, "push")
      .mockImplementation(path => {});
    const component = mount(header);
    const wrapper = component.find(".menu-item").at(1);
    wrapper.simulate("click");
    expect(spyHistoryPush).toHaveBeenCalledWith("/somoim");
  });

  it("should render user-item when not logged in", () => {
    const component = mount(header);
    const wrapper = component.find(".user-item");
    expect(wrapper.length).toBe(2);
    expect(wrapper.at(0).text()).toBe("로그인");
    expect(wrapper.at(1).text()).toBe("회원가입");
  });

  it("don't show login modal until click login button", () => {
    const component = mount(header);
    const wrapper = component.find("#showModal");
    expect(wrapper.text()).toBe("");
  });

  it("show login modal when click login button, and close when click close button", () => {
    const component = mount(header);
    const wrapper = component.find(".user-item").at(0);
    wrapper.simulate("click");
    const wrapper2 = component.find("#showModal");
    expect(wrapper2.text()).toBe("로그인");
    const wrapper3 = component.find("#closeModal");
    wrapper3.simulate("click");
    expect(wrapper2.text()).toBe("");
  });

  it("should go to /signup page when click signup button", () => {
    const spyHistoryPush = jest
      .spyOn(history, "push")
      .mockImplementation(path => {});
    const component = mount(header);
    const wrapper = component.find(".user-item").at(1);
    wrapper.simulate("click");
    expect(spyHistoryPush).toHaveBeenCalledWith("/signup");
  });

  it("should render user-item when logged in", () => {
    const mockInitialStore = getMockStore({
      loggedUser: ""
    });
    const component = mount(
      <Provider store={mockInitialStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <Header />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    const wrapper = component.find(".user-item");
    expect(wrapper.length).toBe(2);
    expect(wrapper.at(0).text()).toBe("마이페이지");
    expect(wrapper.at(1).text()).toBe("로그아웃");
  });

  it("should go to /mypage when click mypage button", () => {
    const mockInitialStore = getMockStore({
      loggedUser: ""
    });
    const component = mount(
      <Provider store={mockInitialStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <Header />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    const spyHistoryPush = jest
      .spyOn(history, "push")
      .mockImplementation(path => {});

    const wrapper = component.find(".user-item").at(0);
    wrapper.simulate("click");
    expect(spyHistoryPush).toHaveBeenCalledWith("/mypage");
  });

  it("should log out and go to home(/club) page when click log out button", () => {
    const mockInitialStore = getMockStore({
      loggedUser: ""
    });
    const component = mount(
      <Provider store={mockInitialStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <Header />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    const spySignOut = jest
      .spyOn(actionCreators, "signOut")
      .mockImplementation(() => {
        return dispatch => {};
      });

    const spyHistoryPush = jest
      .spyOn(history, "push")
      .mockImplementation(path => {});

    const wrapper = component.find(".user-item").at(1);
    wrapper.simulate("click");
    expect(spySignOut).toBeCalledTimes(1);
    expect(spyHistoryPush).toHaveBeenCalledWith("/club");
  });

  it("in according to pathname, active class is given", () => {
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Redirect exact from="/" to="/club" />
            <Route path="/club" exact render={() => <Header />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    const wrapper = component.find(".active");
    expect(wrapper.length).toBe(1);
    expect(wrapper.text()).toBe("동아리");

    const component2 = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Redirect exact from="/" to="/somoim" />
            <Redirect exact from="/club" to="/somoim" />
            <Route path="/somoim" exact render={() => <Header />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    const wrapper2 = component2.find(".active");
    expect(wrapper2.length).toBe(1);
    expect(wrapper2.text()).toBe("소모임");
  });
});
