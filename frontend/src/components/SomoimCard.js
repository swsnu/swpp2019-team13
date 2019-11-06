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
    let acceptQualification = false;

    let somoim = this.props.somoim;
    if (somoim) {
      if (this.props.loggedUser) {
        // check qualification
        // 1. check whether user can participate in session day
        let qualification_1 =
          (somoim.session_day & this.props.loggedUser.available_session_day) ===
          somoim.session_day;

        // 2. check whether user's major is available
        let qualification_2 = somoim.available_major.includes(
          this.props.loggedUser.major
        );

        // 3. check whether user can participate in next available semesters
        let qualification_3 =
          somoim.available_semester <= this.props.loggedUser.available_semester;

        if (qualification_1 && qualification_2 && qualification_3)
          acceptQualification = true;
      }

      let percentage = (somoim.currentJoiner / somoim.goalJoiner) * 100;
      let tagList;
      if (this.props.tags.length != 0) {
        tagList = somoim.tags.map(item => (
          <Button key={item} variant="outline-primary">
            {"#" + this.props.tags[item - 1].name}
          </Button>
        ));
      }

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
                  <Row>{somoim.summary}</Row>
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
        tagList = somoim.tags.map(item => (
          <Button key={item} variant="outline-primary">
            {"#" + this.props.tags[item - 1].name}
          </Button>
        ));
      }

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
    loggedUser: state.user.loggedUser,
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
