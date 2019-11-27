import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import SomoimDetail from "../Somoim/SomoimDetail";
import { cardFactory } from "./MyPageTabFactory";

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

  render() {
    let list = null;
    if (this.props.managingSomoims) {
      list = this.props.managingSomoims.map((item, idx) => {
        return cardFactory(item, idx, this.onClickCard);
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
