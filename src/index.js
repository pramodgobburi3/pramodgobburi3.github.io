import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.1.0";
import "assets/demo/demo.css";

import Index from "views/Index.js";
import Projects from "views/Projects.js";
import CLI from "views/cli.js";


ReactDOM.render(
  <HashRouter basename={''}>
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
  </HashRouter>,
  document.getElementById("root")
);
