import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../store/actions/index";

import * as userActions from "../store/actions/user";

import { Container, Row, Col, Modal, Button } from "react-bootstrap";
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
    let newLikedSomoim = this.props.somoim;
    if (
      this.props.likedSomoims.filter(item => item.id === this.props.somoim.id)
        .length > 0
    )
      newLikedSomoim.likes = newLikedSomoim.likes - 1;
    else newLikedSomoim.likes = newLikedSomoim.likes + 1;

    this.props.increaseLikesOfSomoim(newLikedSomoim);
    this.props.addLikedSomoim(newLikedSomoim, this.props.loggedUser);
  };

  onClickJoinButton = () => {
    let newJoinedSomoim = this.props.somoim;
    if (
      this.props.joinedSomoims.filter(item => item.id === this.props.somoim.id)
        .length > 0
    )
      newJoinedSomoim.currentJoiner = newJoinedSomoim.currentJoiner - 1;
    else newJoinedSomoim.currentJoiner = newJoinedSomoim.currentJoiner + 1;

    this.props.increaseNumOfCurrentJoiner(newJoinedSomoim);
    this.props.addJoinedSomoim(newJoinedSomoim, this.props.loggedUser);
  };

  render() {
    let acceptQualification = false;
    let qualificationMessage = "";
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
      }

      let percentage =
        Math.round((somoim.currentJoiner / somoim.goalJoiner) * 1000) / 10;

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
              {this.props.loggedUser && (
                <Row>
                  <Col></Col>
                  <Col>
                    <Button size="lg" onClick={this.onClickLikeButton}>
                      좋아요!{" "}
                      <span role="img" aria-label="thumb">
                        👍
                      </span>
                    </Button>
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
    loggedUser: state.user.loggedUser,
    likedSomoims: state.user.likedSomoims,
    joinedSomoims: state.user.joinedSomoims
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTagList: () => dispatch(actionCreators.getTagList()),
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
