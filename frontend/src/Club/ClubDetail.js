import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../store/actions/index";

import { Container, Row, Col, Modal, Button } from "react-bootstrap";

class ClubDetail extends React.Component {
  state = {
    selected_image: 0
  };
  onClickLikeButton = () => {
    this.props.addLikedClub(this.props.club, this.props.loggedUser);
  };

  onClickApplyButton = () => {
    let newAppliedClub = this.props.club;
    this.props.addAppliedClub(newAppliedClub, this.props.loggedUser);
  };

  render() {
    let acceptQualification = false;
    let isLoggedUserLike = false;
    let qualificationMessage = "";
    let available_major_string = "";
    let session_day_string = "";

    let club = this.props.club;
    if (club) {
      if (this.props.loggedUser) {
        // check qualification
        // 1. check whether user can participate in session day
        let qualification_1 =
          (club.session_day & this.props.loggedUser.available_session_day) ===
          club.session_day;

        if (!qualification_1)
          qualificationMessage += "활동 요일에 활동할 수 없습니다\n";

        // 2. check whether user's major is available
        let qualification_2 = club.available_major.includes(
          this.props.loggedUser.major
        );

        if (!qualification_2)
          qualificationMessage += "가입 가능 학과가 아닙니다\n";

        // 3. check whether user can participate in next available semesters
        let qualification_3 =
          club.available_semester <= this.props.loggedUser.available_semester;

        if (!qualification_3)
          qualificationMessage += "활동 가능 학기가 충분하지 않습니다\n";

        if (qualification_1 && qualification_2 && qualification_3)
          acceptQualification = true;

        // check whether user had like
        isLoggedUserLike = club.likers
          .map(a => a.id)
          .includes(this.props.loggedUser.id);
      }

      if (club.available_major.length === this.props.majors.length) {
        available_major_string = "제한 없음";
      } else {
        club.available_major.map(major_id => {
          available_major_string += this.props.majors.filter(
            a => a.id === major_id
          )[0].name;
          available_major_string += " ";
          return 0;
        });
      }

      for (var i = 0; i < 7; i++) {
        if ((club.session_day & (1 << i)) !== 0) {
          session_day_string += ["월", "화", "수", "목", "금", "토", "일"][i];
          session_day_string += " ";
        }
      }

      let image = <img src={null} width="400" height="400" alt="" />;

      if (club.poster_img && club.poster_img.length > 0)
        image = (
          <img
            src={"media/" + club.poster_img[this.state.selected_image]}
            width="400"
            height="500"
            alt=""
          />
        );

      let tagList;
      if (this.props.tags.length !== 0) {
        tagList = club.tags.map(item => (
          <Button size="lg" key={item} variant="outline-primary">
            {"#" + this.props.tags[item - 1].name}
          </Button>
        ));
      }
      return (
        <Modal
          size="lg"
          show={this.props.show}
          onHide={this.props.closeHandler}
          style={{ opacity: 1 }}
        >
          <Modal.Header closeButton>
            <Col sm={10}>
              <h1>{club.name}</h1>
            </Col>
            <Col sm={2}>
              <h1>
                <span role="img" aria-label="thumb">
                  👍
                </span>
                &nbsp;{club.likers.length}
              </h1>
            </Col>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col>
                  {image}
                  <Row>
                    <Col sm={1}></Col>
                    {this.state.selected_image === 0 ? (
                      <Button
                        as={Col}
                        size="lg"
                        disabled={true}
                        style={{ marginTop: "3px", marginRight: "3px" }}
                      >
                        prev
                      </Button>
                    ) : (
                        <Button
                          as={Col}
                          className='prev'
                          size="lg"
                          style={{ marginTop: "3px", marginRight: "3px" }}
                          onClick={() => {
                            this.setState({
                              ...this.state,
                              selected_image: this.state.selected_image - 1
                            });
                          }}
                        >
                          prev
                      </Button>
                      )}

                    <Col sm={5}></Col>
                    {club.poster_img.length === 0 ||
                      this.state.selected_image === club.poster_img.length - 1 ? (
                        <Button
                          as={Col}
                          size="lg"
                          disabled={true}
                          style={{ marginTop: "3px", marginRight: "3px" }}
                        >
                          next
                      </Button>
                      ) : (
                        <Button
                          as={Col}
                          size="lg"
                          style={{ marginTop: "3px", marginRight: "3px" }}
                          className='next'
                          onClick={() => {
                            this.setState({
                              ...this.state,
                              selected_image: this.state.selected_image + 1
                            });
                          }}
                        >
                          next
                      </Button>
                      )}

                    <Col sm={1}></Col>
                  </Row>
                </Col>
                <Col>
                  <Row>{tagList}</Row>
                  <br />
                  <Row>
                    <h3>{club.description}</h3>
                  </Row>
                </Col>
              </Row>
              <br />
              <br />
              <h2>가입 조건</h2>
              <Row>
                <h3>- 가능 학과</h3>
              </Row>
              <h4>{available_major_string}</h4>
              <Row>
                <h3>- 활동 요일</h3>
              </Row>
              <h4>{session_day_string}</h4>
              <Row>
                <h3>- 최소 활동 학기 수</h3>
              </Row>
              <h4>{club.available_semester + "학기"}</h4>
              <br />
              <br />
              {this.props.loggedUser && (
                <Row>
                  <Col></Col>
                  <Col>
                    {isLoggedUserLike ? (
                      <Button
                        className='likebutton'
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
                          className='likebutton2'
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
                      <Button onClick={this.onClickApplyButton} size="lg"
                        className="applybutton">
                        지원하기
                      </Button>
                    ) : (
                        <Button disabled title={qualificationMessage} size="lg">
                          지원하기
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
    loggedUser: state.user.loggedUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addLikedClub: (newLikedClub, user) =>
      dispatch(actionCreators.addLikedClub(newLikedClub, user)),
    addAppliedClub: (newAppliedClub, user) =>
      dispatch(actionCreators.addAppliedClub(newAppliedClub, user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClubDetail));