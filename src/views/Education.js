import React from "react";
import { Container, Card, CardHeader, CardBody } from "reactstrap";

const Education = ({ data }) => {

  const renderImage = () => {
    if (data.education.image) {
      return (
        <img
          alt="..."
          style={{width: 65, height: 50, marginTop: 20, marginBottom: 20}}
          src={require('../assets/img/' + data.education.image)}
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
          <CardHeader>
            {data.education.header}
          </CardHeader>
          <CardBody>
            <Container>
              {renderImage()}
              <h3 style={{marginBottom: 10}}>{data.education.university}</h3>
              <h4>{data.education.major}</h4>
              <h5>{data.education.minor}</h5>
              <p>{data.education.coursework}</p>
            </Container>
          </CardBody>
        </Card>
      </Container>
    </div>
  )
}

export default Education;