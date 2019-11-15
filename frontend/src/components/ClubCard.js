import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

import heart from "../images/heart.png";
import views from "../images/views.png";
import person from "../images/person.png";

import "./ClubCard.css";

class ClubCard extends React.Component {
  render() {
    let club = this.props.club;
    let acceptQualification = false;

    if (club) {
      if (this.props.loggedUser) {
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

      let image = <img src={null} width="120" height="120" alt="" />;
      if (club.poster_img && club.poster_img.length > 0)
        image = (
          <img
            src={"media/" + club.poster_img[0]}
            width="120"
            height="120"
            alt=""
          />
        );

      let tagList;
      if (this.props.tags.length !== 0) {
        tagList = club.tags.map(item => (
          <Button key={item} variant="secondary" style={{ marginRight: "5px" }}>
            {"#" + this.props.tags[item - 1].name}
          </Button>
        ));
      }

      return (
        <div
          className="Card"
          onClick={() => {
            this.props.clickHandler(club.id);
          }}
        >
          <div className="title">
            <h2>{club.name}</h2>
          </div>
          {/* <div className="applicable-term">
            <p>01/07 ~ 01/20</p>
          </div> */}
          <div className="poster">{image}</div>
          <div className="user-info">
            <div className="user-info-item">
              <img src={person} width="15px" height="15px" alt="person"></img>
              <p>&nbsp;25</p>
            </div>
            <div className="user-info-item">
              <img src={views} width="20px" height="20px" alt="views"></img>
              <p>&nbsp;50</p>
            </div>
            <div className="user-info-item">
              <img src={heart} width="25px" height="28px" alt="heart"></img>
              <p>{club.likers.length}</p>
            </div>
          </div>
          <div className="summary">{club.summary}</div>
          <div className="tagList">{tagList}</div>
        </div>
      );
    } else return <></>;
  }
}

const mapStateToProps = state => {
  return {
    tags: state.tag.tags,
    loggedUser: state.user.loggedUser
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClubCard));
