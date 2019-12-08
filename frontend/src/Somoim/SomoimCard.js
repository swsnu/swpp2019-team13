import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./SomoimCard.css";
import heart from "../images/heart.png";
import views from "../images/views.png";
import person from "../images/person.png";
import * as actionCreators from "../store/actions/index";

class SomoimCard extends React.Component {
  render() {
    let somoim = this.props.somoim;

    if (somoim) {
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
          className="Somoim-Card"
          onClick={() => {
            this.props.clickHandler(somoim.id);
            this.props.addSomoimHitCount(somoim.id);
          }}
        >
          <div className="somoim-title">
            <h2>{somoim.title}</h2>
          </div>
          {/* <div className="applicable-term">
            <p>01/07 ~ 01/20</p>
          </div> */}
          <div className="somoim-percentage">
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
          <div className="somoim-user-info">
            <div className="somoim-user-info-item">
              <img src={person} width="15px" height="15px" alt="person"></img>
              <p>&nbsp;{somoim.member}</p>
            </div>
            <div className="somoim-user-info-item">
              <img src={views} width="20px" height="20px" alt="views"></img>
              <p>&nbsp;{somoim.hits}</p>
            </div>
            <div className="somoim-user-info-item">
              <img src={heart} width="25px" height="28px" alt="heart"></img>
              <p>{somoim.likers.length}</p>
            </div>
          </div>
          <div className="somoim-summary">{somoim.summary}</div>
          <div className="somoim-tagList">{tagList}</div>
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
    addSomoimHitCount: club_id =>
      dispatch(actionCreators.addSomoimHitCount(club_id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SomoimCard));
