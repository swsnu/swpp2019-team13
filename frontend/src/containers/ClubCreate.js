import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";

import Header from "../components/Header";

class ClubCreate extends React.Component {
  state = {
    title: "",
    content: ""
  };

  render() {
    return (
      <div>
        <Header />
        <h1>Create Club Advertisement</h1>
        <div>
          <div>
            title :
            <input
              type="text"
              id="club-title-input"
              value={this.state.title}
              onChange={event => this.setState({ title: event.target.value })}
            />
          </div>
          <div>
            content :
            <input
              type="text"
              id="club-content-input"
              value={this.state.content}
              onChange={event => this.setState({ content: event.target.value })}
            />
          </div>
          <div>
            <button
              id="back-create-club-button"
              onClick={() => this.props.history.push("/")}
            >
              Back
            </button>
          </div>
          <div>
            <button
              id="confirm-create-club-button"
              disabled={this.state.title === "" || this.state.content === ""}
              onClick={() => {}}
            >
              Confirm
            </button>
          </div>
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
)(withRouter(ClubCreate));
