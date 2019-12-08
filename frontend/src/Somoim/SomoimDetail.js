import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../store/actions/index";

import { Modal, Button } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./SomoimDetail.css";
import views from "../images/views.png";
import heart from "../images/heart.png";
import person from "../images/person.png";

class SomoimDetail extends React.Component {
  onClickLikeButton = () => {
    this.props.addLikedSomoim(this.props.somoim, this.props.loggedUser);
  };

  onClickJoinButton = () => {
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

      if (this.props.loggedUser) {
        available_major_string = " : ";
        available_major_string += this.props.majors.filter(
          a => a.id === this.props.loggedUser.major
        )[0].name;
        if (somoim.available_major.includes(this.props.loggedUser.major)) {
          available_major_string += "가 포함되어 있습니다.";
        } else {
          available_major_string += "가 없습니다.";
        }
      } else {
        available_major_string = " : ";
        if (somoim.available_major.length === this.props.majors.length) {
          available_major_string += "제한 없음.";
        } else {
          available_major_string += somoim.managers[0].major.name;
          available_major_string += " 외 ";
          available_major_string += String(somoim.available_major.length - 1);
          available_major_string += "개 학과";
        }
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
      if (this.props.tags.length !== 0) {
        tagList = somoim.tags.map(item => (
          <Button key={item} variant="secondary" style={{ marginRight: "5px" }}>
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
          <Modal.Body>
            <div className="detail-header">
              <div
                className="detail-percentage"
                style={{ width: "220px", height: "220px" }}
              >
                <CircularProgressbar
                  value={percentage}
                  text={percentage + "%"}
                  styles={buildStyles({
                    rotation: 0.25,
                    strokeLinecap: "round",
                    textSize: "16px",

                    pathTransitionDuration: 0.5,
                    pathColor: "#c890cf",
                    textColor: "#f88",
                    trailColor: "#d6d6d6",
                    backgroundColor: "#3e98c7"
                  })}
                />
              </div>
              <div className="detail-header-right">
                <div className="detail-title">
                  <h1
                    style={{
                      fontSize: "3em",
                      paddingRight: "20px",
                      fontWeight: "bold"
                    }}
                  >
                    {somoim.title}
                  </h1>
                  <div className="detail-user-info-container">
                    <div
                      className="detail-user-info-item"
                      style={{ paddingRight: "9px" }}
                    >
                      <img
                        className="detail-user-info-item-img"
                        src={person}
                        alt="person"
                        width="18px"
                        height="18px"
                      ></img>
                      <p>&nbsp;25</p>
                    </div>
                    <div className="detail-user-info-item">
                      <img
                        className="detail-user-info-item-img"
                        src={views}
                        alt="views"
                        width="23px"
                        height="23px"
                      ></img>
                      <p>&nbsp;50</p>
                    </div>
                    <div className="detail-user-info-item">
                      <img
                        className="detail-user-info-item-img"
                        alt="heart"
                        src={heart}
                        width="28px"
                        height="31px"
                      ></img>
                      <p>{somoim.likers.length}</p>
                    </div>
                  </div>
                </div>
                <div className="detail-tagList">{tagList}</div>
                <div className="detail-short-info">
                  <span className="detail-short-info-title">
                    최소 활동 학기 수
                  </span>
                  <span> : {somoim.available_semester}</span>
                  <span>학기</span>
                </div>
                <div className="detail-short-info">
                  <span className="detail-short-info-title">활동 요일</span>
                  <span> : {session_day_string}</span>
                </div>
                <div className="detail-short-info">
                  <span className="detail-short-info-title">
                    가입 가능 학과
                  </span>
                  <span id="available_major_string">
                    {available_major_string}
                  </span>
                </div>
              </div>
            </div>
            <div className="detail-description">
              <div
                style={{
                  fontSize: "1.5em",
                  fontWeight: "bold",
                  fontStyle: "italic"
                }}
              >
                이 소모임은...
              </div>
              {somoim.description !== null &&
                somoim.description.split("\n").map((line, i) => {
                  return (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  );
                })}
            </div>
            <div className="detail-footer">
              {this.props.loggedUser &&
                (isLoggedUserLike ? (
                  <button
                    className="unliked-likebutton"
                    onClick={this.onClickLikeButton}
                  >
                    좋아요 취소
                  </button>
                ) : (
                  <button
                    className="liked-likebutton"
                    onClick={this.onClickLikeButton}
                  >
                    좋아요!
                  </button>
                ))}
              {this.props.loggedUser &&
                (acceptQualification ? (
                  <button
                    className="joinbutton"
                    onClick={this.onClickJoinButton}
                  >
                    지원하기
                  </button>
                ) : (
                  <button
                    className="disabled-joinbutton"
                    title={qualificationMessage}
                    disabled
                  >
                    지원하기
                  </button>
                ))}
            </div>
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
    addLikedSomoim: (newLikedSomoim, user) =>
      dispatch(actionCreators.addLikedSomoim(newLikedSomoim, user)),
    addJoinedSomoim: (newJoinedSomoim, user) =>
      dispatch(actionCreators.addJoinedSomoim(newJoinedSomoim, user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SomoimDetail));
