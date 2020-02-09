import React, { Component, Fragment } from "react";
import Home from "./components/Home";
import Form from "./components/Form";
import CustomNav from "./components/CustomNav";
import "./App.css";

import { Switch, Route, withRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Fragment>
        <div>
          <CustomNav />
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/form" render={() => <Form />} />
            <Route exact path="/CustomNav" render={() => <CustomNav />} />
          </Switch>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(App);
