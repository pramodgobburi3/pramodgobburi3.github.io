import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
} from "reactstrap";
import IndexNavbar from "components/Navbars/IndexNavbar.js";

import { 
  RenderIcon
} from '../components/Icons';
import ProjectsLinksButton from '../components/ProjectLinksButton';
import data from '../data.json';


const Projects = props => {
  const projects = data.projects;
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.classList.toggle("profile-page");
  }, []);

  const displayBackgroundIndex = num => {
    if (num < 10) {
      return '0' + num;
    }
    return '' + num;
  }

  return (
    <div>
      <div className="wrapper" style={{marginBottom: 150}}>
        {
          projects.map((project, index) => {
            if (index === 0) {
              return (
                <div className="page-header">
                  <img
                    alt="..."
                    className="dots"
                    src={require("assets/img/dots.png")}
                  />
                  <img
                    alt="..."
                    className="path"
                    src={require("assets/img/path4.png")}
                  />
                  <Container className="section">
                    <h2>My Projects</h2>
                    <Row>
                      <Col lg="5" md="5">
                        <h1 className="profile-title text-left">{project.name}</h1>
                        <h5 className="text-on-back">{displayBackgroundIndex(index + 1)}</h5>
                        <p className="profile-description text-left">
                          {project.description}
                        </p>
                        <div className="btn-wrapper profile pt-3">
                          {
                            project.stacks.map(stack => (
                              <RenderIcon name={stack} />
                            ))
                          }
                          {
                            project.links && project.links.length > 0 && (
                              <ProjectsLinksButton
                                style={{marginLeft: 10}}
                                links={project.links}
                              />
                            )
                          }
                        </div>
                      </Col>
                      <Col md="6">
                        <Row className="justify-content-between">
                          <img style={{width: '100%', height: 'auto', marginLeft: 30}} src={project.image} />
                        </Row>
                      </Col>
                    </Row>         
                  </Container>
                </div>
              );
            } else {
              if (index % 2 !== 0) {
                return (
                  <Container className="section">
                    <Row className="justify-content-between">
                      <Col md="6">
                        <Row className="justify-content-between">
                          <img style={{width: '100%', height: 'auto', marginLeft: 30}} src={project.image} />
                        </Row>
                      </Col>
                      <Col md="5">
                        <h1 className="profile-title text-left">{project.name}</h1>
                        <h5 className="text-on-back">{displayBackgroundIndex(index + 1)}</h5>
                        <p className="profile-description text-left">
                          {project.description}
                        </p>
                        <div className="btn-wrapper profile pt-3">
                          {
                            project.stacks.map(stack => (
                              <RenderIcon name={stack} />
                            ))
                          }
                          {
                            project.links && project.links.length > 0 && (
                              <ProjectsLinksButton
                                style={{marginLeft: 10}}
                                links={project.links}
                              />
                            )
                          }
                        </div>
                      </Col>
                    </Row>
                  </Container>
                )
              } else {
                return (
                  <Container className="section">
                    <Row className="justify-content-between">
                      <Col md="5">
                        <h1 className="profile-title text-left">{project.name}</h1>
                        <h5 className="text-on-back">{displayBackgroundIndex(index + 1)}</h5>
                        <p className="profile-description text-left">
                          {project.description}
                        </p>
                        <div className="btn-wrapper profile pt-3">
                          {
                            project.stacks.map(stack => (
                              <RenderIcon name={stack} />
                            ))
                          }
                          {
                            project.links && project.links.length > 0 && (
                              <ProjectsLinksButton
                                style={{marginLeft: 10}}
                                links={project.links}
                              />
                            )
                          }
                        </div>
                      </Col>
                      <Col md="6">
                        <Row className="justify-content-between">
                          <img style={{width: '100%', height: 'auto', marginLeft: 30}} src={project.image} />
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                )
              }
            }
          })
        }
      </div>
    </div>
  );
};

export default Projects;