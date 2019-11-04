import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Form, Col, Button } from "react-bootstrap";
import * as actionCreators from "../store/actions/index";

class SelfInfoTab extends Component {
  state = {};

  componentDidMount() {
    this.props.getMajorList();
    this.props.getDeptList();
  }

  render() {
    let loggedUserName = null;
    let loggedUserEmail = null;
    let loggedUserPassword = null;
    let loggedUserDeptID = null;
    let loggedUserDept = null;
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
        loggedUserDept = this.props.depts[loggedUserDeptID].name;
        // const selectedDept = this.props.depts.filter(dept => {
        //   return dept.id === loggedUserDeptID;
        // });
        // if (selectedDept.length !== 0)
        //   loggedUserDept = selectedDept[0].name;
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

    let deptOptionList = null;
    if (this.props.depts) {
      deptOptionList = this.props.depts.map(dept => {
        if (dept.name === loggedUserDept)
          return (
            <option key={dept.id} selected>
              {dept.name}
            </option>
          );
        else return <option key={dept.id}>{dept.name}</option>;
      });
    }

    let selectedDeptID = null;
    if (this.props.depts) {
      const selectedDept = this.props.depts.filter(dept => {
        return dept.name === this.state.dept;
      });
      if (selectedDept.length !== 0) selectedDeptID = selectedDept[0].id;
    }
    let majorOptionList = null;
    if (this.props.majors) {
      const selectedMajorList = this.props.majors.filter(major => {
        return major.dept_id === selectedDeptID;
      });
      majorOptionList = selectedMajorList.map(major => {
        if (major.name === loggedUserMajorName)
          return (
            <option key={major.id} selected>
              {major.name}
            </option>
          );
        else return <option key={major.id}>{major.name}</option>;
      });
    }

    return (
      <div>
        {/* <p style={{ textAlign: "center" }}>
          어서 오시게나. 아래는 당신의 정보일세.
        </p>
        <div style={{ textAlign: "center" }}>
          <p>유저 이름 : {loggedUserName}</p>
          <p>이메일 : {loggedUserEmail}</p>
          <p>비밀번호 : {loggedUserPassword}</p>
          <p>소속 단과대 : {loggedUserDept}</p>
          <p>전공 : {loggedUserMajorName}</p>
          <p>학년 : {loggedUserGrade}학년</p>
          <p>활동 가능 학기 수 : {loggedUserAvailableSemester}학기</p>
        </div> */}
        <Form>
          {/* 유저 이름 입력 칸 */}
          <Form.Group controlId="formBasicUsername">
            <Form.Label>유저 이름</Form.Label>
            <Form.Control
              size="lg"
              type="email"
              onChange={event => {
                this.setState({ username: event.target.value });
              }}
              defaultValue={loggedUserName}
            />
          </Form.Group>
          {/* 이메일 입력 칸 */}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              size="lg"
              onChange={event => {
                this.setState({ email: event.target.value });
              }}
              defaultValue={loggedUserEmail}
            />
          </Form.Group>

          {/* 소속 단과대, 전공 입력 칸*/}
          <Form.Row>
            <Form.Group as={Col} controlId="formDept">
              {/* 단과대 입력 칸 */}
              <Form.Label>단과 대학</Form.Label>
              <Form.Control
                as="select"
                size="lg"
                onChange={event => {
                  this.setState({ dept: event.target.value });
                }}
              >
                {deptOptionList}
              </Form.Control>
            </Form.Group>

            {/* 전공 입력 칸 */}
            <Form.Group as={Col} controlId="formMajor">
              <Form.Label>학과</Form.Label>
              <Form.Control
                as="select"
                size="lg"
                onChange={event => {
                  this.setState({ major: event.target.value });
                }}
              >
                {majorOptionList}
              </Form.Control>
            </Form.Group>
          </Form.Row>

          {/* 학년 및 활동 가능 학기 수 입력 칸*/}
          <Form.Row>
            <Form.Group as={Col} controlId="formGrade">
              {/* 학년 입력 칸*/}
              <Form.Label>학년</Form.Label>
              <Form.Control
                as="select"
                size="lg"
                onChange={event => {
                  this.setState({ grade: event.target.value });
                }}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formAvailableSemester">
              {/* 활동 가능 학기 수 입력 칸*/}
              <Form.Label>활동 가능 학기 수</Form.Label>
              <Form.Control
                as="select"
                size="lg"
                onChange={event => {
                  this.setState({ availableSemester: event.target.value });
                }}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
        </Form>
        <Button
          style={{ marginTop: "10px" }}
          variant="dark"
          size="lg"
          block
          onClick={this.onClick_SignupButton_Handler}
          /* 조건을 충족시켜야 회원가입 버튼을 클릭할 수 있다 */
          // ㄴ 모든 칸이 입력되어야 합니다.
          // ㄴ 비밀번호와, 비밀번호 확인이 같아야 합니다.
          disabled={
            this.state.username === "" ||
            this.state.email === "" ||
            this.state.password === "" ||
            this.state.password !== this.state.passwordAgain ||
            this.state.dept === "" ||
            this.state.major === ""
          }
        >
          정보 수정
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.user.loggedUser,
    depts: state.dept.depts,
    majors: state.major.majors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMajorList: () => dispatch(actionCreators.getMajorList()),
    getDeptList: () => dispatch(actionCreators.getDeptList())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SelfInfoTab));
