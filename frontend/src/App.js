import React from "react";

import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import SignUp from "./Header/SignUp";
import ClubMain from "./Club/ClubMain";
import SomoimMain from "./Somoim/SomoimMain";
import MyPage from "./MyPage/MyPage";
import ClubManageMain from "./ClubManage/ClubManageMain";
import ApplyMain from "./Apply/ApplyMain";

import "./App.css";

function App(props) {
  return (
    <div className="App">
      <ConnectedRouter history={props.history}>
        <Switch>
          <Route path="/signup" exact component={SignUp} />
          <Route
            path="/club/manage/:club_id"
            exact
            component={ClubManageMain}
          />
          <Route path="/club" exact component={ClubMain} />
          <Route path="/somoim" exact component={SomoimMain} />
          <Route path="/mypage" exact component={MyPage} />
          <Route path="/apply/:club_id" exact component={ApplyMain} />
          <Redirect exact from="/" to="/club" />
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </ConnectedRouter>
    </div>
  );
}

export default App;
