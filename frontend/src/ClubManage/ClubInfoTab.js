import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Form, Col, Button } from "react-bootstrap";
import * as actionCreators from "../store/actions/index";
import DatePicker from "react-datepicker";
import {
  maxSelectFile,
  checkMimeType,
  checkFileSize
} from "../utils/CheckUploadedFile";

import "react-datepicker/dist/react-datepicker.css";

class ClubInfoTab extends Component {
  state = {
    firstLoaded: false,
    isShow: false,
    name: "",
    summary: "",
    description: "",
    category: 0,
    poster_img: [],
    available_semester: 0,
    available_major: [],
    session_day: 0,
    tags: [],
    recruit_start_day: null,
    recruit_end_day: null,
    current_dept: "",
    current_major: ""
  };

  componentDidMount = () => {
    this.props.getClubByID(this.props.match.params.club_id);
  };

  componentDidUpdate = () => {
    if (
      this.props.selectedClub &&
      this.props.selectedClub.managers[0].id === this.props.loggedUser.id
    ) {
      if (!this.state.firstLoaded) {
        this.setState({
          ...this.state,
          firstLoaded: true,
          isShow: this.props.selectedClub.isShow,
          name: this.props.selectedClub.name,
          summary: this.props.selectedClub.summary,
          description: this.props.selectedClub.description,
          category: this.props.selectedClub.category,
          poster_img: this.props.selectedClub.poster_img,
          available_semester: this.props.selectedClub.available_semester,
          available_major: this.props.selectedClub.available_major,
          session_day: this.props.selectedClub.session_day,
          tags: this.props.selectedClub.tags,
          recruit_start_day: this.props.selectedClub.recruit_start_day,
          recruit_end_day: this.props.selectedClub.recruit_end_day
        });
      }
    } else {
      // this.props.history.push("/club");
    }
  };

  imgUploadHandler = event => {
    if (
      // import from utils/CheckUploadedFile
      maxSelectFile(event) &&
      checkMimeType(event, 10) &&
      checkFileSize(event)
    ) {
      let file_urls = [];
      for (let x = 0; x < event.target.files.length; x++) {
        file_urls.push(URL.createObjectURL(event.target.files[x]));
      }
      this.setState({
        poster_img: file_urls,
        loaded: 0
      });
    }
  };

  confirmEditHandler = () => {
    // this.props.put
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
      let newMajor = this.props.majors.filter(a => a.name === major);
      if (newMajor.length == 0) return;

      newMajor = newMajor[0].id;
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

  render() {
    let selectedClubName = null;
    let selectedClubSummary = null;
    let selectedClubDescription = null;

    let categoryOptionList = null;
    let deptOptionList = null;
    let majorOptionList = null;

    if (this.props.selectedClub) {
      selectedClubName = this.props.selectedClub.name;
      selectedClubSummary = this.props.selectedClub.summary;
      selectedClubDescription = this.props.selectedClub.description;
    }

    if (this.props.categories) {
      categoryOptionList = this.props.categories.map(category => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ));
    }

    /* deptOptionList */
    // ㄴ Redux 에서 depts를 받아와서, option list를 만들어줍니다.
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
    if (this.props.majors) {
      const selectedMajorList = this.props.majors.filter(major => {
        return major.dept_id === selectedDeptID;
      });
      majorOptionList = selectedMajorList.map(major => (
        <option key={major.id}>{major.name}</option>
      ));
    }

    return (
      <div>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formBasicClubname">
              <Form.Label>동아리 이름</Form.Label>
              <Form.Control
                size="lg"
                onChange={event => {
                  this.setState({ name: event.target.value });
                }}
                defaultValue={selectedClubName}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formBasicIsShow">
              <Form.Label>메인페이지 표시 여부</Form.Label>
              {this.state.isShow ? (
                <Button
                  as={Col}
                  variant="primary"
                  size="lg"
                  onClick={() => this.setState({ isShow: !this.state.isShow })}
                >
                  감추기
                </Button>
              ) : (
                <Button
                  as={Col}
                  variant="outline-primary"
                  size="lg"
                  onClick={() => this.setState({ isShow: !this.state.isShow })}
                >
                  표시
                </Button>
              )}
            </Form.Group>
          </Form.Row>
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

          <Form.Label>포스터 사진</Form.Label>
          <input
            type="file"
            id="club-poster-file-input"
            multiple
            onChange={this.imgUploadHandler}
          />

          <Form.Row>
            <Form.Group as={Col} controlId="formDept">
              <Form.Label>모집 시작 일자</Form.Label>
              <Form.Row size="lg">
                <DatePicker
                  selected={this.state.recruit_start_day}
                  onChange={date => {
                    if (date > this.state.recruit_end_day) {
                      this.setState({
                        recruit_start_day: this.state.recruit_end_day
                      });
                    } else this.setState({ recruit_start_day: date });
                  }}
                  dateFormat="yyyy/MM/d"
                />
              </Form.Row>
            </Form.Group>

            <Form.Group as={Col} controlId="formDept">
              <Form.Label>모집 마감 일자</Form.Label>
              <Form.Row size="lg">
                <DatePicker
                  selected={this.state.recruit_end_day}
                  onChange={date => {
                    if (date < this.state.recruit_start_day) {
                      this.setState({
                        recruit_end_day: this.state.recruit_start_day
                      });
                    } else this.setState({ recruit_end_day: date });
                  }}
                  dateFormat="yyyy/MM/dd"
                />
              </Form.Row>
            </Form.Group>
          </Form.Row>

          <br />
          <h1 align="center">가입 조건</h1>
          <Form.Label>가능 학과</Form.Label>
          <Form.Row>
            {this.state.available_major.map(major_id => (
              <Button
                key={major_id}
                style={{ marginTop: "3px", marginRight: "3px" }}
                onClick={() => this.handle_RemoveSpecificMajor(major_id)}
              >
                {this.props.majors.filter(major => major.id === major_id)[0]
                  .name + " X"}
              </Button>
            ))}
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formDept">
              <Form.Label>단과 대학</Form.Label>
              <Form.Control
                as="select"
                size="lg"
                onChange={event => {
                  if (event.target.value === "")
                    this.setState({ current_major: "" });
                  this.setState({ current_dept: event.target.value });
                }}
              >
                <option></option>
                {deptOptionList}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formMajor">
              <Form.Label>학과</Form.Label>
              <Form.Control
                as="select"
                size="lg"
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
            <Button
              as={Col}
              style={{ marginTop: "10px" }}
              variant="dark"
              size="lg"
              onClick={() =>
                this.handle_SelectSpecificMajor(this.state.current_major)
              }
              disabled={
                this.state.current_dept === "" ||
                this.state.current_major === ""
              }
            >
              추가
            </Button>
            <Col sm={1} />
            <Button
              as={Col}
              style={{ marginTop: "10px" }}
              variant="dark"
              size="lg"
              onClick={() => this.handle_SelectAllMajor()}
            >
              전체 추가
            </Button>
            <Col sm={1} />
            <Button
              as={Col}
              style={{ marginTop: "10px" }}
              variant="dark"
              size="lg"
              onClick={() => this.handle_RemoveAllMajor()}
            >
              전체 삭제
            </Button>
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
                      id="clubinfo-sessionday-checkbox"
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
              </Form.Row>
            </Form.Group>
          </Form.Row>
        </Form>
        <Button
          style={{ marginTop: "10px" }}
          variant="dark"
          size="lg"
          block
          onClick={() => {}}
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
    selectedClub: state.club.selectedClub,
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
