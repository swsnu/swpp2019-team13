import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../store/actions/index";
import * as userActions from "../store/actions/user";

import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

class SomoimDetail extends React.Component {
  componentDidMount() {
    this.props.getTagList();
    if (this.props.loggedUser) {
      this.props.onGetLikedSomoims(this.props.loggedUser);
      this.props.onGetJoinedSomoims(this.props.loggedUser);
    }
  }
  onClickLikeButton = () => {
    // let newLikedSomoim = this.props.somoim;
    // if (
    //   this.props.likedSomoims.filter(item => item.id === this.props.somoim.id)
    //     .length > 0
    // )
    //   newLikedSomoim.likes = newLikedSomoim.likes - 1;
    // else newLikedSomoim.likes = newLikedSomoim.likes + 1;

    // this.props.increaseLikesOfSomoim(newLikedSomoim);
    this.props.addLikedSomoim(this.props.somoim, this.props.loggedUser);
  };

  onClickJoinButton = () => {
    // let newJoinedSomoim = this.props.somoim;
    // if (
    //   this.props.joinedSomoims.filter(item => item.id === this.props.somoim.id)
    //     .length > 0
    // )
    //   newJoinedSomoim.currentJoiner = newJoinedSomoim.currentJoiner - 1;
    // else newJoinedSomoim.currentJoiner = newJoinedSomoim.currentJoiner + 1;

    // this.props.increaseNumOfCurrentJoiner(newJoinedSomoim);
    this.props.addJoinedSomoim(this.props.somoim, this.props.loggedUser);
  };

  render() {
    let acceptQualification = false;
    let isLoggedUserLike = false;
    let qualificationMessage = "";
    let available_major_string = "";
    let session_day_string = "";

    let somoim = this.props.somoim;
    if (somoim) {
      if (this.props.loggedUser) {
        // check qualification
        // 1. check whether user can participate in session day
        let qualification_1 =
          (somoim.session_day & this.props.loggedUser.available_session_day) ===
          somoim.session_day;

        if (!qualification_1)
          qualificationMessage += "활동 요일에 활동할 수 없습니다\n";

        // 2. check whether user's major is available
        let qualification_2 = somoim.available_major.includes(
          this.props.loggedUser.major
        );

        if (!qualification_2)
          qualificationMessage += "가입 가능 학과가 아닙니다\n";

        // 3. check whether user can participate in next available semesters
        let qualification_3 =
          somoim.available_semester <= this.props.loggedUser.available_semester;

        if (!qualification_3)
          qualificationMessage += "활동 가능 학기가 충분하지 않습니다\n";

        if (qualification_1 && qualification_2 && qualification_3)
          acceptQualification = true;

        // check whether user had like
        isLoggedUserLike = somoim.likers
          .map(a => a.id)
          .includes(this.props.loggedUser.id);
      }

      if (somoim.available_major.length === this.props.majors.length) {
        available_major_string = "제한 없음";
      } else {
        somoim.available_major.map(major_id => {
          available_major_string += this.props.majors.filter(
            a => a.id === major_id
          )[0].name;
          available_major_string += " ";
        });
      }

      for (var i = 0; i < 7; i++) {
        if ((somoim.session_day & (1 << i)) !== 0) {
          session_day_string += ["월", "화", "수", "목", "금", "토", "일"][i];
          session_day_string += " ";
        }
      }
      let percentage =
        Math.round((somoim.joiners.length / somoim.goalJoiner) * 1000) / 10;

      let tagList;
      if (this.props.tags.length != 0) {
        tagList = somoim.tags.map(item => (
          <Button key={item} variant="outline-primary">
            {"#" + this.props.tags[item - 1].name}
          </Button>
        ));
      }
      return (
        <Modal
          show={this.props.show}
          onHide={this.props.closeHandler}
          style={{ opacity: 1 }}
        >
          <Modal.Header closeButton>
            <Col sm={10}>
              <h2>{somoim.title}</h2>
            </Col>
            <Col sm={2}>
              <h4>
                <span role="img" aria-label="thumb">
                  👍
                </span>
                {somoim.likers.length}
              </h4>
            </Col>
          </Modal.Header>
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
                    <Col md={{ offset: 1 }}></Col>
                  </Row>
                  <Row>{tagList}</Row>
                  <br />
                  <Row>{somoim.description}</Row>
                </Col>
              </Row>
              <br />
              <br />
              <Form.Label>
                <h4>가입 조건</h4>
              </Form.Label>
              <Row>
                <Form.Label>- 가능 학과</Form.Label>
              </Row>
              {available_major_string}
              <Row>
                <Form.Label>- 활동 요일</Form.Label>
              </Row>
              {session_day_string}
              <Row>
                <Form.Label>- 최소 활동 학기 수</Form.Label>
              </Row>
              {somoim.available_semester + "학기"}
              <br />
              <br />
              {this.props.loggedUser && (
                <Row>
                  <Col></Col>
                  <Col>
                    {isLoggedUserLike ? (
                      <Button
                        size="lg"
                        variant="primary"
                        onClick={this.onClickLikeButton}
                      >
                        좋아요!{" "}
                        <span role="img" aria-label="thumb">
                          👍
                        </span>
                      </Button>
                    ) : (
                      <Button
                        size="lg"
                        variant="secondary"
                        onClick={this.onClickLikeButton}
                      >
                        좋아요!{" "}
                        <span role="img" aria-label="thumb">
                          👍
                        </span>
                      </Button>
                    )}
                  </Col>
                  <Col></Col>
                  <Col>
                    {acceptQualification ? (
                      <Button size="lg" onClick={this.onClickJoinButton}>
                        함께하기
                      </Button>
                    ) : (
                      <Button size="lg" disabled title={qualificationMessage}>
                        함께하기
                      </Button>
                    )}
                  </Col>
                  <Col></Col>
                </Row>
              )}
            </Container>
          </Modal.Body>
        </Modal>
      );
    } else return <></>;
  }
}

const mapStateToProps = state => {
  return {
    tags: state.tag.tags,
    majors: state.major.majors,
    loggedUser: state.user.loggedUser,
    likedSomoims: state.user.likedSomoims,
    joinedSomoims: state.user.joinedSomoims
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTagList: () => dispatch(actionCreators.getTagList()),

    getSomoimList: () => dispatch(actionCreators.getSomoimList()),

    increaseLikesOfSomoim: newLikedSomoim =>
      dispatch(actionCreators.increaseLikesOfSomoim(newLikedSomoim)),
    addLikedSomoim: (newLikedSomoim, user) =>
      dispatch(actionCreators.addLikedSomoim(newLikedSomoim, user)),
    increaseNumOfCurrentJoiner: newJoinedSomoim =>
      dispatch(actionCreators.increaseNumOfCurrentJoiner(newJoinedSomoim)),
    addJoinedSomoim: (newJoinedSomoim, user) =>
      dispatch(actionCreators.addJoinedSomoim(newJoinedSomoim, user)),

    onGetLikedSomoims: user => dispatch(userActions.getLikedSomoims(user)),
    onGetJoinedSomoims: user => dispatch(userActions.getJoinedSomoims(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SomoimDetail));
