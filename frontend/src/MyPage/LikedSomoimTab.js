import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";
import * as actionCreators from "../store/actions/index";
import { cardFactory, SomoimDetailFactory } from "./MyPageTabFactory";

class LikedSomoimTab extends Component {
  state = { somoimDetailShow: false, selectedSomoimID: null };

  onClickCard = (e, item) => {
    if (e.target.className === "card-body") {
      this.setState({
        ...this.state,
        somoimDetailShow: true,
        selectedSomoimID: item.id
      });
    }
  };

  onCloseDetail = () => {
    this.setState({
      ...this.state,
      somoimDetailShow: false
    });
  };

  render() {
    let list = null;
    if (this.props.likedSomoims) {
      list = this.props.likedSomoims.map((item, idx) => {
        return cardFactory(
          item,
          idx,
          this.onClickCard,
          <Button
            variant="dark"
            id="somoim-unlike-button"
            style={{ height: "100%" }}
            onClick={() => {
              this.props.addLikedSomoim(item, this.props.loggedUser);
            }}
            block
          >
            좋아요 취소
          </Button>
        );
      });
    }
    return SomoimDetailFactory(
      list,
      this.state.somoimDetailShow,
      this.props.somoims.filter(a => a.id === this.state.selectedSomoimID)[0],
      this.onCloseDetail
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.user.loggedUser,
    somoims: state.somoim.somoims,
    likedSomoims: state.user.likedSomoims
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addLikedSomoim: (somoim, user) =>
      dispatch(actionCreators.addLikedSomoim(somoim, user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LikedSomoimTab));
