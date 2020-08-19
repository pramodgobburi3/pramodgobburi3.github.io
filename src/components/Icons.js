import React from "react";
import { Button, UncontrolledTooltip } from "reactstrap";


export const RenderIcon = ({ name }) => {
  switch (name) {
    case "react": 
      return <ReactIcon />
    case "react-native":
      return <ReactNativeIcon />
    case "javascript": 
      return <JSIcon />
    case "express": 
      return <ExpressJSIcon />
    case "django":
      return <DjangoIcon />
    case "python": 
      return <PythonIcon />
    case "html": 
      return <HTMLIcon />
    case "postgres":
      return <PostgresIcon />
    case "android":
      return <AndroidIcon />
    default: 
      return <JSIcon />
  }
}
export const ReactNativeIcon = props => {
  return (
    <>
      <Button
        className="btn-icon btn-round"
        color="white"
        id="react"
      >
        <i className="devicon-react-original colored" />
      </Button>
      <UncontrolledTooltip delay={0} target="react" placement="bottom">
        React Native
      </UncontrolledTooltip>
    </>
  );
};

export const ReactIcon = props => {
  return (
    <>
      <Button
        className="btn-icon btn-round"
        color="white"
        id="react"
      >
        <i className="devicon-react-original colored" />
      </Button>
      <UncontrolledTooltip delay={0} target="react" placement="bottom">
        React
      </UncontrolledTooltip>
    </>
  );
};

export const JSIcon = props => {
  return (
    <>
      <Button
        className="btn-icon btn-round"
        color="white"
        id="js"
      >
        <i className="devicon-javascript-plain colored" />
      </Button>
      <UncontrolledTooltip delay={0} target="js" placement="bottom">
        Javascript
      </UncontrolledTooltip>
    </>
  );
};

export const ExpressJSIcon = props => {
  return (
    <>
      <Button
        className="btn-icon btn-round"
        color="white"
        id="express"
      >
        <i className="devicon-express-original" />
      </Button>
      <UncontrolledTooltip delay={0} target="express" placement="bottom">
        ExpressJS
      </UncontrolledTooltip>
    </>
  );
};

export const DjangoIcon = props => {
  return (
    <>
      <Button
        className="btn-icon btn-round"
        color="white"
        id="django"
      >
        <i className="devicon-django-line" />
      </Button>
      <UncontrolledTooltip delay={0} target="django" placement="bottom">
        Django
      </UncontrolledTooltip>
    </>
  );
};

export const PythonIcon = props => {
  return (
    <>
      <Button
        className="btn-icon btn-round"
        color="white"
        id="python"
      >
        <i className="devicon-python-plain colored" />
      </Button>
      <UncontrolledTooltip delay={0} target="python" placement="bottom">
        Python
      </UncontrolledTooltip>
    </>
  );
};

export const HTMLIcon = props => {
  return (
    <>
      <Button
        className="btn-icon btn-round"
        color="white"
        id="html5"
      >
        <i className="devicon-html5-plain-wordmark colored" />
      </Button>
      <UncontrolledTooltip delay={0} target="html5" placement="bottom">
        HTML5
      </UncontrolledTooltip>
    </>
  );
};

export const PostgresIcon = props => {
  return (
    <>
      <Button
        className="btn-icon btn-round"
        color="white"
        id="postgres"
      >
        <i className="devicon-postgresql-plain" />
      </Button>
      <UncontrolledTooltip delay={0} target="postgres" placement="bottom">
        PostgreSQL
      </UncontrolledTooltip>
    </>
  );
};

export const AndroidIcon = props => {
  return (
    <>
      <Button
        className="btn-icon btn-round"
        color="white"
        id="android"
      >
        <i className="devicon-android-plain colored" />
      </Button>
      <UncontrolledTooltip delay={0} target="android" placement="bottom">
        Android
      </UncontrolledTooltip>
    </>
  );
};