import React from "react";
import { Container, CardBody, Card, UncontrolledTooltip } from "reactstrap";
import data from "../data.json";

const Skills = props => {
  var skills = data.skills;
  return (
    <Container>
      <h2 className="title" style={{textAlign :'left'}}>Languages / Skills</h2>
      <div className="section section-nucleo-icons" style={{paddingTop: 0}}>
          <Card style={{background: 'transparent', boxShadow: 'none', overflow: 'auto', overflowY: 'hidden'}}>
            <CardBody>
              <div>
                <div className="icons-container on-screen mt-5 mb-5">
                  {skills.map((skill, index) => {
                    if (index === 0) {
                      return (
                        <>
                          <i className={"icon tim-icons " + skill.icon} id={"icon"+index} style={{animation: 'float-up 8s infinite'}} />
                          <UncontrolledTooltip
                            delay={0}
                            placement="top"
                            target={"icon"+index}
                          >
                            {skill.name}<p/>
                            {skill.years + (skill.years > 1 ? " Years" : " Year")}
                          </UncontrolledTooltip>
                        </>
                      )
                    } else if (index > 0 && index <= 6 ) {
                      return (
                        <>
                          <i className={"icon tim-icons " + skill.icon} id={"icon"+index} style={{animation: `float-right ${Math.floor(Math.random() * 10) + 5}s infinite`}} />
                          <UncontrolledTooltip
                            delay={0}
                            placement="left"
                            target={"icon"+index}
                          >
                            {skill.name}<p/>
                            {skill.years + (skill.years > 1 ? " Years" : " Year")}
                          </UncontrolledTooltip>
                        </>
                      )
                    } else {
                      return (
                        <>
                          <i className={"icon tim-icons " + skill.icon} id={"icon"+index} style={{animation: `float-left ${Math.floor(Math.random() * 10) + 5}s infinite`}} />
                          <UncontrolledTooltip
                            delay={0}
                            placement="right"
                            target={"icon"+index}
                          >
                            {skill.name}<p/>
                            {skill.years + (skill.years > 1 ? " Years" : " Year")}
                          </UncontrolledTooltip>
                        </>
                      )
                    }
                  })}
                </div>
              </div>
            </CardBody>
          </Card>
      </div>
    </Container>
  );
  
}

export default Skills;
