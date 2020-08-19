import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.1.0";
import "assets/demo/demo.css";

import Index from "views/Index.js";
import Projects from "views/Projects.js";
import CLI from "views/cli.js";


ReactDOM.render(
  <BrowserRouter basename={'/'}>
    <Switch>
      <Route exact path="/" render={props => <Index {...props} />} />
      <Route exact
        path="/projects"
        render={props => <Projects {...props} />}
      />
      <Route exact
        path="/cli"
        render={props => <CLI {...props} />}
      />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
