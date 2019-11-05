import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import * as actionCreators from "../store/actions/index";

class SomoimCard extends React.Component {
  componentDidMount() {
    this.props.getTagList();
  }
  render() {
    let somoim = this.props.somoim;
    if (somoim.fields) {
      let percentage =
        (somoim.fields.currentJoiner / somoim.fields.goalJoiner) * 100;
      let tagList;
      if (this.props.tags.length != 0) {
        console.log(this.props.tags);
        tagList = somoim.fields.tags.map(item => (
          <Button key={item} variant="outline-primary">
            {"#" + this.props.tags[item - 1].name}
          </Button>
        ));
      }

      return (
        <Card
          onClick={() => {
            this.props.clickHandler(somoim.pk);
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
                    <h2>{somoim.fields.title}</h2>
                    <Col md={{ offset: 1 }}>
                      <h4>{"👍 " + somoim.fields.likes}</h4>
                    </Col>
                  </Row>
                  <Row>{tagList}</Row>
                  <br />
                  <Row>{somoim.fields.summary}</Row>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      );
    } else {
      let percentage = (somoim.currentJoiner / somoim.goalJoiner) * 100;
      let tagList;
      if (this.props.tags.length != 0) {
        console.log(this.props.tags);
        tagList = somoim.tags.map(item => (
          <Button key={item} variant="outline-primary">
            {"#" + this.props.tags[item - 1].name}
          </Button>
        ));
      }

      return (
        <Card
          onClick={() => {
            this.props.clickHandler(somoim.pk);
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
                  <Row>{somoim.summary}</Row>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    tags: state.tag.tags,
    somoims: state.somoim.somoims
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTagList: () => dispatch(actionCreators.getTagList()),
    getSomoimList: () => dispatch(actionCreators.getSomoimList())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SomoimCard));
