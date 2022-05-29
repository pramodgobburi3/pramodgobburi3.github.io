import React from "react";
import { Container } from "reactstrap";

const AboutMe = React.forwardRef(({ data }, ref) =>  (
  <div ref={ref} style={{marginBottom: 100}}>
    {/* <img alt="..." className="path" src={require("assets/img/path5.png")} /> */}
    <Container>
      <h2 className="title">About Me</h2>
      <h4>{data.about_me}</h4>
    </Container>
  </div>
));


export default AboutMe;