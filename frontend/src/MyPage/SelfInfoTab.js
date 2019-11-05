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
    available_semester: 1
  };

  componentDidMount = () => {
    this.props.getMajorList();
    this.props.getDeptList();
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
          available_semester: this.props.loggedUser.available_semester
        });
      }
    } else {
      this.props.history.push("/club");
    }
  };

  modifyInfoHandler = () => {};

  render() {
    let loggedUserName = null;
    let loggedUserEmail = null;
    let loggedUserDept = null;
    let loggedUserMajor = null;
    let loggedUserGrade = null;
    let loggedUserAvailableSemester = null;

    let deptOptionList = null;
    let majorOptionList = null;

    if (this.props.loggedUser) {
      loggedUserName = this.props.loggedUser.name;
      loggedUserEmail = this.props.loggedUser.email;
      loggedUserDept = this.props.loggedUser.dept;
      loggedUserMajor = this.props.loggedUser.major;
      loggedUserGrade = this.props.loggedUser.grade;
      loggedUserAvailableSemester = this.props.loggedUser.available_semester;

      if (this.props.depts) {
        deptOptionList = this.props.depts.map(dept => (
          <option key={dept.id} value={dept.id}>
            {dept.name}
          </option>
        ));
      }
      if (this.props.depts && this.props.majors) {
        majorOptionList = this.props.majors
          .filter(major => major.dept_id === this.props.loggedUser.dept)
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
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
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
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
        </Form>

        <Button
          // not implemeted yet
          style={{ marginTop: "10px" }}
          variant="dark"
          size="lg"
          block
          onClick={this.modifyInfoHandler}
          disabled={
            this.state.name === "" ||
            this.state.email === "" ||
            (String(this.state.name) === String(loggedUserName) &&
              String(this.state.email) === String(loggedUserEmail) &&
              String(this.state.dept) === String(loggedUserDept) &&
              String(this.state.major) === String(loggedUserMajor) &&
              String(this.state.grade) === String(loggedUserGrade) &&
              String(this.state.available_semester) ===
                String(loggedUserAvailableSemester))
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
