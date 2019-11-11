import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Form, Col, Button } from "react-bootstrap";
import * as actionCreators from "../store/actions/index";

class ClubInfoTab extends Component {
  state = {
    firstLoaded: false,
    name: "",
    summary: "",
    description: "",
    category: 0,
    poster_img: [],
    available_semester: 0,
    available_major: [],
    session_day: 0,
    tags: [],
    recruit_period: null
  };

  componentDidMount = () => {
    this.props.getClubByID(this.props.match.params.club_id);
  };

  componentDidUpdate = () => {
    if (
      this.props.selectedClub &&
      this.props.selectedClub.managers.includes(this.props.loggedUser.id)
    ) {
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
      // this.props.history.push("/club");
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
    let selectedClubName = null;
    let selectedClubSummary = null;
    let selectedClubDescription = null;
    let selectedClubAvailableSemester = null;
    let selectedClubSessionDay = null;

    let categoryOptionList = null;
    let deptOptionList = null;
    let majorOptionList = null;

    if (this.props.selectedClub) {
      selectedClubName = this.props.selectedClub.name;
      selectedClubSummary = this.props.selectedClub.summary;
      selectedClubDescription = this.props.selectedClub.description;
      selectedClubAvailableSemester = this.props.selectedClub
        .available_semester;
      selectedClubSessionDay = this.props.selectedClub.session_day;

      if (this.props.categories) {
        categoryOptionList = this.props.categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ));
      }

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
          <Form.Group controlId="formBasicClubname">
            <Form.Label>동아리 이름</Form.Label>
            <Form.Control
              size="lg"
              onChange={event => {
                this.setState({ name: event.target.value });
              }}
              defaultValue={selectedClubName}
            />
          </Form.Group>
          <Form.Group controlId="formBasicClubsummary">
            <Form.Label>요약</Form.Label>
            <Form.Control
              as="textarea"
              size="lg"
              onChange={event => {
                this.setState({ summary: event.target.value });
              }}
              defaultValue={selectedClubSummary}
            />
          </Form.Group>
          <Form.Group controlId="formBasicClubdesciption">
            <Form.Label>구체적인 동아리 설명</Form.Label>
            <Form.Control
              as="textarea"
              size="lg"
              onChange={event => {
                this.setState({ description: event.target.value });
              }}
              defaultValue={selectedClubDescription}
            />
          </Form.Group>

          <Form.Label>동아리 분류</Form.Label>
          <Form.Control
            as="select"
            size="lg"
            onChange={event => {
              this.setState({ category: event.target.value });
            }}
            value={this.state.category}
          >
            {categoryOptionList}
          </Form.Control>

          <br />
          <h1 align="center">가입 조건</h1>
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
            <Form.Group as={Col} controlId="formavailable_semester">
              <Form.Label>활동 가능 요일</Form.Label>
              <Form.Row>
                {["월", "화", "수", "목", "금", "토", "일"].map((a, i) => {
                  return (
                    <Form.Check
                      key={i}
                      id="signup-sessionday-checkbox"
                      inline
                      type={"checkbox"}
                      label={a}
                      checked={
                        (this.state.available_session_day & (1 << i)) !== 0
                      }
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
              </Form.Row>
            </Form.Group>
          </Form.Row>
        </Form>
        <Button
          style={{ marginTop: "10px" }}
          variant="dark"
          size="lg"
          block
          onClick={this.modifyInfoButtonHandler}
          disabled={this.state.name === ""}
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
    selectedClub: state.user.selectedClub,
    categories: state.category.categories,
    depts: state.dept.depts,
    majors: state.major.majors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getClubByID: id => dispatch(actionCreators.getClubByID(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClubInfoTab));
