import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import ClubReducer from "./reducers/club";
import SomoimReducer from "./reducers/somoim";
import UserReducer from "./reducers/user";
import CategoryReducer from "./reducers/category";
import TagReducer from "./reducers/tag";
import DeptReducer from "./reducers/dept";
import MajorReducer from "./reducers/major";

export const history = createBrowserHistory();
const rootReducer = combineReducers({
  club: ClubReducer,
  somoim: SomoimReducer,
  user: UserReducer,
  category: CategoryReducer,
  tag: TagReducer,
  dept: DeptReducer,
  major: MajorReducer,
  router: connectRouter(history)
});

export const middlewares = [thunk, routerMiddleware(history)];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
