import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
  Row,
  Col
} from "reactstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

class SomoimCard extends React.Component {
  render() {
    let percentage = (this.props.current / this.props.goal) * 100;
    let tagList = this.props.tag.map(item => (
      <Button key={item.id} outline>
        {"#" + item.name}
      </Button>
    ));

    return (
      <Card>
        <CardBody>
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
                  <h2>{this.props.title}</h2>
                </Row>
                <Row>{tagList}</Row>
                <Row>
                  <br />
                </Row>
                <Row>{this.props.content}</Row>
              </Col>
            </Row>
          </Container>
        </CardBody>
      </Card>
    );
  }
}

export default SomoimCard;
