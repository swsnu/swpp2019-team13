import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

class SomoimCard extends React.Component {
  render() {
    let somoim = this.props.somoim;
    let percentage = (somoim.current / somoim.goal) * 100;
    let tagList = somoim.tag.map(item => (
      <Button key={item.id} variant="outline-primary">
        {"#" + item.name}
      </Button>
    ));

    return (
      <Card
        onClick={() => {
          this.props.clickHandler(somoim.id);
        }}
      >
        <Card.Body>
          <Container>
            <Row>
              <Col sm="5">
                <CircularProgressbar
                  value={percentage}
                  text={percentage + "%"}
                />
              </Col>
              <Col>
                <Row>
                  <h2>{somoim.title}</h2>
                  <Col md={{ offset: 1 }}>
                    <h4>{"👍 " + somoim.likes}</h4>
                  </Col>
                </Row>
                <Row>{tagList}</Row>
                <br />
                <Row>{somoim.content}</Row>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    );
  }
}

export default SomoimCard;
