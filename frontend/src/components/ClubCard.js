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

    let image = <img src={club.poster_img} width="100" height="100" alt="" />;

    let tagList;
    if (this.props.tags.length != 0) {
      tagList = club.tags.map(item => (
        <Button key={item} variant="secondary" style={{ marginRight: "5px" }}>
          {"#" + this.props.tags[item - 1].name}
        </Button>
      ));
    }
    return (
      <Card
        style={{ height: "150px", margin: "10px" }}
        onClick={() => {
          this.props.clickHandler(club.id);
        }}
      >
        <Card.Body>
          <Container>
            <Row>
              <Col xs="4" style={{ paddingTop: "2%" }}>
                {image}
              </Col>
              <Col>
                <Row>
                  <div>
                    <h1
                      style={{ display: "inline-block", paddingRight: "30px" }}
                    >
                      {club.name}
                    </h1>
                    <h3 style={{ display: "inline-block" }}>
                      {"👍 " + club.likers.length}
                    </h3>
                  </div>
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
