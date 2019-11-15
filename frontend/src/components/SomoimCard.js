import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import * as actionCreators from "../store/actions/index";

import "./SomoimCard.css";
import heart from "../images/heart.png";
import views from "../images/views.png";
import person from "../images/person.png";

class SomoimCard extends React.Component {
  render() {
    let somoim = this.props.somoim;
    let acceptQualification = false;

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
        <div
          className="Card"
          onClick={() => {
            this.props.clickHandler(somoim.id);
          }}
        >
          <div className="title">
            <h2>{somoim.title}</h2>
          </div>
          {/* <div className="applicable-term">
            <p>01/07 ~ 01/20</p>
          </div> */}
          <div className="percentage">
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
              <p>{somoim.likers.length}</p>
            </div>
          </div>
          <div className="summary">{somoim.summary}</div>
          <div className="tagList">{tagList}</div>
        </div>
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
