import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";
import * as actionCreators from "../store/actions/index";
import { cardFactory, ClubDetailFactory } from "./MyPageTabFactory";

class LikedClubTab extends Component {
  state = { clubDetailShow: false, selectedClubID: null };

  onClickCard = (e, item) => {
    if (e.target.className === "card-body") {
      this.setState({
        ...this.state,
        clubDetailShow: true,
        selectedClubID: item.id
      });
    }
  };

  onCloseDetail = () => {
    this.setState({
      ...this.state,
      clubDetailShow: false
    });
  };

  render() {
    let list = null;
    if (this.props.likedClubs) {
      list = this.props.likedClubs.map((item, idx) => {
        return cardFactory(
          item,
          idx,
          this.onClickCard,
          <Button
            id="club-unlike-button"
            variant="dark"
            onClick={() => {
              this.props.addLikedClub(item, this.props.loggedUser);
            }}
            block
            style={{ height: "100%" }}
          >
            좋아요 취소
          </Button>
        );
      });
    }
    return ClubDetailFactory(
      list,
      this.state.clubDetailShow,
      this.props.clubs.filter(a => a.id === this.state.selectedClubID)[0],
      this.onCloseDetail
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.user.loggedUser,
    clubs: state.club.clubs,
    likedClubs: state.user.likedClubs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addLikedClub: (club, user) =>
      dispatch(actionCreators.addLikedClub(club, user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LikedClubTab));
