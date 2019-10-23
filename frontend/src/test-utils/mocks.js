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

export const getMockStore = initialState => {
  const mockClubReducer = getMockClubReducer(initialState);
  const mockSomoimReducer = getMockSomoimReducer(initialState);
  const mockUserReducer = getMockUserReducer(initialState);
  const rootReducer = combineReducers({
    cl: mockClubReducer,
    sm: mockSomoimReducer,
    us: mockUserReducer,
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
