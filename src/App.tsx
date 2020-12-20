import React, { lazy, Suspense } from "react";
import { Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import history from "./history";
import ThemeProvider from "./ThemeProvider";
const Home = lazy(() => import("./Home"));
const Profile = lazy(() => import("./Profile"));

const App = () => {
  return (
    <ThemeProvider>
      <Router history={history}>
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
    </ThemeProvider>
  );
};

export default App;
