import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { connectRouter } from "connected-react-router";

import { history, middlewares } from "../store/store";

const getMockClubReducer = jest.fn(
  initialState => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  }
);

const getMockSomoimReducer = jest.fn(
  initialState => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  }
);

const getMockUserReducer = jest.fn(
  initialState => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  }
);

const getMockCategoryReducer = jest.fn(
  initialState => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  }
);

const getMockTagReducer = jest.fn(
  initialState => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  }
);

const getMockDeptNameReducer = jest.fn(
  initialState => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  }
);

export const getMockStore = initialState => {
  const mockClubReducer = getMockClubReducer(initialState);
  const mockSomoimReducer = getMockSomoimReducer(initialState);
  const mockUserReducer = getMockUserReducer(initialState);
  const mockCategoryReducer = getMockCategoryReducer(initialState);
  const mockTagReducer = getMockTagReducer(initialState);
  const mockDeptNameReducer = getMockDeptNameReducer(initialState);
  const rootReducer = combineReducers({
    club: mockClubReducer,
    somoim: mockSomoimReducer,
    user: mockUserReducer,
    category: mockCategoryReducer,
    tag: mockTagReducer,
    deptname: mockDeptNameReducer,
    router: connectRouter(history)
  });
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  return mockStore;
};
