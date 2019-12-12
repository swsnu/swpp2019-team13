import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";
import { cardFactory, ClubDetailFactory } from "./MyPageTabFactory";

class ManagingClubTab extends Component {
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
    if (this.props.managingClubs) {
      list = this.props.managingClubs.map((item, idx) => {
        return cardFactory(
          item,
          idx,
          this.onClickCard,
          <Button
            id="manage-club-button"
            variant="dark"
            block
            style={{ height: "100%" }}
            onClick={() => {
              this.props.history.push("/club/manage/" + item.id);
            }}
          >
            동아리 관리
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
    managingClubs: state.user.managingClubs
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ManagingClubTab));
