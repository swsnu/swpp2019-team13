import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";

import Header from "../components/Header";
import ClubCard from "../components/ClubCard";

class Main extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h1>Main Page</h1>
        <h1>--- Recommend Club ---</h1>
        {/* TODO : List up card form of recommend club */}
        <ClubCard title="club 1" content="hearthstone club" />
        <h1>--- All Club ---</h1>
        <div>
          <button>Category 1</button>
          <button>Category 2</button>
          <button>Category 3</button>
          <button>Category 4</button>
          <button>Category 5</button>
        </div>
        {/* TODO : List up card form of all club categorized by category */}
        <div>
          <button onClick={() => this.props.history.push("/club/create")}>
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
)(withRouter(Main));
