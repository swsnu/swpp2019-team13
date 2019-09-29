import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";

import Header from "../components/Header";

class Board extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h1>Board</h1>
        <h1>---- Article List ----</h1>
        <div>
          <button>Category 1</button>
          <button>Category 2</button>
          <button>Category 3</button>
          <button>Category 4</button>
          <button>Category 5</button>
        </div>
        <h1>----------------------</h1>
        <div>
          <button onClick={() => this.props.history.push("/article/create")}>
            +
          </button>
        </div>
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
)(withRouter(Board));
