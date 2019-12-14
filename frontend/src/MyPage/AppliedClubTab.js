import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";
import { cardFactory, ClubDetailFactory } from "./MyPageTabFactory";

class AppliedClubTab extends Component {
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
    if (this.props.appliedClubs) {
      list = this.props.appliedClubs.map((item, idx) => {
        return cardFactory(
          item,
          idx,
          this.onClickCard,
          <Button
            id="apply-club-button"
            variant="dark"
            block
            style={{ height: "100%" }}
            onClick={() => {
              this.props.history.push("/apply/" + item.id);
            }}
          >
            지원서 수정
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
    clubs: state.club.clubs,
    appliedClubs: state.user.appliedClubs
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AppliedClubTab));
