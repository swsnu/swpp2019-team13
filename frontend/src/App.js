import React from "react";

import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import SignUp from "./containers/SignUp";
import ClubMain from "./containers/ClubMain";
import SomoimMain from "./containers/SomoimMain";
import MyPage from "./MyPage/MyPage";

import "./App.css";

function App(props) {
  return (
    <div className="App">
      <ConnectedRouter history={props.history}>
        <Switch>
          <Route path="/signup" exact component={SignUp} />
          <Route path="/club" exact component={ClubMain} />
          <Route path="/somoim" exact component={SomoimMain} />
          <Route path="/mypage" exact component={MyPage} />
          <Redirect exact from="/" to="/club" />
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </ConnectedRouter>
    </div>
  );
}

export default App;
