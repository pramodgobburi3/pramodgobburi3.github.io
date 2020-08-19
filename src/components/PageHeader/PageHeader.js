import React from "react";
import CursorImitator from '../CursorImitator';
import data from '../../data.json';

// reactstrap components
import { Container, Row, Col, Button } from "reactstrap";

const PageHeader = props => {
  const openLinkInNewTab = url => {
    window.open(url, "_blank");
  }
  return (
    <div className="page-header" style={{height: '65vh', minHeight: 0, maxHeight: '65vh'}}>
      <div className="squares square1" />
      <div className="squares square2" />
      <div className="squares square3" />
      <div className="squares square4" />
      <div className="squares square6" />
      <div className="squares square7" />
      <Container>
        <div className="content-center brand">
          
          <h1 className="h1-seo">
            <CursorImitator 
              content={[data.name]}
            />
          </h1>
          <div className="button-container">
            <h2>
              {data.description}
            </h2>
            <Row>
              <Col md="12">
                {
                  data.social_links.map((link, index) => (
                    <Button className="btn-simple" color={link.color} onClick={() => openLinkInNewTab(link.url)}><i className={link.icon} style={{marginRight: 5}}/>{link.name}</Button>
                  ))
                }
                <Button className="btn-simple btn-neutral" color="default">
                  PDF Resume
                </Button>
              </Col>
            </Row>
          </div>            
        </div>
      </Container>
    </div>
  );
}

export default PageHeader;
