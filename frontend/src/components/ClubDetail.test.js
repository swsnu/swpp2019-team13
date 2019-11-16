import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import ClubDetail from "./ClubDetail";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as userActions from "../store/actions/user";
import * as clubActions from "../store/actions/club";
import * as somoimActions from "../store/actions/somoim";
import * as categoryActions from "../store/actions/category";
import * as tagActions from "../store/actions/tag";
import * as deptActions from "../store/actions/dept";
import * as majorActions from "../store/actions/major";

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
    majors: [
        { id: 0, name: "cs" },
        { id: 1, name: "economy" },
        { id: 2, name: "music" }
    ],

    clubs: [
        {
            id: 0,
            name: "SNUStone",
            content: "SNU Best HearthStone Club",
            clubmanager: "김지훈",
            selected_category: 0,
            auth_img: "1",
            poster_img: "1",
            isRegistered: true,
            available_major: [1],
            tags: [1],
            likers: [],
            likes: 10,
            available_semester: 2,
            session_day: 1
        },
        {
            id: 1,
            name: "SnuWOD",
            content: "SNU Best Training Club",
            clubmanager: "김동우",
            selected_category: 6,
            auth_img: "2",
            poster_img: ["1", "2"],
            isRegistered: true,
            tags: [2, 3],
            available_major: [1, 2, 3],
            likers: [{ id: 0 }],
            likes: 15,
            available_semester: 2,
            session_day: 0
        },

        {
            id: 2,
            name: "SnuLoL",
            content: "SNU Best LoL Club",
            clubmanager: "김도현",
            selected_category: 6,
            auth_img: "3",
            poster_img: "1",
            isRegistered: true,
            tags: [2, 3],
            available_major: [1],
            likers: [],
            available_semester: 3,
            likes: 20,
            session_day: 1
        }
    ],
    loggedUser: {
        id: 0,
        name: "test",
        email: "test@test.com",
        password: "test",
        dept: 0,
        major: 1,
        grade: 3,
        available_semester: 2,
        available_session_day: 0
    },
    users: [{
        id: 0,
        name: "test",
        email: "test@test.com",
        password: "test",
        dept: 0,
        major: 1,
        grade: 3,
        available_semester: 2,
        available_session_day: 0
    }]
};

const stubInitialState2 = {
    tags: [
    ],
    majors: [
        { id: 0, name: "cs" },
        { id: 1, name: "economy" },
        { id: 2, name: "music" }
    ],

    clubs: [
        {
            id: 0,
            name: "SNUStone",
            content: "SNU Best HearthStone Club",
            clubmanager: "김지훈",
            selected_category: 0,
            auth_img: "1",
            poster_img: "1",
            isRegistered: true,
            available_major: [1],
            tags: [1],
            likers: [],
            likes: 10,
            available_semester: 2,
            session_day: 1
        },
        {
            id: 1,
            name: "SnuWOD",
            content: "SNU Best Training Club",
            clubmanager: "김동우",
            selected_category: 6,
            auth_img: "2",
            poster_img: ["1", "2"],
            isRegistered: true,
            tags: [2, 3],
            available_major: [1, 2, 3],
            likers: [{ id: 0 }],
            likes: 15,
            available_semester: 2,
            session_day: 0
        },

        {
            id: 2,
            name: "SnuLoL",
            content: "SNU Best LoL Club",
            clubmanager: "김도현",
            selected_category: 6,
            auth_img: "3",
            poster_img: "1",
            isRegistered: true,
            tags: [2, 3],
            available_major: [1],
            likers: [],
            available_semester: 3,
            likes: 20,
            session_day: 1
        }
    ],
    loggedUser: null,
    users: [{
        id: 0,
        name: "test",
        email: "test@test.com",
        password: "test",
        dept: 0,
        major: 1,
        grade: 3,
        available_semester: 2,
        available_session_day: 0
    }]
};
const mockStore = getMockStore(stubInitialState);
const mockStore2 = getMockStore(stubInitialState2);

describe("<ClubDetail />", () => {
    let clubDetail, clubDetail2, clubDetail3, clubDetail4;
    let spyCloseHandler, spyaddLikedClub, spyaddAppliedClub;

    beforeEach(() => {
        let spyCloseHandler = jest.fn();

        spyaddLikedClub = jest
            .spyOn(userActions, "addLikedClub")
            .mockImplementation(() => {
                return dispatch => { };
            });

        spyaddAppliedClub = jest
            .spyOn(userActions, "addAppliedClub")
            .mockImplementation(() => {
                return dispatch => { };
            });

        clubDetail = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={() => {
                                return (
                                    <ClubDetail
                                        show={true}
                                        club={stubInitialState.clubs[0]}
                                        closeHandler={spyCloseHandler}
                                    />
                                );
                            }}
                        />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        clubDetail2 = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={() => {
                                return (
                                    <ClubDetail
                                        show={true}
                                        club={stubInitialState.clubs[1]}
                                        closeHandler={spyCloseHandler}
                                    />
                                );
                            }}
                        />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        clubDetail3 = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={() => {
                                return (
                                    <ClubDetail
                                        show={true}
                                        club={stubInitialState.clubs[2]}
                                        closeHandler={spyCloseHandler}
                                    />
                                );
                            }}
                        />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        clubDetail4 = (
            <Provider store={mockStore2}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={() => {
                                return (
                                    <ClubDetail
                                        show={true}
                                        club={stubInitialState.clubs[0]}
                                        closeHandler={spyCloseHandler}
                                    />
                                );
                            }}
                        />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    });

    it("should render modal", () => {
        const component = mount(clubDetail);

        const wrapper = component.find("Bootstrap(Modal)");
        expect(wrapper.length).toBe(1);
    });
    it("should render modal2", () => {
        const component = mount(clubDetail2);

        const wrapper = component.find("Bootstrap(Modal)");
        expect(wrapper.length).toBe(1);
    });
    it("should render modal3", () => {
        const component = mount(clubDetail3);

        const wrapper = component.find("Bootstrap(Modal)");
        expect(wrapper.length).toBe(1);
    });
    it("should render modal4", () => {
        const component = mount(clubDetail4);

        const wrapper = component.find("Bootstrap(Modal)");
        expect(wrapper.length).toBe(1);
    });

    it("should not render modal when club info is invalid", () => {
        const component = mount(
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={() => {
                                return (
                                    <ClubDetail show={true} closeHandler={spyCloseHandler} />
                                );
                            }}
                        />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );

        const wrapper = component.find("Bootstrap(Modal)");
        expect(wrapper.length).toBe(0);
    });

    it("should click like", () => {
        const component = mount(clubDetail);
        const wrapper = component.find(".likebutton2").at(0);
        wrapper.simulate("click");
        expect(wrapper.length).toBe(1);
    });

    it("should click unlike", () => {
        const component = mount(clubDetail2);
        const wrapper = component.find(".likebutton").at(0);
        wrapper.simulate("click");
        expect(wrapper.length).toBe(1);
    });
    it("should click next & prev", () => {
        const component = mount(clubDetail2);
        const wrapper = component.find(".next").at(0);
        wrapper.simulate("click");
        expect(wrapper.length).toBe(1);
        const wrapper2 = component.find(".prev").at(0);
        wrapper2.simulate("click");
        expect(wrapper2.length).toBe(1);
    });
    it("should click apply", () => {
        const component = mount(clubDetail2);
        const wrapper = component.find(".applybutton").at(0);
        wrapper.simulate("click");
        expect(wrapper.length).toBe(1);
    });
});
