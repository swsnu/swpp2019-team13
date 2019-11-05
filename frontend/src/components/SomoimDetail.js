import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
class SomoimDetail extends React.Component {
  state = {
    tagnameList: null
  };
  componentDidMount() {
    axios.get("/api/tag/list/").then(
      response => {
        console.log(response.data);
        this.setState({
          ...this.state,
          tagnameList: response.data
        });
      },
      error => {
        console.log(error);
      }
    );
  }
  render() {
    let somoim = this.props.somoim;
    if (somoim) {
      let tagList;
      if (this.state.tagnameList) {
        tagList = somoim.fields.tags.map(item => (
          <Button key={item} variant="outline-primary">
            {"#" + this.state.tagnameList[item - 1].name}
          </Button>
        ));
      }
      let percentage =
        (somoim.fields.currentJoiner / somoim.fields.goalJoiner) * 100;

      return (
        <Modal
          show={this.props.show}
          onHide={this.props.closeHandler}
          style={{ opacity: 1 }}
        >
          <Modal.Header closeButton></Modal.Header>
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
                    <h2>{somoim.fields.title}</h2>
                    <Col md={{ offset: 1 }}>
                      <h4>
                        <span role="img" aria-label="thumb">
                          👍
                        </span>
                        {somoim.fields.likes}
                      </h4>
                    </Col>
                  </Row>
                  <Row>{tagList}</Row>
                  <br />
                  <Row>{somoim.fields.description}</Row>
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
