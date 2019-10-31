import React from "react";
import { Button, Form, Col } from "react-bootstrap";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../store/actions/index";

import Header from "../components/Header";

class SignUp extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordAgain: "",
    dept: "",
    major: "",
    grade: 1,
    availableSemester: 1
  };

  /* 회원가입 버튼을 클릭했을 때 동작 */
  onClick_SignupButton_Handler = () => {
    let deptID = -1;
    if (this.props.depts) {
      const dept = this.props.depts.filter(dept => {
        return dept.name === this.state.dept;
      });
      if (dept.length !== 0) deptID = dept[0].id;
    }

    let majorID = -1;
    if (this.props.majors) {
      const major = this.props.majors.filter(major => {
        return major.dept_id === deptID && major.name === this.state.major;
      });
      if (major.length !== 0) majorID = major[0].id;
    }

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      dept: deptID,
      major: majorID,
      grade: this.state.grade,
      availableSemester: this.state.availableSemester
    };
    this.props.signUp(newUser);
    alert("어서 오시게나");
    this.props.signIn(newUser);
    this.props.history.push("/club");
  };

  /* Render */
  render() {
    /* deptOptionList */
    // ㄴ Redux 에서 deptNames를 받아와서, option list를 만들어줍니다.
    let deptOptionList = null;
    if (this.props.depts) {
      deptOptionList = this.props.depts.map(dept => (
        <option key={dept.id}>{dept.name}</option>
      ));
    }

    /* majorOptionList */
    // ㄴ Redux 에서 선택한 deptname에 따른 majorList를 받아와서, option list를 만들어줍니다.
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
      majorOptionList = selectedMajorList.map(major => (
        <option key={major.id}>{major.name}</option>
      ));
    }

    return (
      <div className="SignUp">
        <Header />
        <p style={{ textAlign: "center" }}>어서 오시게나</p>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "2em",
            fontWeight: "bold"
          }}
        >
          회원 가입
        </h1>
        <div style={{ width: "40%", position: "relative", left: "30%" }}>
          {/* 유저 정보를 입력받는다 */}
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
              />
            </Form.Group>
            <Form.Row>
              {/* 비밀번호 입력 칸 */}
              <Form.Group as={Col} controlId="formBasicPassword">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control
                  size="lg"
                  type="password"
                  onChange={event => {
                    this.setState({ password: event.target.value });
                  }}
                />
              </Form.Group>
              {/* 비밀번호 확인 입력 칸 */}
              <Form.Group as={Col} controlId="formBasicPasswordAgain">
                <Form.Label>비밀번호 확인</Form.Label>
                <Form.Control
                  size="lg"
                  type="password"
                  onChange={event => {
                    this.setState({ passwordAgain: event.target.value });
                  }}
                />
              </Form.Group>
            </Form.Row>

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
                  <option></option>
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
                  <option></option>
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
          <div style={{ marginTop: "5%" }}>
            <Button
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
              회원 가입
            </Button>
          </div>
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
  return {
    signUp: user => dispatch(actionCreators.signUp(user)),
    signIn: user => dispatch(actionCreators.signIn(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignUp));
