import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";

import Header from "../components/Header";

class MyPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1 style={{ textAlign: "center" }}>#My Page#</h1>
        <p style={{ textAlign: "center" }}>어서 오시게나.</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MyPage));
