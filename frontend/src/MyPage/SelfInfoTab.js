import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
// import { Container, Row, Col, Button, Card, Accordion } from "react-bootstrap";

class SelfInfoTab extends Component {
  render() {
    let loggedUserName = null;
    let loggedUserEmail = null;
    let loggedUserPassword = null;
    let loggedUserDeptID = null;
    let loggedUserDeptName = null;
    let loggedUserMajorID = null;
    let loggedUserMajorName = null;
    let loggedUserGrade = null;
    let loggedUserAvailableSemester = null;

    /* 로그인된 user는 this.props.loggedUser에 저장되어 있습니다. */
    // ㄴ Store 중 user Store에, loggedUser 라는 이름으로 저장되어 있는 것을 가져오게 됩니다.
    // ㄴ 로그인 되어 있지 않은 경우, null 이 저장되어 있습니다.
    if (this.props.loggedUser) {
      loggedUserName = this.props.loggedUser.username;
      loggedUserEmail = this.props.loggedUser.email;
      loggedUserPassword = this.props.loggedUser.password;
      loggedUserDeptID = this.props.loggedUser.dept;
      loggedUserMajorID = this.props.loggedUser.major;
      loggedUserGrade = this.props.loggedUser.grade;
      loggedUserAvailableSemester = this.props.loggedUser.availableSemester;

      // this.props.loggedUser.dept에는 ID가 저장되어 있으므로, 다음과 같이 단과대 명을 불러올 수 있습니다 */
      if (this.props.depts) {
        loggedUserDeptName = this.props.depts[loggedUserDeptID].name;
        // const selectedDept = this.props.depts.filter(dept => {
        //   return dept.id === loggedUserDeptID;
        // });
        // if (selectedDept.length !== 0)
        //   loggedUserDeptName = selectedDept[0].name;
      }

      // this.props.loggedUser.major에는 ID가 저장되어 있으므로, 다음과 같이 전공 명을 불러올 수 있습니다 */
      if (this.props.majors) {
        loggedUserMajorName = this.props.majors[loggedUserMajorID].name;
        // const selectedMajor = this.props.majors.filter(major => {
        //   return major.id === loggedUserMajorID;
        // });
        // if (selectedMajor.length !== 0)
        //   loggedUserMajorName = selectedMajor[0].name;
      }
    }

    return (
      <div>
        <p style={{ textAlign: "center" }}>
          어서 오시게나. 아래는 당신의 정보일세.
        </p>
        <div style={{ textAlign: "center" }}>
          <p>유저 이름 : {loggedUserName}</p>
          <p>이메일 : {loggedUserEmail}</p>
          <p>비밀번호 : {loggedUserPassword}</p>
          <p>소속 단과대 : {loggedUserDeptName}</p>
          <p>전공 : {loggedUserMajorName}</p>
          <p>학년 : {loggedUserGrade}학년</p>
          <p>활동 가능 학기 수 : {loggedUserAvailableSemester}학기</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    depts: state.deptname.deptnames,
    majors: state.major.majors
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SelfInfoTab));
