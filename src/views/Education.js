import React, { useState } from "react";
import { Container, Card, CardHeader, CardBody, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

const Education = ({ data }) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const education = data.education;

  const renderImage = (college) => {
    if (college.image) {
      return (
        <img
          alt="..."
          style={{width: 'auto', height: 70, marginTop: 20, marginBottom: 20}}
          src={require('../assets/img/' + college.image)}
        />
      )
    }
    return null;
  }
  return (
    <div>
      <Container>
        <h2 className="title">Education</h2>
        <Card style={{textAlign: 'center', paddingTop: 10, paddingBottom: 10}}>
          <CardHeader style={{alignItems: 'center'}}>
            <Nav className="nav-tabs-info" role="tablist" tabs>
              {
                education.map((college, index) => (
                  <NavItem>
                    <NavLink
                      onClick={e => setCurrentTabIndex(index)}
                      style={{cursor: 'pointer', border: currentTabIndex === index ? '1px solid #fff' : '0px'}}
                    >
                      {college.abbreviation}
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
                education.map((college, index) => (
                  <TabPane tabId={"link"+index}>
                    <Container>
                      <div style={{textAlign: 'center'}}>
                        <h6>{college.header}</h6>
                        {renderImage(college)}
                        <h3 style={{marginBottom: 10}}>{college.university}</h3>
                        <h4>{college.major}</h4>
                        {
                          college.minor != null && (
                            <h5>{college.minor}</h5>
                          )
                        }
                        <p>{college.coursework}</p>
                      </div>
                    </Container>
                  </TabPane>
                ))}
            </TabContent>
          </CardBody>
        </Card>
      </Container>
    </div>
  )
}

export default Education;