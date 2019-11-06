import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import "react-circular-progressbar/dist/styles.css";
import * as actionCreators from "../store/actions/index";
class ClubCard extends React.Component {
  componentDidMount() {
    this.props.getTagList();
  }
  render() {
    let club = this.props.club;

    let acceptQualification = false;

    if (club && this.props.loggedUser) {
      // check qualification
      // 1. check whether user can participate in session day
      let qualification_1 =
        (club.session_day & this.props.loggedUser.available_session_day) ===
        club.session_day;

      // 2. check whether user's major is available
      let qualification_2 = club.available_major.includes(
        this.props.loggedUser.major
      );

      // 3. check whether user can participate in next available semesters
      let qualification_3 =
        club.available_semester <= this.props.loggedUser.available_semester;

      if (qualification_1 && qualification_2 && qualification_3)
        acceptQualification = true;
    }

    let image = (
      <img src={"/media/" + club.poster_img} width="100" height="100" alt="" />
    );

    let tagList;
    if (this.props.tags.length != 0) {
      tagList = club.tags.map(item => (
        <Button key={item} variant="outline-primary">
          {"#" + this.props.tags[item - 1].name}
        </Button>
      ));
    }
    return (
      <Card
        onClick={() => {
          this.props.clickHandler(club.id);
        }}
      >
        <Card.Body>
          <Container>
            <Row>
              <Row xs="5">&nbsp;&nbsp;{image}</Row>
              <Col>
                <Row>
                  <h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{club.name}</h2>
                  <Col md={{ offset: 1 }}>
                    <h4>{"👍 " + club.likes}</h4>
                  </Col>
                </Row>
                <Row>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{tagList}
                </Row>
                <br />
                <Row>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{club.summary}
                </Row>
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
  return {
    getTagList: () => dispatch(actionCreators.getTagList())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClubCard));
