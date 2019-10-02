import React, { Fragment } from "react";
import Navbar from "./Navbar";
import Landing from "./Landing";
import Container from "@material-ui/core/Container";
import { CssBaseline } from "@material-ui/core";
import { Router, Route, Switch } from "react-router-dom";

import Register from "./Register";
import Login from "./Login";
import Developers from "./Developers";
import history from "./history";
import { setAuthToken, setCurrentUser } from "./store/actions/auth";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

const App = () => {
  const dispatch = useDispatch();
  function authUser() {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      try {
        dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
      } catch (error) {
        dispatch(setCurrentUser({}));
      }
    }
  }

  authUser();

  return (
    <Router history={history}>
      <Fragment>
        <CssBaseline />
        <Navbar />
        <Route exact path='/' component={Landing} />
        <Container>
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/developers' component={Developers} />
          </Switch>
        </Container>
      </Fragment>
    </Router>
  );
};

export default App;
