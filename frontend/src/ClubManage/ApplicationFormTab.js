import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import ReactDragList from "react-drag-list";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import filePNG from "./file.png";
import imagePNG from "./image.png";
import deletePNG from "./delete.png";
import minusPNG from "./minus.png";
import plusPNG from "./plus.png";
import savePNG from "./save.png";
import * as actionCreators from "../store/actions/index";

class ApplicationFormTab extends Component {
  state = {
    firstLoaded: false,
    formList: [],
    formID: 0
  };

  componentDidMount = () => {
    this.props.getApplicationFormByID(this.props.match.params.club_id);
  };

  componentDidUpdate = () => {
    if (!this.state.firstLoaded) {
      if (this.props.applicationForm) {
        let formList = [];
        let formID = 0;
        formList = formList.concat(
          this.props.applicationForm.short_texts.map(item =>
            this.addNewForm("shortText", formID++, item.title, item.order)
          )
        );
        formList = formList.concat(
          this.props.applicationForm.long_texts.map(item =>
            this.addNewForm("longText", formID++, item.title, item.order)
          )
        );
        formList = formList.concat(
          this.props.applicationForm.multi_choices.map(item =>
            this.addNewForm(
              "multiChoice",
              formID++,
              item.title,
              item.order,
              item.choices.map(choice => ({ ...choice, isDeleted: false }))
            )
          )
        );
        formList = formList.concat(
          this.props.applicationForm.images.map(item =>
            this.addNewForm("image", formID++, item.title, item.order)
          )
        );
        formList = formList.concat(
          this.props.applicationForm.files.map(item =>
            this.addNewForm("file", formID++, item.title, item.order)
          )
        );
        formList.sort((a, b) => (a.order > b.order ? 1 : -1));
        this.setState({
          ...this.state,
          firstLoaded: true,
          formList: formList,
          formID: formID
        });
      }
    }
  };

  addNewForm = (
    type,
    id = null,
    title = null,
    order = null,
    choices = null
  ) => {
    let newForm = {
      id: id ? id : this.state.formID,
      type: type,
      title: title ? title : "내용을 입력하세요.",
      defalutChoice: "내용을 입력하세요.",
      choiceID: choices ? choices.length + 1 : 0,
      choices: choices ? choices : [],
      isDeleted: false,
      order: order
    };
    if (!id) {
      this.setState({
        ...this.state,
        formList: this.state.formList.concat(newForm),
        formID: this.state.formID + 1,
        firstLoaded: true
      });
    }
    return newForm;
  };

  formHeader = props => {
    return (
      <Card.Header style={{ display: "flex" }}>
        <Form.Control
          size="lg"
          defaultValue={props.title}
          onChange={e => {
            this.setState({
              ...this.state,
              formList: this.state.formList.map(item => {
                if (item.id === props.id)
                  return { ...item, title: e.target.value };
                else return item;
              })
            });
          }}
        />
        <img
          src={deletePNG}
          width="30"
          height="30"
          alt=""
          style={{ marginLeft: "10px" }}
          onClick={() => {
            this.setState({
              ...this.state,
              formList: this.state.formList.map(item => {
                if (item.id === props.id) return { ...item, isDeleted: true };
                else return item;
              })
            });
          }}
        />
      </Card.Header>
    );
  };

  shortText = props => {
    return (
      <Card style={{ margin: "10px" }}>
        {this.formHeader(props)}
        <Card.Body>
          <div style={{ height: "20px" }}></div>
        </Card.Body>
      </Card>
    );
  };

  longText = props => {
    return (
      <Card style={{ margin: "10px" }}>
        {this.formHeader(props)}
        <Card.Body>
          <div style={{ height: "100px" }}></div>
        </Card.Body>
      </Card>
    );
  };

  multiChoice = props => {
    let choices = props.choices
      .filter(item => !item.isDeleted)
      .map(item => {
        return (
          <div style={{ display: "flex", marginTop: "5px" }} key={item.id}>
            <input type="checkbox"></input>
            <Form.Control
              style={{ width: "100%" }}
              size="md"
              defaultValue={item.content}
              onChange={e => {
                this.setState({
                  ...this.state,
                  formList: this.state.formList.map(form => {
                    if (form.id === props.id)
                      return {
                        ...form,
                        choices: form.choices.map(choice => {
                          if (choice.id === item.id)
                            return { ...choice, content: e.target.value };
                          else return choice;
                        })
                      };
                    else return form;
                  })
                });
              }}
            />
            <img
              src={minusPNG}
              width="20"
              height="20"
              alt=""
              style={{ marginLeft: "10px" }}
              onClick={() => {
                this.setState({
                  ...this.state,
                  formList: this.state.formList.map(form => {
                    if (form.id === props.id)
                      return {
                        ...form,
                        choices: form.choices.map(choice => {
                          if (choice.id === item.id)
                            return { ...choice, isDeleted: true };
                          else return choice;
                        })
                      };
                    else return form;
                  })
                });
              }}
            />
          </div>
        );
      });
    return (
      <Card style={{ margin: "10px" }}>
        {this.formHeader(props)}
        <Card.Body style={{ width: "95%", marginLeft: "10px" }}>
          <div style={{ display: "flex" }}>
            <Form.Control
              size="md"
              defaultValue={"내용을 입력하세요."}
              onChange={e => {
                this.setState({
                  ...this.state,
                  formList: this.state.formList.map(item => {
                    if (item.id === props.id)
                      return {
                        ...item,
                        defalutChoice: e.target.value
                      };
                    else return item;
                  })
                });
              }}
            />
            <img
              src={plusPNG}
              width="22"
              height="22"
              alt=""
              style={{ marginLeft: "10px" }}
              onClick={() => {
                this.setState({
                  ...this.state,
                  formList: this.state.formList.map(item => {
                    if (item.id === props.id)
                      return {
                        ...item,
                        choices: item.choices.concat({
                          id: item.choiceID,
                          content: item.defalutChoice,
                          isDeleted: false
                        }),
                        choiceID: item.choiceID + 1
                      };
                    else return item;
                  })
                });
              }}
            />
          </div>
          <hr />
          {choices}
        </Card.Body>
      </Card>
    );
  };

  image = props => {
    return (
      <Card style={{ margin: "10px" }}>
        {this.formHeader(props)}
        <Card.Body style={{ textAlign: "center" }}>
          {/* <Button>Select Image</Button> */}
          <img src={imagePNG} width="120" height="120" alt="" />
        </Card.Body>
      </Card>
    );
  };

  file = props => {
    return (
      <Card style={{ margin: "10px" }}>
        {this.formHeader(props)}
        <Card.Body style={{ textAlign: "center" }}>
          {/* <Button>Select Image</Button> */}
          <img src={filePNG} width="120" height="120" alt="" />
        </Card.Body>
      </Card>
    );
  };

  saveApplicationFormHandler = () => {
    this.props.putApplicationFormByID(
      this.props.match.params.club_id,
      this.state.formList
        .filter(item => !item.isDeleted)
        .map((item, index) => ({ ...item, order: index }))
    );
  };

  render() {
    return (
      <div>
        <Row>
          <Col>
            <div>새 항목 추가</div>
            <div style={{ marginTop: "10px" }}>
              <Button
                size="lg"
                variant="outline-secondary"
                onClick={() => {
                  this.addNewForm("shortText");
                }}
              >
                짧은 글
              </Button>
              <Button
                size="lg"
                variant="outline-secondary"
                onClick={() => {
                  this.addNewForm("longText");
                }}
              >
                긴 글
              </Button>
              <Button
                size="lg"
                variant="outline-secondary"
                onClick={() => {
                  this.addNewForm("multiChoice");
                }}
              >
                객관식 문항
              </Button>
              <Button
                size="lg"
                variant="outline-secondary"
                onClick={() => {
                  this.addNewForm("image");
                }}
              >
                사진
              </Button>
              <Button
                size="lg"
                variant="outline-secondary"
                onClick={() => {
                  this.addNewForm("file");
                }}
              >
                파일
              </Button>
            </div>
          </Col>
          <Col style={{ textAlign: "right" }}>
            <div
              style={{ margin: "20px" }}
              onClick={this.saveApplicationFormHandler}
            >
              <img src={savePNG} width="30" height="30" alt="" /> 저장
            </div>
          </Col>
        </Row>
        <hr />
        <div
          style={{ overflowY: "scroll", height: "700px", marginTop: "10px" }}
        >
          <ReactDragList
            handles={false}
            dataSource={this.state.formList}
            onUpdate={e => {
              // this.forceUpdate();
            }}
            rowKey="id"
            row={(record, index) => {
              if (!record.isDeleted) {
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
                    return <></>;
                }
              }
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { applicationForm: state.club.applicationForm };
};

const mapDispatchToProps = dispatch => {
  return {
    getApplicationFormByID: id =>
      dispatch(actionCreators.getApplicationFormByID(id)),
    putApplicationFormByID: (id, form) =>
      dispatch(actionCreators.putApplicationFormByID(id, form))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ApplicationFormTab));
