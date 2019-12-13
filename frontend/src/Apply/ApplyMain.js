import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import filePNG from "../images/file.png";
import imagePNG from "../images/image.png";
import savePNG from "../images/save.png";

import Header from "../Header/Header";

import * as actionCreators from "../store/actions/index";
import {
  formMaker,
  multiChoiceCardFactory,
  imageCardFactory
} from "./ApplyUtil";

class ApplyMain extends Component {
  state = {
    isUserInfoLoaded: false,
    isFormInfoLoaded: false,
    formList: []
  };

  saveApplicationHandler = () => {
    let formData = new FormData();

    this.state.formList
      .filter(item => item.type === "image" || item.type === "file")
      .forEach(item => {
        formData.append(item.type, item.file_data);
      });

    this.props.putApplicationByID(
      this.props.match.params.club_id,
      this.state.formList,
      formData
    );
  };

  fileSelectHandler = (e, props) => {
    return new Promise((resolve, reject) => {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onloadend = function() {
        this.setState({
          ...this.state,
          formList: this.state.formList.map(item => {
            if (item.id === props.id)
              return {
                ...item,
                file_data: file,
                content: [reader.result],
                fileName: file.name
              };
            else return item;
          })
        });
        resolve();
      }.bind(this);
      reader.readAsDataURL(file);
    });
  };

  componentDidMount() {
    this.props.getClubByID(this.props.match.params.club_id);
    this.props.getApplicationByID(this.props.match.params.club_id);
  }

  componentDidUpdate = () => {
    if (this.props.loggedUser && !this.state.isUserInfoLoaded) {
      this.setState({ ...this.state, isUserInfoLoaded: true });
      // this.props.onGetManagingClubs(this.props.loggedUser);
    }
    if (this.state.isUserInfoLoaded && !this.state.isFormInfoLoaded) {
      if (this.props.myApplication) {
        this.setState({
          ...this.state,
          isFormInfoLoaded: true,
          formList: this.props.myApplication
        });
      } else if (this.props.selectedApplication) {
        let formList = formMaker(this.props.selectedApplication);
        this.setState({
          ...this.state,
          isFormInfoLoaded: true,
          formList: formList
        });
      }
    }

    if (!this.props.loggedUser) this.props.history.push("/club");
  };

  shortText = props => {
    return (
      <Card style={{ margin: "10px" }} key={props.id}>
        <Card.Header>{props.title}</Card.Header>
        <Card.Body>
          <Form.Control
            className="short-input"
            size="lg"
            defaultValue={props.content}
            onChange={e => {
              this.setState({
                ...this.state,
                formList: this.state.formList.map(item => {
                  if (item.id === props.id)
                    return { ...item, content: e.target.value };
                  else return item;
                })
              });
            }}
          />
        </Card.Body>
      </Card>
    );
  };

  longText = props => {
    return (
      <Card style={{ margin: "10px" }} key={props.id}>
        <Card.Header>{props.title}</Card.Header>
        <Card.Body>
          <Form.Control
            className="long-input"
            size="lg"
            as="textarea"
            rows="3"
            defaultValue={props.content}
            onChange={e => {
              this.setState({
                ...this.state,
                formList: this.state.formList.map(item => {
                  if (item.id === props.id)
                    return { ...item, content: e.target.value };
                  else return item;
                })
              });
            }}
          />
        </Card.Body>
      </Card>
    );
  };

  multiChoice = props => {
    let choices = props.choices.map((item, index) => {
      return (
        <div key={index}>
          {index === 0 ? "" : <hr />}
          <input
            type="checkbox"
            style={{ marginRight: "10px" }}
            checked={item.checked ? true : false}
            onChange={e => {
              this.setState({
                ...this.state,
                formList: this.state.formList.map(form => {
                  if (form.id === props.id)
                    return {
                      ...form,
                      choices: form.choices.map(choice => {
                        if (choice.id === item.id)
                          return { ...choice, checked: !choice.checked };
                        else return choice;
                      })
                    };
                  else return form;
                })
              });
            }}
          ></input>
          {item.title}
        </div>
      );
    });
    return multiChoiceCardFactory(props.id, props.title, choices);
  };

  image = props => {
    return imageCardFactory(
      props.id,
      props.title,
      props.content,
      props.fileName,
      imagePNG,
      <div>
        <label htmlFor={"image-file-input " + props.id}>
          이미지를 선택하세요.
        </label>
        <input
          id={"image-file-input " + props.id}
          type="file"
          name="file"
          style={{ display: "none" }}
          onChange={e => {
            return this.fileSelectHandler(e, props);
          }}
        />
      </div>
    );
  };

  file = props => {
    return (
      <Card style={{ margin: "10px" }} key={props.id}>
        <Card.Header>{props.title}</Card.Header>
        <Card.Body style={{ textAlign: "center" }}>
          <img src={filePNG} width="100" height="100" alt="" />
          {props.content ? (
            <div style={{ fontSize: 13, marginBottom: "10px" }}>
              {props.fileName}
            </div>
          ) : (
            ""
          )}
          <div>
            <label htmlFor={"file-file-input " + props.id}>
              파일을 선택하세요.
            </label>
            <input
              id={"file-file-input " + props.id}
              type="file"
              name="file"
              style={{ display: "none" }}
              onChange={e => {
                return this.fileSelectHandler(e, props);
              }}
            />
          </div>
        </Card.Body>
      </Card>
    );
  };

  render() {
    let formList = this.state.formList.map(record => {
      switch (record.type) {
        case "shortText":
          return this.shortText(record);
        case "longText":
          return this.longText(record);
        case "multiChoice":
          return this.multiChoice(record);
        case "image":
          return this.image(record);
        case "file":
          return this.file(record);
        default:
          return <div key={record.id}></div>;
      }
    });

    return (
      <div>
        <Header />
        <Container>
          <Card>
            <Card.Header>
              <Row>
                <Col>
                  <div
                    className="club-name-indicator"
                    style={{ margin: "10px" }}
                  >
                    {(this.props.selectedClub
                      ? this.props.selectedClub.name
                      : "") + " 지원하기"}
                  </div>
                </Col>
                <Col style={{ textAlign: "right" }}>
                  <div
                    className="form-save-button"
                    style={{ margin: "10px" }}
                    onClick={this.saveApplicationHandler}
                  >
                    <img src={savePNG} width="30" height="30" alt="" /> 저장
                  </div>
                </Col>
              </Row>
            </Card.Header>
          </Card>
          <Row>
            <Col>
              <Card
                style={{
                  marginBottom: "5px",
                  marginTop: "13px",
                  overflowY: "scroll",
                  height: "700px"
                }}
              >
                <div style={{ margin: "10px" }}>{formList}</div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedClub: state.club.selectedClub,
    loggedUser: state.user.loggedUser,
    myApplication: state.club.myApplication,
    selectedApplication: state.club.selectedApplication
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getClubByID: id => dispatch(actionCreators.getClubByID(id)),
    getApplicationByID: id => dispatch(actionCreators.getApplicationByID(id)),
    putApplicationByID: (id, form, fileData) =>
      dispatch(actionCreators.putApplicationByID(id, form, fileData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ApplyMain));
