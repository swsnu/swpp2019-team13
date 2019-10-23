import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

class SomoimCard extends React.Component {
  render() {
    let somoim = this.props.somoim;
    let percentage = (somoim.current / somoim.goal) * 100;
    let tagList = somoim.tag.map(item => (
      <Button key={item} variant="outline-primary">
        {"#" + this.props.tags[item].name}
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
              <Col xs="5">
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

const mapStateToProps = state => {
  return {
    tags: state.tag.tags
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SomoimCard));
