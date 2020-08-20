import React, { useState, useEffect } from "react";
import CursorImitator from '../CursorImitator';
import data from '../../data.json';

// reactstrap components
import { Container, Row, Col, Button } from "reactstrap";

const PageHeader = props => {
  const [frameWidth, setFrameWidth] = useState(window.innerWidth);

  useEffect(() => {
    setFrameWidth(window.innerWidth);
  }, [window.innerWidth]);
  const openLinkInNewTab = url => {
    window.open(url, "_blank");
  }
  return (
    <div className="page-header" style={{height: '65vh', minHeight: 0, maxHeight: '65vh'}}>
      {frameWidth >= 796 && (
        <>
          <div className="squares square1" />
          <div className="squares square2" />
          <div className="squares square3" />
          <div className="squares square4" />
          <div className="squares square6" />
          <div className="squares square7" />
        </>
      )}
      
      <Container>
        <div className="content-center brand" style={{marginTop: 65, marginBottom: 10}}>
          
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
                <Button className="btn-simple btn-neutral" color="default" onClick={() => openLinkInNewTab('https://drive.google.com/file/d/1kRRT3Eu0iQ2K5VX2BQxV-s8-36Kx_31V/view?usp=sharing')}>
                  Resume
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
