import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../store/actions/index";

import { Modal, Button } from "react-bootstrap";

import "./ClubDetail.css";
import club4u from "../images/club4u.png";
import heart from "../images/heart.png";
import views from "../images/views.png";
import person from "../images/person.png";

class ClubDetail extends React.Component {
  state = {
    selected_gallery: 1
  };

  onClickLikeButton = () => {
    this.props.addLikedClub(this.props.club, this.props.loggedUser);
  };

  onClickApplyButton = () => {
    let newAppliedClub = this.props.club;
    this.props.addAppliedClub(newAppliedClub, this.props.loggedUser);
  };

  onClickClubTag = id => {
    this.props.closeHandler();
    this.props.history.push("/club/tag/" + id);
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

      if (this.props.loggedUser) {
        available_major_string = " : ";
        available_major_string += this.props.majors.filter(
          a => a.id === this.props.loggedUser.major
        )[0].name;
        if (club.available_major.includes(this.props.loggedUser.major)) {
          available_major_string += "가 포함되어 있습니다.";
        } else {
          available_major_string += "가 없습니다.";
        }
      } else {
        available_major_string = " : ";
        if (club.available_major.length === this.props.majors.length) {
          available_major_string += "제한 없음.";
        } else {
          available_major_string += club.managers[0].major.name;
          available_major_string += " 외 ";
          available_major_string += String(club.available_major.length - 1);
          available_major_string += "개 학과";
        }
      }

      for (var i = 0; i < 7; i++) {
        if ((club.session_day & (1 << i)) !== 0) {
          session_day_string += ["월", "화", "수", "목", "금", "토", "일"][i];
          session_day_string += " ";
        }
      }

      let mainImage = <img src={null} width="300" height="300" alt="" />;
      let image = [];
      let mood, mood1, mood2, mood3;
      /*
      if (club.img_tag) {
        mood1 = club.img_tag[0];
        mood2 = club.img_tag[1];
        mood3 = club.img_tag[2];
      }
      */
      if (club.poster_img && club.poster_img.length > 0)
        mainImage = (
          <img
            src={"/media/" + club.poster_img[0]}
            width="300"
            height="300"
            alt=""
          />
        );

      if (club.poster_img && club.poster_img.length > 0) {
        let count = 0,
          count2 = 0;
        let index = this.state.selected_gallery;
        while (count < 4) {
          if (club.poster_img.length > index) {
            image[count] = (
              <img
                src={"media/" + club.poster_img[index]}
                width="150px"
                height="150px"
                alt=""
              />
            );
          } else {
            image[count] = (
              <img src={club4u} width="150px" height="150px" alt="club4u"></img>
            );
          }
          count++;
          index++;
        }
        if (club.img_tag) {
          if (
            club.img_tag[0] > club.img_tag[1] &&
            club.img_tag[0] > club.img_tag[2]
          )
            mood = "- 즐거운 분위기";
          else if (
            club.img_tag[1] > club.img_tag[0] &&
            club.img_tag[1] > club.img_tag[2]
          )
            mood = " - 협동적인 분위기";
          else mood = " - 진지한 분위기";
        }
      }

      let tagList;
      if (this.props.tags.length !== 0) {
        tagList = club.tags.map(tag_id => (
          <Button
            key={tag_id}
            className="club-detail-tag"
            variant="secondary"
            onClick={() => this.onClickClubTag(tag_id)}
            style={{ marginRight: "5px" }}
          >
            {"#" + this.props.tags.filter(tag => tag.id === tag_id)[0].name}
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
              <div className="detail_poster">{mainImage}</div>
              <div className="detail-header-right">
                <div className="detail-title">
                  <h1 style={{ fontSize: "3em", paddingRight: "20px" }}>
                    {club.name}
                  </h1>
                  <div className="detail-user-info-container">
                    <div
                      className="detail-user-info-item"
                      style={{ paddingRight: "9px" }}
                    >
                      <img
                        className="detail-user-info-item-img"
                        src={person}
                        height="18px"
                        width="18px"
                        alt="person"
                      ></img>
                      <p>&nbsp;{club.member}</p>
                    </div>
                    <div className="detail-user-info-item">
                      <img
                        className="detail-user-info-item-img"
                        src={views}
                        height="23px"
                        width="23px"
                        alt="views"
                      ></img>
                      <p>&nbsp;{club.hits}</p>
                    </div>
                    <div className="detail-user-info-item">
                      <img
                        className="detail-user-info-item-img"
                        src={heart}
                        height="31px"
                        width="28px"
                        alt="heart"
                      ></img>
                      <p>{club.likers.length}</p>
                    </div>
                  </div>
                </div>
                <div className="detail-tagList">{tagList}</div>
                <div className="detail-short-info">
                  <span className="detail-short-info-title">지원 기간</span>
                  <span>
                    {" "}
                    : {club.recruit_start_day} ~ {club.recruit_end_day}
                  </span>
                </div>
                <div className="detail-short-info">
                  <span className="detail-short-info-title">
                    최소 활동 학기 수
                  </span>
                  <span> : {club.available_semester}</span>
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
                우리 동아리는...
              </div>
              {club.description &&
                club.description.split("\n").map((line, i) => {
                  return (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  );
                })}
            </div>
            <div className="detail-gallery">
              <div
                style={{
                  fontSize: "1.5em",
                  fontWeight: "bold",
                  fontStyle: "italic"
                }}
              >
                갤러리{mood}
              </div>
              <div className="detail-gallery-container">
                <button
                  className="detail-gallery-button"
                  onClick={() => {
                    if (this.state.selected_gallery !== 1) {
                      this.setState({
                        selected_gallery: this.state.selected_gallery - 1
                      });
                    }
                  }}
                >
                  &laquo;
                </button>
                <div className="detail-gallery-item">{image[0]}</div>
                <div className="detail-gallery-item">{image[1]}</div>
                <div className="detail-gallery-item">{image[2]}</div>
                <div className="detail-gallery-item">{image[3]}</div>
                <button
                  className="detail-gallery-button"
                  onClick={() => {
                    if (
                      club.poster_img.length >
                      this.state.selected_gallery + 4
                    ) {
                      this.setState({
                        selected_gallery: this.state.selected_gallery + 1
                      });
                    }
                  }}
                >
                  &raquo;
                </button>
              </div>
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
                    className="applybutton"
                    onClick={this.onClickApplyButton}
                  >
                    지원하기
                  </button>
                ) : (
                    <button
                      className="disabled-applybutton"
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
