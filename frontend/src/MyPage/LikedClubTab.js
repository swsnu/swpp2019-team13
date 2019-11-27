import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";
import ClubDetail from "../Club/ClubDetail";
import * as actionCreators from "../store/actions/index";
import { cardFactory } from "./MyPageTabFactory";

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
            onClick={() => {
              this.props.addLikedClub(item, this.props.loggedUser);
            }}
          >
            Unlike
          </Button>
        );
      });
    }
    return (
      <div>
        {list}
        <ClubDetail
          show={this.state.clubDetailShow}
          club={
            this.props.clubs.filter(a => a.id === this.state.selectedClubID)[0]
          }
          closeHandler={() => {
            this.setState({
              ...this.state,
              clubDetailShow: false
            });
          }}
          forceRender={Math.random()}
        />
      </div>
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
