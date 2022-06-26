import React, { Suspense, useContext, Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { PUBLIC_SIGNIN, PUBLIC_SIGNUP } from "../configs/router-config";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";
import { Offline, Online } from "react-detect-offline";
import LoadingPage from "./loading";
const Signin = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./public/sign/signin")), 1500);
  });
});
const Signup = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./public/sign/signup")), 1500);
  });
});
const Publiclayout = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("../layout/public")), 1500);
  });
});

export default function Views() {
  const { user } = useContext(AuthContext);
  return (
    <Fragment>
      <Suspense fallback={<LoadingPage />}>
        <Online>
          <Switch>
            <Route exact path={PUBLIC_SIGNIN}>
              {user ? <Redirect to="/" /> : <Signin />}
            </Route>
            <Route exact path={PUBLIC_SIGNUP}>
              {user ? <Redirect to="/" /> : <Signup />}
            </Route>
            <Route path="/">{user ? <Publiclayout /> : <Signin />}</Route>
          </Switch>
        </Online>
        <Offline>
          <LoadingPage />
        </Offline>
        <ToastContainer />
      </Suspense>
    </Fragment>
  );
}
