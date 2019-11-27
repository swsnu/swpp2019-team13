import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { cardFactory, SomoimDetailFactory } from "./MyPageTabFactory";

class ManagingSomoimTab extends Component {
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
    if (this.props.managingSomoims) {
      list = this.props.managingSomoims.map((item, idx) => {
        return cardFactory(item, idx, this.onClickCard);
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
    somoims: state.somoim.somoims,
    managingSomoims: state.user.managingSomoims
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ManagingSomoimTab));
