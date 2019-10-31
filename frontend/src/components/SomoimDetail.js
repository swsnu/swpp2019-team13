import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

class SomoimDetail extends React.Component {
  render() {
    let somoim = this.props.somoim;
    if (somoim) {
      let percentage = (somoim.currentJoiner / somoim.goalJoiner) * 100;
      let tagList = somoim.tag.map(item => (
        <Button key={item} variant="outline-primary">
          {"#" + this.props.tags[item].name}
        </Button>
      ));
      return (
        <Modal
          show={this.props.show}
          onHide={this.props.closeHandler}
          style={{ opacity: 1 }}
        >
          <Modal.Body>
            <Container>
              <Row>
                <Col>
                  <CircularProgressbar
                    value={percentage}
                    text={percentage + "%"}
                  />
                </Col>
                <Col>
                  <Row>
                    <h2>{somoim.title}</h2>
                    <Col md={{ offset: 1 }}>
                      <h4>
                        <span role="img" aria-label="thumb">
                          👍
                        </span>
                        {somoim.likes}
                      </h4>
                    </Col>
                  </Row>
                  <Row>{tagList}</Row>
                  <br />
                  <Row>{somoim.description}</Row>
                </Col>
              </Row>
              <br />
              <br />
              <Row>
                <Col></Col>
                <Col>
                  <Button size="lg">
                    <span role="img" aria-label="thumb">
                      👍
                    </span>{" "}
                    Like!
                  </Button>
                </Col>
                <Col></Col>
                <Col>
                  <Button size="lg">Join!</Button>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      );
    } else return <></>;
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
)(withRouter(SomoimDetail));
