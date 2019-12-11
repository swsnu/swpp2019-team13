import React, { Component } from "react";

import { withRouter } from "react-router";

import "./ClubTitleSearchBar.css";

class ClubTitleSearchBar extends Component {
  state = {
    searchKey: ""
  };

  handleChange = e => {
    this.setState({
      searchKey: e.target.value
    });
  };

  searchHandler = () => {
    if (this.state.searchKey !== "") {
      this.props.history.push("/club/title/" + this.state.searchKey);
    }
  };

  /* Render */
  render() {
    /* Render */
    return (
      <div className="ClubTitleSearchBar">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <div id="search-icon">
          <i className="fa fa-search"></i>
        </div>
        <input
          id="search-bar"
          type="text"
          placeholder="동아리명을 검색해보세요"
          onChange={this.handleChange}
          onKeyPress={e => {
            if (e.key === "Enter") this.searchHandler();
          }}
        ></input>
      </div>
    );
  }
}

export default withRouter(ClubTitleSearchBar);
