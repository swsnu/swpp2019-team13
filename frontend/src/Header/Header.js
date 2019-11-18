import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../store/actions/index";

import Login from "./Login";

import "./Header.css";

class Header extends Component {
  state = {
    // showLoginModal === true : Modal 보여줌.
    showLoginModal: false
  };

  /* Control Function for Login Modal */
  loginModalShowHandler = () => {
    this.setState({ ...this.state, showLoginModal: true });
  };

  loginModalCloseHandler = () => {
    this.setState({ ...this.state, showLoginModal: false });
  };

  /* Do when click Logout Button */
  logoutButtonHandler = () => {
    this.props.signOut();
  };

  componentDidMount() {
    this.props.getLoginInfo();
  }

  /* Render */
  render() {
    /* User 관련 버튼 : 로그인, 회원가입, 마이페이지, 로그아웃 */
    let loginButton = null;
    let signupButton = null;
    let mypageButton = null;
    let logoutButton = null;

    /* 로그인이 되어있는지에 따라 User 관련 버튼을 설정해준다. */
    if (this.props.loggedUser !== null && this.props.loggedUser !== undefined) {
      loginButton = null;
      signupButton = null;
      mypageButton = (
        <div
          className="user-item first-item"
          onClick={() => {
            this.props.history.push("/mypage");
          }}
        >
          마이페이지
        </div>
      );
      logoutButton = (
        <div
          className="user-item second-item"
          onClick={() => {
            this.logoutButtonHandler();
          }}
        >
          로그아웃
        </div>
      );
    } else {
      loginButton = (
        <div
          className="user-item first-item"
          onClick={() => {
            this.loginModalShowHandler();
          }}
        >
          로그인
        </div>
      );
      signupButton = (
        <div
          className="user-item second-item"
          onClick={() => {
            this.props.history.push("/signup");
          }}
        >
          회원가입
        </div>
      );
      mypageButton = null;
      logoutButton = null;
    }

    /* Render */
    return (
      <div className="Header">
        <div className="Header-flex-container">
          {/* Home 로고 */}
          <div
            className="logo"
            onClick={() => {
              this.props.history.push("/club");
            }}
          >
            Club4u
          </div>

          {/* 동아리 / 소모임 전환 탭 */}
          <div className="nav">
            <div
              className={`nav-item ${
                this.props.location.pathname === "/club" ? "active" : ""
              }`}
              onClick={() => {
                this.props.history.push("/club");
              }}
            >
              동아리
            </div>
            <div
              className={`nav-item ${
                this.props.location.pathname === "/somoim" ? "active" : ""
              }`}
              onClick={() => {
                this.props.history.push("/somoim");
              }}
            >
              소모임
            </div>
          </div>

          {/* 검색 바 - 제거 됨 */}
          {/* <div className="search">
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
        </div> */}

          {/* 유저 관련 버튼 */}
          <div className="user">
            {loginButton}
            {signupButton}
            {mypageButton}
            {logoutButton}
          </div>
        </div>

        {/* 로그인 Modal */}
        <Login
          show={this.state.showLoginModal}
          onHide={this.loginModalCloseHandler}
        ></Login>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.user.loggedUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLoginInfo: () => dispatch(actionCreators.getLoginInfo()),
    signOut: user => dispatch(actionCreators.signOut(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
