import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";
import SomoimDetail from "../Somoim/SomoimDetail";
import * as actionCreators from "../store/actions/index";
import { cardFactory } from "./MyPageTabFactory";

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

  render() {
    let list = null;
    if (this.props.likedSomoims) {
      list = this.props.likedSomoims.map((item, idx) => {
        return cardFactory(
          item,
          idx,
          this.onClickCard,
          <Button
            id="somoim-unlike-button"
            onClick={() => {
              this.props.addLikedSomoim(item, this.props.loggedUser);
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
        <SomoimDetail
          show={this.state.somoimDetailShow}
          somoim={
            this.props.somoims.filter(
              a => a.id === this.state.selectedSomoimID
            )[0]
          }
          closeHandler={() => {
            this.setState({
              ...this.state,
              somoimDetailShow: false
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
