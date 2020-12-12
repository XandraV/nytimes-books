import React, { lazy, Suspense } from "react";
import { Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import CssBaseline from "@material-ui/core/CssBaseline";
import history from './history'
const Home = lazy(() => import("./Home"));
const Profile = lazy(() => import("./Profile"));

const App = () => {
  return (
    <Router history={history}>
      <CssBaseline />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/myprofile">
            <Profile />
          </PrivateRoute>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
