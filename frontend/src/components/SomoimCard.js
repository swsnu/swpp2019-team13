import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import * as actionCreators from "../store/actions/index";

class SomoimCard extends React.Component {
  componentDidMount() {}

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

      let percentage =
        Math.round((somoim.joiners.length / somoim.goalJoiner) * 1000) / 10;

      let tagList;
      if (this.props.tags.length !== 0) {
        tagList = somoim.tags.map(item => (
          <Button key={item} variant="secondary" style={{ marginRight: "5px" }}>
            {"#" + this.props.tags[item - 1].name}
          </Button>
        ));
      }

      return (
        <Card
          style={{ height: "160px", margin: "10px" }}
          onClick={() => {
            this.props.clickHandler(somoim.id);
          }}
        >
          <Card.Body>
            <Container>
              <Row>
                <Col xs="4">
                  <CircularProgressbar
                    value={percentage}
                    text={percentage + "%"}
                  />
                </Col>
                <Col style={{ paddingLeft: "80px" }}>
                  <Row>
                    <div>
                      <h2
                        style={{
                          display: "inline-block",
                          paddingRight: "30px",
                          fontWeight: "bold"
                        }}
                      >
                        {somoim.title}
                      </h2>
                      <h3 style={{ display: "inline-block" }}>
                        {"👍 " + somoim.likers.length}
                      </h3>
                    </div>
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
    } else return <></>;
  }
}

const mapStateToProps = state => {
  return {
    somoims: state.somoim.somoims,
    tags: state.tag.tags,
    loggedUser: state.user.loggedUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSomoimList: () => dispatch(actionCreators.getSomoimList())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SomoimCard));
