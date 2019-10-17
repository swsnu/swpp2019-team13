import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";

import Header from "./Header";

import * as actionCreaters from "../store/actions/index";

class ClubRegister extends React.Component {
  state = {
    title: "",
    content: "",
    tag: ""
    // TODO : Implement supporting multiple tag
    // tag: []
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
            tag :
            <input
              type="text"
              id="club-tag-input"
              value={this.state.tag}
              onChange={event => this.setState({ tag: event.target.value })}
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
              disabled={
                this.state.title === "" ||
                this.state.content === "" ||
                this.state.tag === ""
              }
              onClick={() =>
                this.props.postClub(this.state.title, this.state.content, [
                  this.state.tag
                ])
              }
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
  return {
    postClub: (title, content, tag) =>
      dispatch(
        actionCreaters.postClub({
          title: title,
          content: content,
          tag: tag
        })
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClubRegister));
