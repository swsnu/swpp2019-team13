import React, { Component } from "react";

// import { connect } from "react-redux";
import { withRouter } from "react-router";

import "./Header.css";

class Header extends Component {
  state = {
    isLoggedIn: false,
    currUserID: 0,
    currUsername: "team13"
  };

  render() {
    let login_button = null;
    let signup_button = null;
    let mypage_button = null;
    let logout_button = null;

    if (this.state.isLoggedIn) {
      login_button = null;
      signup_button = null;
      mypage_button = <div className="user-item">마이페이지</div>;
      logout_button = <div className="user-item">로그아웃</div>;
    } else {
      login_button = <div className="user-item">로그인</div>;
      signup_button = <div className="user-item">회원가입</div>;
      let mypage_button = null;
      let logout_button = null;
    }

    return (
      <div className="Header">
        <div className="home">Club4u</div>
        <div
          className={`menu-item ${
            this.props.location.pathname == "/club" ? "active" : ""
          }`}
          onClick={() => {
            this.props.history.push("/club");
          }}
        >
          동아리
        </div>
        <div
          className={`menu-item ${
            this.props.location.pathname == "/somoim" ? "active" : ""
          }`}
          onClick={() => {
            this.props.history.push("/somoim");
          }}
        >
          소모임
        </div>
        <div className="search">
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          ></link>
          <input
            id="search-bar"
            type="text"
            placeholder=" 동아리나 소모임을 검색해보세요"
          ></input>
          <button id="search-button" type="submit">
            <i className="fa fa-search"></i>
          </button>
        </div>
        {login_button}
        {signup_button}
        {mypage_button}
        {logout_button}
      </div>
    );
  }
}

export default withRouter(Header);
