/*import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import ClubRegister from "./ClubRegister";
import { getMockStore } from "../test-utils/mocks";
import { history } from "../store/store";
import * as preclubActionCreators from "../store/actions/preclub";

const stubInitialState = {
    categories: [
        { id: 0, name: "CATEGORY_1" },
        { id: 1, name: "CATEGORY_2" }
    ]
};

const mockStore = getMockStore(stubInitialState);

describe("<ClubTagSearch />", () => {
    let clubTagSearch;
    let spyPostClub, spyWindowAlert;

    let spyCloseHandler = () => { };

    beforeEach(() => {
        clubTagSearch = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={() => {
                                return (
                                    <ClubTagSearch />
                                );
                            }}
                        />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );

        spyWindowAlert = jest.spyOn(window, "alert").mockImplementation(path => { });

        spyPostClub = jest
            .spyOn(preclubActionCreators, "postPreClub")
            .mockImplementation(at => {
                return dispatch => { };
            });
    });

    it("should render Page", () => {
        const component = mount(clubTagSearch);

        const wrapper = component.find("Bootstrap(Modal)");
        expect(wrapper.length).toBe(1);
    });

});
*/