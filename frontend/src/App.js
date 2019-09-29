import React from "react";

import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import Main from "./containers/Main";
import Board from "./containers/Board";
import ArticleCreate from "./containers/ArticleCreate";
import MyPage from "./containers/MyPage";
import ClubCreate from "./containers/ClubCreate";

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/club/create" exact component={ClubCreate} />
          <Route path="/board" exact component={Board} />
          <Route path="/article/create" exact component={ArticleCreate} />
          <Route path="/mypage/:id" exact component={MyPage} />
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;
