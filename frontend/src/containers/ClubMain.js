import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";

import Header from "../components/Header";
import ClubCard from "../components/ClubCard";

import * as actionCreaters from "../store/actions/index";
import ClubRegister from "../components/ClubRegister";

class ClubMain extends React.Component {
  state = {
    showClubRegisterModal: false
  };

  render() {
    return (
      <div>
        <Header />
        <h1>Main Page</h1>
        <h1>--- Recommend Club ---</h1>
        {/* TODO : List up card form of recommend club */}
        {this.props.clubs.map((c, i) => {
          return <ClubCard key={i} title={c.title} content={c.content} />;
        })}
        <h1>--- All Club ---</h1>
        <div>
          <button>Category 1</button>
          <button>Category 2</button>
          <button>Category 3</button>
          <button>Category 4</button>
          <button>Category 5</button>
          <button>Category 6</button>
          <button>Category 7</button>
        </div>
        {/* TODO : List up card form of all club categorized by category */}
        {this.props.clubs.map((c, i) => {
          return <ClubCard key={i} title={c.title} content={c.content} />;
        })}
        {/* TODO : change showClubRegisterModal with state and toggle with link */}
        <ClubRegister
          showClubRegisterModal={this.state.showClubRegisterModal}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    clubs: state.club.clubs
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClubMain));
