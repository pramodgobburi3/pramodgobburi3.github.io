import React from "react";
import { Container } from "reactstrap";

const AboutMe = React.forwardRef((props, ref) =>  (
  <div ref={ref} style={{marginBottom: 100}}>
    {/* <img alt="..." className="path" src={require("assets/img/path5.png")} /> */}
    <Container>
      <h2 className="title">About Me</h2>
      <h4>I am a Computer Science graduate from McNeese State University, software developer at Gophr App LLC. I am experienced and knowledgeable in technical problem solving, programming, and am always driven to learn new things.</h4>
    </Container>
  </div>
));


export default AboutMe;