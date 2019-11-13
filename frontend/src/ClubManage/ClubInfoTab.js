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
    available_semester: 1,
    available_major: [],
    session_day: 0,
    tags: [],
    recruit_start_day: null,
    recruit_end_day: null,
    current_dept: "",
    current_major: "",
    new_img: []
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
          recruit_start_day: new Date(
            this.props.selectedClub.recruit_start_day + "T15:00:00.000Z"
          ),
          recruit_end_day: new Date(
            this.props.selectedClub.recruit_end_day + "T15:00:00.000Z"
          )
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
      let files = [];
      for (let x = 0; x < event.target.files.length; x++) {
        files.push(event.target.files[x]);
      }
      this.setState({
        new_img: files
      });
    }
  };

  confirmEditHandler = () => {
    let editedClubInfo = {
      isShow: this.state.isShow,
      name: this.state.name,
      summary: this.state.summary,
      description: this.state.description,
      category: this.state.category,
      available_semester: this.state.available_semester,
      available_major: this.state.available_major,
      session_day: this.state.session_day,
      tags: this.state.tags,
      recruit_start_day: this.state.recruit_start_day,
      recruit_end_day: this.state.recruit_end_day,
      current_dept: this.state.current_dept,
      current_major: this.state.current_major
    };

    this.props
      .putClubInformation(this.props.match.params.club_id, editedClubInfo)
      .then(() => {
        this.state.new_img.map(image => {
          const fd = new FormData();
          const file = new File([image], "img.jpg");

          fd.append("image", file);

          this.props.postClubPoster(this.props.match.params.club_id, fd);
        });
      })
      .then(() => this.props.getClubByID(this.props.match.params.club_id));
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
    console.log(this.state);
    let selectedClubName = null;
    let selectedClubSummary = null;
    let selectedClubDescription = null;
    let selectedClubCategory = null;
    let selectedClubPosterImg = null;
    let selectedClubAvailableSemester = null;
    let selectedClubAvailableMajor = null;
    let selectedClubSessionDay = null;
    let selectedClubTags = null;
    let selectedClubStartDay = null;
    let selectedClubEndDay = null;

    let categoryOptionList = null;
    let deptOptionList = null;
    let majorOptionList = null;

    if (this.props.selectedClub) {
      selectedClubName = this.props.selectedClub.name;
      selectedClubSummary = this.props.selectedClub.summary;
      selectedClubDescription = this.props.selectedClub.description;
      selectedClubCategory = this.props.selectedClub.selectedClubCategory;
      selectedClubPosterImg = this.props.selectedClub.poster_img;
      selectedClubAvailableSemester = this.props.selectedClub
        .available_semester;
      selectedClubAvailableMajor = this.props.selectedClub.available_major;
      selectedClubSessionDay = this.props.selectedClub.session_day;
      selectedClubTags = this.props.selectedClub.tags;
      selectedClubStartDay = this.props.selectedClub.recruit_start_day;
      selectedClubEndDay = this.props.selectedClub.recruit_end_day;
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
          <Form.Row>
            <Form.Label>현재 사진</Form.Label>
          </Form.Row>
          {this.state.poster_img.map((img, i) => (
            <img
              key={i}
              src={"../../media/" + img}
              width="120"
              height="120"
              alt=""
            />
          ))}
          <Form.Label>새로운 사진</Form.Label>
          <input
            type="file"
            id="club-poster-file-input"
            multiple
            onChange={this.imgUploadHandler}
          />
          {/* TODO : remove when img upload implemented without ImageSelectView */}
          {/* <div>
            <ImageSelectPreview
              id="club-poster-file-input"
              imageTypes="png|jpg|gif"
              onChange={data => {
                this.imgUploadHandler(data);
              }}
              max={10}
            />
          </div> */}

          <Form.Row>
            <Form.Group as={Col} controlId="formDept">
              <Form.Label>모집 시작 일자</Form.Label>
              <Form.Row size="lg">
                <DatePicker
                  selected={this.state.recruit_start_day}
                  onChange={date => {
                    this.setState({ recruit_start_day: date });
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
                  onChange={date => this.setState({ recruit_end_day: date })}
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
                  this.setState({
                    available_semester: Number(event.target.value)
                  });
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
          onClick={this.confirmEditHandler}
          disabled={
            this.state.name === "" ||
            this.state.summary === "" ||
            this.state.description === "" ||
            this.state.category === 0 ||
            this.state.poster_img === [] ||
            this.state.available_major === [] ||
            this.state.session_day === 0 ||
            this.state.recruit_start_day === null ||
            this.state.recruit_end_day === null ||
            this.state.recruit_end_day < this.state.recruit_start_day ||
            (String(this.state.name) === String(selectedClubName) &&
              String(this.state.summary) === String(selectedClubSummary) &&
              String(this.state.description) ===
                String(selectedClubDescription) &&
              String(this.state.category) === String(selectedClubCategory) &&
              String(this.state.poster_img) === String(selectedClubPosterImg) &&
              String(this.state.available_semester) ===
                String(selectedClubAvailableSemester) &&
              String(this.state.available_major) ===
                String(selectedClubAvailableMajor) &&
              String(this.state.available_major) ===
                String(selectedClubSessionDay) &&
              String(this.state.session_day) ===
                String(selectedClubAvailableMajor) &&
              String(this.state.tags) === String(selectedClubTags) &&
              String(this.state.recruit_start_day) ===
                String(selectedClubStartDay) &&
              String(this.state.recruit_end_day) === String(selectedClubEndDay))
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
    selectedClub: state.club.selectedClub,
    categories: state.category.categories,
    depts: state.dept.depts,
    majors: state.major.majors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getClubByID: id => dispatch(actionCreators.getClubByID(id)),
    putClubInformation: (id, clubInfo) =>
      dispatch(actionCreators.putClubInformation(id, clubInfo)),
    postClubPoster: (club_id, poster) =>
      dispatch(actionCreators.postClubPoster(club_id, poster))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClubInfoTab));
