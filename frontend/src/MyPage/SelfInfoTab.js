import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Form, Col, Button } from "react-bootstrap";
import * as actionCreators from "../store/actions/index";

class SelfInfoTab extends Component {
  state = {
    firstLoaded: false,
    email: "",
    name: "",
    password: "",
    passwordAgain: "",
    dept: 0,
    major: 0,
    grade: 1,
    available_semester: 1,
    available_session_day: 0
  };

  componentDidUpdate = () => {
    if (this.props.loggedUser) {
      if (!this.state.firstLoaded) {
        this.setState({
          ...this.state,
          firstLoaded: true,
          name: this.props.loggedUser.name,
          email: this.props.loggedUser.email,
          dept: this.props.loggedUser.dept,
          major: this.props.loggedUser.major,
          grade: this.props.loggedUser.grade,
          available_semester: this.props.loggedUser.available_semester,
          available_session_day: this.props.loggedUser.available_session_day
        });
      }
    } else {
      this.props.history.push("/club");
    }
  };

  modifyInfoButtonHandler = () => {
    this.props.onPutUserInformation({
      name: this.state.name,
      dept: this.state.dept,
      major: this.state.major,
      grade: this.state.grade,
      available_semester: this.state.available_semester,
      available_session_day: this.state.available_session_day
    });
  };

  render() {
    let loggedUserName = null;
    let loggedUserEmail = null;
    let loggedUserDept = null;
    let loggedUserMajor = null;
    let loggedUserGrade = null;
    let loggedUserAvailableSemester = null;
    let loggedUserAvailableSessionDay = null;

    let deptOptionList = null;
    let majorOptionList = null;

    if (this.props.loggedUser) {
      loggedUserName = this.props.loggedUser.name;
      loggedUserEmail = this.props.loggedUser.email;
      loggedUserDept = this.props.loggedUser.dept;
      loggedUserMajor = this.props.loggedUser.major;
      loggedUserGrade = this.props.loggedUser.grade;
      loggedUserAvailableSemester = this.props.loggedUser.available_semester;
      loggedUserAvailableSessionDay = this.props.loggedUser
        .available_session_day;

      if (this.props.depts) {
        deptOptionList = this.props.depts.map(dept => (
          <option key={dept.id} value={dept.id}>
            {dept.name}
          </option>
        ));
      }
      if (this.props.depts && this.props.majors) {
        majorOptionList = this.props.majors
          .filter(major => String(major.dept_id) === String(this.state.dept))
          .map(major => (
            <option key={major.id} value={major.id}>
              {major.name}
            </option>
          ));
      }
    }

    return (
      <div>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              size="lg"
              readOnly
              defaultValue={loggedUserEmail}
              disabled={true}
            />
          </Form.Group>

          <Form.Group controlId="formBasicUsername">
            <Form.Label>유저 이름</Form.Label>
            <Form.Control
              size="lg"
              type="email"
              onChange={event => {
                this.setState({ name: event.target.value });
              }}
              defaultValue={loggedUserName}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formDept">
              <Form.Label>단과 대학</Form.Label>
              <Form.Control
                as="select"
                size="lg"
                onChange={event => {
                  this.setState({ dept: event.target.value });
                }}
                value={this.state.dept}
              >
                {deptOptionList}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formMajor">
              <Form.Label>학과</Form.Label>
              <Form.Control
                as="select"
                size="lg"
                onChange={event => {
                  this.setState({ major: event.target.value });
                }}
                value={this.state.major}
              >
                {majorOptionList}
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGrade">
              <Form.Label>학년</Form.Label>
              <Form.Control
                as="select"
                size="lg"
                onChange={event => {
                  this.setState({ grade: event.target.value });
                }}
                value={this.state.grade}
              >
                {[1, 2, 3, 4, 5, 6].map(a => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formavailable_semester">
              <Form.Label>활동 가능 학기 수</Form.Label>
              <Form.Control
                as="select"
                size="lg"
                onChange={event => {
                  this.setState({ available_semester: event.target.value });
                }}
                value={this.state.available_semester}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(a => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Label>활동 가능 요일</Form.Label>
          </Form.Row>
          {["월", "화", "수", "목", "금", "토", "일"].map((a, i) => {
            return (
              <Form.Check
                key={i}
                id="mypage-sessionday-checkbox"
                inline
                type={"checkbox"}
                label={a}
                checked={(this.state.available_session_day & (1 << i)) !== 0}
                value={i}
                onChange={event => {
                  this.setState({
                    available_session_day:
                      this.state.available_session_day ^ (1 << i)
                  });
                }}
              />
            );
          })}
        </Form>

        <Button
          className="edit-info-button"
          style={{ marginTop: "10px" }}
          variant="dark"
          size="lg"
          block
          onClick={this.modifyInfoButtonHandler}
          disabled={
            this.state.name === "" ||
            this.state.email === "" ||
            (String(this.state.name) === String(loggedUserName) &&
              String(this.state.dept) === String(loggedUserDept) &&
              String(this.state.major) === String(loggedUserMajor) &&
              String(this.state.grade) === String(loggedUserGrade) &&
              String(this.state.available_semester) ===
                String(loggedUserAvailableSemester) &&
              String(this.state.available_session_day) ===
                String(loggedUserAvailableSessionDay))
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
    onPutUserInformation: userInfo =>
      dispatch(actionCreators.putUserInformation(userInfo))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SelfInfoTab));
