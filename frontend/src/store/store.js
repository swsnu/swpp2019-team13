import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import ClubReducer from "./reducers/club";
import SomoimReducer from "./reducers/somoim";
import UserReducer from "./reducers/user";
import CategoryReducer from "./reducers/category";

export const history = createBrowserHistory();
const rootReducer = combineReducers({
  cl: ClubReducer,
  somoim: SomoimReducer,
  us: UserReducer,
  category: CategoryReducer,
  router: connectRouter(history)
});

export const middlewares = [thunk, routerMiddleware(history)];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
