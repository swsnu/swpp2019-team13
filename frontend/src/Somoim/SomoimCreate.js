import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../store/actions/index";

import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import NumericInput from "react-numeric-input";

import "./SomoimCreate.css";

class SomoimCreate extends React.Component {
  state = {
    title: "",
    summary: "",
    description: "",
    category: 1,
    goal_number: 1,
    available_major: [],
    available_semester: 1,
    session_day: 0,
    current_dept: "",
    current_major: ""
  };

  handle_SelectAllMajor() {
    let majorList = [];
    if (this.props.majors) {
      majorList = this.props.majors.map(a => a.id);
    }
    this.setState({ ...this.state, available_major: majorList });
  }

  handle_RemoveAllMajor() {
    this.setState({ ...this.state, available_major: [] });
  }

  handle_SelectSpecificMajor(major) {
    let majorList = [];
    if (this.props.majors) {
      let newMajor = this.props.majors.filter(a => a.name === major)[0].id;
      if (this.state.available_major.includes(newMajor)) {
        return;
      } else {
        majorList = this.state.available_major.concat(newMajor);
        this.setState({ ...this.state, available_major: majorList });
      }
    }
  }

  handle_RemoveSpecificMajor(major_id) {
    let majorList = this.state.available_major.filter(a => a !== major_id);

    this.setState({ ...this.state, available_major: majorList });
  }

  componentDidMount() {
    this.props.getDeptList();
    this.props.getMajorList();
  }

  // componentWillReceiveProps renamed into below name
  UNSAFE_componentWillReceiveProps() {
    this.setState({
      title: "",
      summary: "",
      description: "",
      category: 1,
      goal_number: 1,
      available_major: [],
      available_semester: 1,
      session_day: 0,
      current_dept: "",
      current_major: ""
    });
  }

  render() {
    /* deptOptionList */
    // ㄴ Redux 에서 depts를 받아와서, option list를 만들어줍니다.
    let deptOptionList = null;
    if (this.props.depts) {
      deptOptionList = this.props.depts.map(dept => (
        <option key={dept.id}>{dept.name}</option>
      ));
    }

    /* majorOptionList */
    // ㄴ Redux 에서 선택한 dept에 따른 majorList를 받아와서, option list를 만들어줍니다.
    let selectedDeptID = null;
    if (this.props.depts) {
      const selectedDept = this.props.depts.filter(dept => {
        return dept.name === this.state.current_dept;
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

    let categoryList = [];
    if (this.props.categories) categoryList = this.props.categories;

    return (
      <div className="SomoimCreate">
        {/* CSS for React-Bootstrap */}
        <style type="text/css">
          {`
              .btn-dark {
                  border: 2px solid #a456d8;
                  font-weight: bold;
                  background-color: #a456d8;
                  font-size: 1.4em;
              }
          `}
        </style>
        <Modal
          style={{ opacity: 1 }}
          show={this.props.show}
          onHide={this.props.closeHandler}
          size="lg"
        >
          <Modal.Header>
            <Modal.Title>
              <h2 className="somoimCreateTitle">새로운 소모임 만들기</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>
                  <h3>제목</h3>
                </Form.Label>
                <Form.Control
                  size="lg"
                  id="somoim-title-input"
                  placeholder="소모임 이름을 입력하세요."
                  value={this.state.title}
                  onChange={event =>
                    this.setState({ title: event.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  <h3>분야</h3>
                </Form.Label>
                <Form.Control
                  as="select"
                  id="somoim-category-input"
                  size="lg"
                  onChange={event =>
                    this.setState({
                      category: categoryList.filter(
                        a => a.name === event.target.value
                      )[0].id
                    })
                  }
                >
                  {categoryList.map(a => {
                    return (
                      <option key={a.id} value={a.name}>
                        {a.name}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  <h3>소모임에 대한 한 줄 요약</h3>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows="2"
                  size="lg"
                  id="somoim-summary-input"
                  value={this.state.summary}
                  onChange={event =>
                    this.setState({ summary: event.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  <h3>소모임에 대한 구체적인 설명</h3>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows="7"
                  size="lg"
                  id="somoim-description-input"
                  value={this.state.description}
                  onChange={event =>
                    this.setState({ description: event.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  <h3>가능 학과 추가</h3>
                  <h5>
                    아래의 단과대학/학과를 선택하고 추가버튼을 클릭하세요.
                  </h5>
                </Form.Label>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>단과 대학</Form.Label>
                    <Form.Control
                      as="select"
                      size="lg"
                      id="somoimcreate-dept-input"
                      onChange={event => {
                        this.setState({ current_dept: event.target.value });
                      }}
                    >
                      <option></option>
                      {deptOptionList}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>학과</Form.Label>
                    <Form.Control
                      as="select"
                      size="lg"
                      id="somoimcreate-major-input"
                      onChange={event => {
                        this.setState({ current_major: event.target.value });
                      }}
                    >
                      <option></option>
                      {majorOptionList}
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Button
                      id="somoimcreate-addmajor-button"
                      variant="secondary"
                      onClick={() =>
                        this.handle_SelectSpecificMajor(
                          this.state.current_major
                        )
                      }
                      disabled={
                        this.state.current_dept === "" ||
                        this.state.current_major === ""
                      }
                      block
                    >
                      추가
                    </Button>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Button
                      id="somoimcreate-addallmajor-button"
                      variant="secondary"
                      block
                      onClick={() => this.handle_SelectAllMajor()}
                    >
                      전체 추가
                    </Button>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Button
                      id="somoimcreate-removeallmajor-button"
                      variant="secondary"
                      block
                      onClick={() => this.handle_RemoveAllMajor()}
                    >
                      전체 삭제
                    </Button>
                  </Form.Group>
                </Form.Row>
                <div
                  style={{
                    display: "flex",
                    overflowX: "scroll"
                  }}
                >
                  {this.state.available_major.map(major_id => (
                    <Button
                      key={major_id}
                      variant="outline-secondary"
                      id="somoimcreate-removemajor-button"
                      onClick={() => this.handle_RemoveSpecificMajor(major_id)}
                    >
                      {this.props.majors.filter(
                        major => major.id === major_id
                      )[0].name + " X"}
                    </Button>
                  ))}
                </div>
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>
                      <h3 style={{ marginRight: "20px" }}>활동 요일</h3>
                    </Form.Label>
                    {["월", "화", "수", "목", "금", "토", "일"].map((a, i) => {
                      return (
                        <Form.Check
                          key={i}
                          id="somoim-sessionday-checkbox"
                          inline
                          type={"checkbox"}
                          label={a}
                          checked={(this.state.session_day & (1 << i)) !== 0}
                          value={i}
                          onChange={event => {
                            this.setState({
                              session_day: this.state.session_day ^ (1 << i)
                            });
                          }}
                        />
                      );
                    })}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>
                      <h3 style={{ marginRight: "20px" }}>목표 인원 수</h3>
                    </Form.Label>
                    <NumericInput
                      id="somoim-goalnumber-input"
                      min={1}
                      max={100}
                      value={this.state.goal_number}
                      onChange={event => {
                        if (event < 1) this.setState({ goal_number: 1 });
                        else if (event > 100)
                          this.setState({ goal_number: 100 });
                        else this.setState({ goal_number: event });
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>
                  <h3>최소 활동 학기 수</h3>
                </Form.Label>
                <Form.Control
                  id="somoim-available-semester-input"
                  as="select"
                  onChange={event =>
                    this.setState({
                      available_semester: Number(event.target.value)
                    })
                  }
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(a => {
                    return (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              <Button
                id="confirm-create-somoim-button"
                variant="dark"
                block
                onClick={() => {
                  this.props.postSomoim(
                    this.state.title,
                    this.state.summary,
                    this.state.description,
                    this.state.category,
                    this.state.goal_number,
                    this.state.available_major,
                    this.state.available_semester,
                    this.state.session_day,
                    this.props.loggedUser
                  );
                  alert("Create Somoim Success!");
                  this.props.closeHandler();
                }}
                disabled={
                  this.state.title === "" ||
                  this.state.summary === "" ||
                  this.state.description === ""
                }
              >
                소모임 추가
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.user.loggedUser,
    somoim: state.somoim.somoims,
    depts: state.dept.depts,
    majors: state.major.majors,
    categories: state.category.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDeptList: () => dispatch(actionCreators.getDeptList()),
    getMajorList: () => dispatch(actionCreators.getMajorList()),
    postSomoim: (
      title,
      summary,
      description,
      category,
      goal_number,
      available_major,
      available_semester,
      session_day,
      user
    ) =>
      dispatch(
        actionCreators.postSomoim({
          title: title,
          summary: summary,
          category: category,
          description: description,
          goalJoiner: goal_number,
          available_major: available_major,
          available_semester: available_semester,
          session_day: session_day
        })
      ).then(new_somoim => {
        dispatch(actionCreators.addManagingSomoim(new_somoim, user));
      })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SomoimCreate));
