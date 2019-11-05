import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Form, Col, Button } from "react-bootstrap";
import * as actionCreators from "../store/actions/index";

class SelfInfoTab extends Component {
  state = {
    email: "",
    name: "",
    password: "",
    passwordAgain: "",
    dept: "",
    major: "",
    grade: 1,
    available_semester: 1
  };

  componentDidMount = () => {
    this.props.getMajorList();
    this.props.getDeptList();
    if (this.props.loggedUser) {
      this.setState({
        ...this.state,
        name: this.props.loggedUser.name,
        email: this.props.email
      });
    }
  };

  componentDidUpdate = () => {
    if (!this.props.loggedUser) {
      this.props.history.push("/club");
    }
  };

  render() {
    let loggedUserName = null;
    let loggedUserEmail = null;
    let loggedUserDeptID = null;
    let loggedUserMajorID = null;
    let loggedUserGrade = null;
    let loggedUserAvailableSemester = null;
    let deptOptionList = null;
    let majorOptionList = null;

    if (this.props.loggedUser) {
      loggedUserName = this.props.loggedUser.name;
      loggedUserEmail = this.props.loggedUser.email;
      loggedUserDeptID = this.props.loggedUser.dept;
      loggedUserMajorID = this.props.loggedUser.major;
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
                defaultValue={loggedUserDeptID}
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
                defaultValue={loggedUserMajorID}
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
                defaultValue={loggedUserGrade}
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
                defaultValue={loggedUserAvailableSemester}
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
          onClick={this.onClick_SignupButton_Handler}
          disabled={true}
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
