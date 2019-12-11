import React, { Component } from "react";

import { withRouter } from "react-router";

import "./SomoimTitleSearchBar.css";

class SomoimTitleSearchBar extends Component {
  state = {
    searchKey: ""
  };

  searchHandler = () => {
    if (this.state.searchKey !== "") {
      this.props.history.push("/somoim/title/" + this.state.searchKey);
    }
  };

  handleChange = e => {
    this.setState({
      searchKey: e.target.value
    });
  };

  /* Render */
  render() {
    /* Render */
    return (
      <div className="SomoimTitleSearchBar">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <div id="search-icon">
          <i className="fa fa-search"></i>
        </div>
        <input
          onChange={this.handleChange}
          onKeyPress={e => {
            if (e.key === "Enter") this.searchHandler();
          }}
          placeholder="소모임명을 검색해보세요"
          id="search-bar"
          type="text"
        ></input>
      </div>
    );
  }
}

export default withRouter(SomoimTitleSearchBar);
