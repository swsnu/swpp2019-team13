import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Form, Col, Button } from "react-bootstrap";
import * as actionCreators from "../store/actions/index";
import DatePicker from "react-datepicker";
import { ImageSelectPreview } from "react-image-select-pv";
import { WithContext as ReactTags } from "react-tag-input";

import "react-datepicker/dist/react-datepicker.css";
import "./ReactTag.css";

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

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
    new_img: [],
    suggest_tag: [],
    selected_tag: [],
    removed_tag: []
  };

  handleDeleteExtractTag(i) {
    let selectedTag = this.state.selected_tag.find((tag, index) => index === i);
    this.setState({
      selected_tag: this.state.selected_tag.filter(tag => tag !== selectedTag),
      removed_tag: this.state.removed_tag.concat(selectedTag)
    });
  }

  handleAddExtractTag() {
    let newTag = this.state.tags;

    this.state.selected_tag.map(selectedTag => {
      if (newTag.find(tag => tag.text === selectedTag) === undefined) {
        newTag = newTag.concat({
          id: newTag.length.toString(),
          text: selectedTag
        });
      }
      return null;
    });

    this.setState({
      tags: newTag
    });
  }

  handleDelete(i) {
    this.setState({
      tags: this.state.tags.filter((tag, index) => index !== i)
    });
  }

  handleAddition(tag) {
    this.setState({
      tags: this.state.tags.concat({
        id: this.state.tags.length.toString(),
        text: tag.text
      })
    });
  }

  handleDrag(tag, currPos, newPos) {
    const newTags = this.state.tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
  }

  componentDidMount = () => {
    if (this.props.selectedClub) {
      this.setState({
        ...this.state,
        isShow: this.props.selectedClub.isShow,
        name: this.props.selectedClub.name,
        summary: this.props.selectedClub.summary,
        description: this.props.selectedClub.description,
        category: this.props.selectedClub.category,
        poster_img: this.props.selectedClub.poster_img,
        available_semester: this.props.selectedClub.available_semester,
        available_major: this.props.selectedClub.available_major,
        session_day: this.props.selectedClub.session_day
      });

      if (this.props.tags) {
        let tags = [];
        let suggestions = [];
        this.props.selectedClub.tags.map(tag_id => {
          let t = this.props.tags.find(tag => tag.id === tag_id);
          tags.push({
            id: tags.length.toString(),
            text: t.name
          });
          return null;
        });

        this.props.tags.map((tag, i) => {
          suggestions.push({
            id: i.toString(),
            text: tag.name
          });
          return null;
        });

        this.setState({ tags: tags, suggest_tag: suggestions });
      }

      if (this.props.selectedClub.recruit_start_day) {
        this.setState({
          recruit_start_day: new Date(
            this.props.selectedClub.recruit_start_day + "T15:00:00.000Z"
          ),
          recruit_end_day: new Date(
            this.props.selectedClub.recruit_end_day + "T15:00:00.000Z"
          )
        });
      }
    }
  };

  imgUploadHandler = imgs => {
    let files = [];

    imgs.map(img => files.push(img.blob));

    this.setState({
      new_img: files
    });
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
      recruit_start_day: this.state.recruit_start_day,
      recruit_end_day: this.state.recruit_end_day,
      current_dept: this.state.current_dept,
      current_major: this.state.current_major,
      selected_tag: this.state.selected_tag,
      removed_tag: this.state.removed_tag,
      tags: this.state.tags
    };

    let poster_files = [];

    this.state.new_img.map(image => {
      const fd = new FormData();
      const file = new File([image], image.name);
      fd.append("image", file);
      poster_files.push(fd);
      return true;
    });

    this.props
      .putClubInformation(this.props.match.params.club_id, editedClubInfo)
      .then(() => {
        this.props
          .postClubPoster(this.props.match.params.club_id, poster_files)
          .then(() => {
            this.props.getClubByID(this.props.match.params.club_id).then(() => {
              this.setState({ poster_img: this.props.selectedClub.poster_img });
            });
          });
      });
  };
  tagExtractHandler = () => {
    this.props.getExtractedTag(this.state.description).then(() => {
      let selected = [];
      for (var key in this.props.extracted_tag) {
        selected.push(key);
      }
      this.setState({
        selected_tag: selected,
        removed_tag: []
      });
    });
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
      if (newMajor.length === 0) return;

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
    let majorList = [];

    if (this.props.majors) majorList = this.props.majors;

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
      <div className="ClubInfoTab">
        <Form>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>동아리 이름</Form.Label>
              <Form.Control
                size="lg"
                id="clubinfo-name-input"
                onChange={event => {
                  this.setState({ name: event.target.value });
                }}
                defaultValue={selectedClubName}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>메인페이지 표시 여부</Form.Label>
              {this.state.isShow ? (
                <Button
                  as={Col}
                  id="clubinfo-isshow-button-true"
                  variant="primary"
                  size="lg"
                  onClick={() => this.setState({ isShow: !this.state.isShow })}
                >
                  감추기
                </Button>
              ) : (
                <Button
                  as={Col}
                  id="clubinfo-isshow-button-false"
                  variant="outline-primary"
                  size="lg"
                  onClick={() => this.setState({ isShow: !this.state.isShow })}
                >
                  표시
                </Button>
              )}
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Label>요약</Form.Label>
            <Form.Control
              as="textarea"
              size="lg"
              rows={1}
              id="clubinfo-summary-input"
              onChange={event => {
                this.setState({ summary: event.target.value });
              }}
              defaultValue={selectedClubSummary}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>구체적인 동아리 설명</Form.Label>
            <Form.Control
              as="textarea"
              size="lg"
              rows={15}
              id="clubinfo-description-input"
              onChange={event => {
                this.setState({ description: event.target.value });
              }}
              defaultValue={selectedClubDescription}
            />
          </Form.Group>
          <br />
          <Form.Label>추출된 태그</Form.Label>
          <Form.Row>
            {this.state.selected_tag.map((tag, i) => (
              <Button
                key={i}
                id="clubinfo-removetag-button"
                style={{ marginTop: "3px", marginRight: "3px" }}
                onClick={() => this.handleDeleteExtractTag(i)}
              >
                {tag + " X"}
              </Button>
            ))}
          </Form.Row>
          <Form.Row>
            <Button
              as={Col}
              style={{ marginTop: "10px" }}
              variant="dark"
              size="lg"
              id="tag-extract-button"
              onClick={this.tagExtractHandler}
            >
              태그 추출
            </Button>
            <Col sm={2} />
            <Button
              as={Col}
              style={{ marginTop: "10px" }}
              variant="dark"
              size="lg"
              id="add-extractedtag-button"
              onClick={() => this.handleAddExtractTag()}
            >
              추출된 태그 추가
            </Button>
          </Form.Row>
          <br />
          <Form.Label>현재 태그</Form.Label>
          <div>
            <ReactTags
              id="clubinfo-tag-list"
              tags={this.state.tags}
              suggestions={this.state.suggest_tag}
              handleDelete={index => this.handleDelete(index)}
              handleAddition={tag => this.handleAddition(tag)}
              handleDrag={(tag, curpos, newpos) =>
                this.handleDrag(tag, curpos, newpos)
              }
              delimiters={delimiters}
            />
          </div>

          <Form.Label>동아리 분류</Form.Label>
          <Form.Control
            as="select"
            size="lg"
            id="clubinfo-category-input"
            onChange={event => {
              this.setState({ category: event.target.value });
            }}
            value={this.state.category}
          >
            {categoryOptionList}
          </Form.Control>
          <br />
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
          <br />
          <Form.Row>
            <Form.Label>새로운 사진</Form.Label>
          </Form.Row>
          <Form.Row>
            <div>
              <ImageSelectPreview
                id="club-poster-file-input"
                imageTypes="png|jpg|gif"
                onChange={data => {
                  this.imgUploadHandler(data);
                }}
                max={10}
              />
            </div>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>모집 시작 일자</Form.Label>
              <Form.Row size="lg">
                <DatePicker
                  selected={this.state.recruit_start_day}
                  id="clubinfo-startday-input"
                  onChange={date => {
                    this.setState({ recruit_start_day: date });
                  }}
                  dateFormat="yyyy/MM/dd"
                />
              </Form.Row>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>모집 마감 일자</Form.Label>
              <Form.Row size="lg">
                <DatePicker
                  selected={this.state.recruit_end_day}
                  id="clubinfo-endday-input"
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
            {this.state.available_major.map(
              major_id =>
                majorList.filter(major => major.id === major_id).length > 0 && (
                  <Button
                    key={major_id}
                    id="clubinfo-removemajor-button"
                    style={{ marginTop: "3px", marginRight: "3px" }}
                    onClick={() => this.handle_RemoveSpecificMajor(major_id)}
                  >
                    {majorList.filter(major => major.id === major_id)[0].name +
                      " X"}
                  </Button>
                )
            )}
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>단과 대학</Form.Label>
              <Form.Control
                as="select"
                size="lg"
                id="clubinfo-dept-input"
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

            <Form.Group as={Col}>
              <Form.Label>학과</Form.Label>
              <Form.Control
                as="select"
                size="lg"
                id="clubinfo-major-input"
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
              id="clubinfo-addmajor-button"
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
              id="clubinfo-addallmajor-button"
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
              id="clubinfo-removeallmajor-button"
              onClick={() => this.handle_RemoveAllMajor()}
            >
              전체 삭제
            </Button>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>활동 가능 학기 수</Form.Label>
              <Form.Control
                as="select"
                size="lg"
                id="clubinfo-availablesemester-input"
                onChange={event => {
                  this.setState({
                    available_semester: Number(event.target.value)
                  });
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
            <Form.Group as={Col}>
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
          id="clubinfo-confirmedit-button"
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
            this.state.recruit_end_day < this.state.recruit_start_day
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
    majors: state.major.majors,
    tags: state.tag.tags,
    extracted_tag: state.tag.extracted_tag
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getClubByID: id => dispatch(actionCreators.getClubByID(id)),
    getExtractedTag: description =>
      dispatch(actionCreators.getExtractedTag(description)),
    putClubInformation: (id, clubInfo) =>
      dispatch(actionCreators.putClubInformation(id, clubInfo)),
    postClubPoster: (club_id, poster_files) =>
      dispatch(actionCreators.postClubPoster(club_id, poster_files))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClubInfoTab));
