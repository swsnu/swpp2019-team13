import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";

import Header from "../components/Header";

class MyPage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h1>My Page</h1>
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
