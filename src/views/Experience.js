import React, { useState } from "react";
import { Container, Card, CardHeader, Nav, NavItem, NavLink, CardBody, TabContent, TabPane } from "reactstrap";

const Experience = ({ data }) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const experiences = data.experience;

  return (
    <div>
      <Container>
        <h2 className="title">Work Experience</h2>
        <Card>
          <CardHeader style={{alignItems: 'center'}}>
            <Nav className="nav-tabs-info" role="tablist" tabs>
              {
                experiences.map((experience, index) => (
                  <NavItem>
                    <NavLink
                      onClick={e => setCurrentTabIndex(index)}
                      style={{cursor: 'pointer', border: currentTabIndex === index ? '1px solid #fff' : '0px'}}
                    >
                      {experience.name}
                    </NavLink>
                  </NavItem>
                ))
              }
            </Nav>
          </CardHeader>
          <CardBody>
            <TabContent
              className="tab-space"
              activeTab={"link" + currentTabIndex}
            >
              {
                experiences.map((experience, index) => (
                  <TabPane tabId={"link"+index}>
                    <Container>
                      <div style={{textAlign: 'center'}}>
                        <h6>{experience.header}</h6>
                        <img
                          alt="..."
                          style={{width: 'auto', height: 50, marginTop: 10, marginBottom: 10}}
                          src={require("assets/img/" + experience.image)}
                        />
                        <h3 style={{marginBottom: 10}}>{ experience.name }</h3>
                        <h4>{ experience.position }</h4>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', borderBottomColor: 'white', borderBottomWidth: 5}}>
                        <ul style={{maxWidth: 700}}>
                          {experience.roles.map((role, roleIdx) => {
                            if (roleIdx < experience.roles.length - 1) {
                              return (
                                <li style={{marginBottom: 3}}>{role}</li>
                              );
                            } else {
                              return (
                                <li>{role}</li>
                              );
                            }
                          })}
                        </ul>
                      </div>
                    </Container>
                  </TabPane>
                ))
              }
            </TabContent>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}

export default Experience;