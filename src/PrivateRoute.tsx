import React, { FC } from "react";
import { Route, Redirect } from "react-router-dom";

type PrivateRouteProps = {
  path: string;
};

const PrivateRoute: FC<PrivateRouteProps> = ({ path, children }) => {
  const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const accessToken = user.accessToken;
  return accessToken ? (
    <Route path={path} exact>
      {children}
    </Route>
  ) : (
    <Redirect to="/" />
  );
};
export default PrivateRoute;
