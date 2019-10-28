import React from "react";

import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import ClubMain from "./containers/ClubMain";
import SomoimMain from "./containers/SomoimMain";

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App">
        <Switch>
          <Route path="/club" exact component={ClubMain} />
          <Route path="/somoim" exact component={SomoimMain} />
          <Redirect exact from="/" to="/club" />
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;
