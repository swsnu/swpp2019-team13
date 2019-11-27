import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import ClubDetail from "../Club/ClubDetail";
import { cardFactory } from "./MyPageTabFactory";

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

  render() {
    let list = null;
    if (this.props.appliedClubs) {
      list = this.props.appliedClubs.map((item, idx) => {
        return cardFactory(item, idx, this.onClickCard);
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
