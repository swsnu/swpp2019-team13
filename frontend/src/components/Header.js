import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../store/actions/index";

import Login from "../containers/Login";

import "./Header.css";

class Header extends Component {
  state = {
    // isShowing_LoginModal == true : Modal 보여줌.
    isShowing_LoginModal: false
  };

  /* Control Function for Login Modal */
  handleShow_LoginModal = () => {
    this.setState({ ...this.state, isShowing_LoginModal: true });
  };

  handleClose_LoginModal = () => {
    this.setState({ ...this.state, isShowing_LoginModal: false });
  };

  /* Do when click Logout Button */
  onClick_LogoutButton = () => {
    this.props.signOut();
    this.props.history.push("/club");
  };

  /* Render */
  render() {
    /* User 관련 버튼 : 로그인, 회원가입, 마이페이지, 로그아웃 */
    let login_button = null;
    let signup_button = null;
    let mypage_button = null;
    let logout_button = null;

    /* 로그인이 되어있는지에 따라 User 관련 버튼을 설정해준다. */
    if (this.props.loggedUser !== null && this.props.loggedUser !== undefined) {
      login_button = null;
      signup_button = null;
      mypage_button = (
        <div
          className="user-item first-item"
          onClick={() => {
            this.props.history.push("/mypage");
          }}
        >
          마이페이지
        </div>
      );
      logout_button = (
        <div
          className="user-item"
          onClick={() => {
            this.onClick_LogoutButton();
          }}
        >
          로그아웃
        </div>
      );
    } else {
      login_button = (
        <div
          className="user-item first-item"
          onClick={() => {
            this.handleShow_LoginModal();
          }}
        >
          로그인
        </div>
      );
      signup_button = (
        <div
          className="user-item"
          onClick={() => {
            this.props.history.push("/signup");
          }}
        >
          회원가입
        </div>
      );
      mypage_button = null;
      logout_button = null;
    }

    /* Render */
    return (
      <div className="Header">
        {/* Home 로고 */}
        <div
          className="home"
          onClick={() => {
            this.props.history.push("/club");
          }}
        >
          Club4u
        </div>

        {/* 동아리 / 소모임 전환 탭 */}
        <div
          className={`menu-item ${
            this.props.location.pathname === "/club" ? "active" : ""
          }`}
          onClick={() => {
            this.props.history.push("/club");
          }}
        >
          동아리
        </div>
        <div
          className={`menu-item ${
            this.props.location.pathname === "/somoim" ? "active" : ""
          }`}
          onClick={() => {
            this.props.history.push("/somoim");
          }}
        >
          소모임
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
        {login_button}
        {signup_button}
        {mypage_button}
        {logout_button}

        {/* 로그인 Modal */}
        <Login
          show={this.state.isShowing_LoginModal}
          onHide={this.handleClose_LoginModal}
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
    signOut: user => dispatch(actionCreators.signOut(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
