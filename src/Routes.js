import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useAuth } from "./context";
import LoginPage from "./pages/Login";
import FeedPage from "./pages/Feed";

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute path="/feed">
          <FeedPage />
        </PrivateRoute>
        <Route path="*">
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
