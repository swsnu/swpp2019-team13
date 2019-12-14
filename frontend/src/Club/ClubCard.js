import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";

import "./ClubCard.css";
import heart from "../images/heart.png";
import views from "../images/views.png";
import person from "../images/person.png";
import * as actionCreators from "../store/actions/index";

class ClubCard extends React.Component {
  render() {
    let club = this.props.club;

    if (club) {
      let image = (
        <img
          src={null}
          className="club-poster-img"
          width="100%"
          height="100%"
          alt=""
        />
      );
      if (club.poster_img && club.poster_img.length > 0)
        image = (
          <img
            src={"/media/" + club.poster_img[0]}
            className="club-poster-img"
            width="100%"
            height="100%"
            alt=""
          />
        );

      let tagList;
      if (this.props.tags.length !== 0) {
        tagList = club.tags.map(tag_id => (
          <Button
            key={tag_id}
            variant="secondary"
            style={{ marginRight: "5px" }}
          >
            {"#" + this.props.tags.filter(tag => tag.id === tag_id)[0].name}
          </Button>
        ));
      }

      let recruit_period = "";
      if (club.recruit_start_day) {
        recruit_period +=
          club.recruit_start_day.split("-")[1] +
          "/" +
          club.recruit_start_day.split("-")[2];
        recruit_period += " ~ ";
        recruit_period +=
          club.recruit_end_day.split("-")[1] +
          "/" +
          club.recruit_end_day.split("-")[2];
      }

      return (
        <div
          className="Club-Card"
          onClick={() => {
            this.props.clickHandler(club.id);
            this.props.addClubHitCount(club.id);
          }}
        >
          <div className="club-title">
            <h2>{club.name}</h2>
          </div>
          <div className="club-applicable-term">
            <p>{recruit_period}</p>
          </div>
          <div className="club-poster">{image}</div>
          <div className="club-user-info">
            <div className="club-user-info-item">
              <img
                src={person}
                className="club-user-info-item-img"
                width="15px"
                height="15px"
                alt="person"
              ></img>
              <p>&nbsp;{club.member}</p>
            </div>
            <div className="club-user-info-item">
              <img
                src={views}
                className="club-user-info-item-img"
                width="20px"
                height="20px"
                alt="views"
              ></img>
              <p>&nbsp;{club.hits}</p>
            </div>
            <div className="club-user-info-item">
              <img
                src={heart}
                className="club-user-info-item-img"
                width="25px"
                height="28px"
                alt="heart"
              ></img>
              <p>{club.likers.length}</p>
            </div>
          </div>
          <div className="club-summary">{club.summary}</div>
          <div className="club-tagList">{tagList}</div>
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
  return {
    addClubHitCount: club_id =>
      dispatch(actionCreators.addClubHitCount(club_id))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClubCard));
