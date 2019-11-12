import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import ReactDragList from "react-drag-list";
import { Card, Form, Button, ButtonToolbar } from "react-bootstrap";
import filePNG from "./file.png";
import imagePNG from "./image.png";
import deletePNG from "./delete.png";
import minusPNG from "./minus.png";
import plusPNG from "./plus.png";

// import * as actionCreators from "../store/actions/index";

class ApplicationFormTab extends Component {
  state = {
    formList: []
  };

  addNewForm = type => {
    switch (type) {
      case "shortText":
        this.setState({
          ...this.state,
          formList: this.state.formList.concat({
            type: type,
            title: "질문을 입력하세요."
          })
        });
        break;
      case "longText":
        this.setState({
          ...this.state,
          formList: this.state.formList.concat({
            type: type,
            title: "질문을 입력하세요."
          })
        });
        break;
      case "multiChoice":
        this.setState({
          ...this.state,
          formList: this.state.formList.concat({
            type: type,
            title: "질문을 입력하세요.",
            choices: ["choice1", "choice2", "choice3", "choice4", "choice5"]
          })
        });
        break;
      case "selectImage":
        this.setState({
          ...this.state,
          formList: this.state.formList.concat({
            type: type,
            title: "질문을 입력하세요."
          })
        });
        break;
      case "selectFile":
        this.setState({
          ...this.state,
          formList: this.state.formList.concat({
            type: type,
            title: "질문을 입력하세요."
          })
        });
        break;
      default:
        break;
    }
  };

  shortText = props => {
    return (
      <Card style={{ margin: "10px" }}>
        <Card.Header style={{ display: "flex" }}>
          <Form.Control size="lg" defaultValue={props.title}></Form.Control>
          <img
            src={deletePNG}
            width="30"
            height="30"
            alt=""
            style={{ marginLeft: "10px" }}
          />
        </Card.Header>
        <Card.Body>
          <div style={{ height: "20px" }}></div>
        </Card.Body>
      </Card>
    );
  };

  longText = props => {
    return (
      <Card style={{ margin: "10px" }}>
        <Card.Header style={{ display: "flex" }}>
          <Form.Control size="lg" defaultValue={props.title}></Form.Control>
          <img
            src={deletePNG}
            width="30"
            height="30"
            alt=""
            style={{ marginLeft: "10px" }}
          />
        </Card.Header>
        <Card.Body>
          <div style={{ height: "100px" }}></div>
        </Card.Body>
      </Card>
    );
  };

  multiChoice = props => {
    let choices = props.choices.map((item, index) => {
      return (
        <div style={{ display: "flex", marginTop: "5px" }}>
          <input type="checkbox"></input>
          <Form.Control size="md" defaultValue={item}></Form.Control>
          <img
            src={minusPNG}
            width="20"
            height="20"
            alt=""
            style={{ marginLeft: "10px" }}
          />
        </div>
      );
    });
    return (
      <Card style={{ margin: "10px" }}>
        <Card.Header style={{ display: "flex" }}>
          <Form.Control size="lg" defaultValue={props.title}></Form.Control>
          <img
            src={deletePNG}
            width="30"
            height="30"
            alt=""
            style={{ marginLeft: "10px" }}
          />
        </Card.Header>
        <Card.Body style={{ width: "95%", marginLeft: "10px" }}>
          <div style={{ display: "flex" }}>
            <Form.Control size="md" defaultValue={props.title}></Form.Control>
            <img
              src={plusPNG}
              width="22"
              height="22"
              alt=""
              style={{ marginLeft: "10px" }}
            />
          </div>
          <hr />
          {choices}
        </Card.Body>
      </Card>
    );
  };

  selectImage = props => {
    return (
      <Card style={{ margin: "10px" }}>
        <Card.Header style={{ display: "flex" }}>
          <Form.Control size="lg" defaultValue={props.title}></Form.Control>
          <img
            src={deletePNG}
            width="30"
            height="30"
            alt=""
            style={{ marginLeft: "10px" }}
          />
        </Card.Header>
        <Card.Body style={{ textAlign: "center" }}>
          {/* <Button>Select Image</Button> */}
          <img src={imagePNG} width="120" height="120" alt="" />
        </Card.Body>
      </Card>
    );
  };

  selectFile = props => {
    return (
      <Card style={{ margin: "10px" }}>
        <Card.Header style={{ display: "flex" }}>
          <Form.Control size="lg" defaultValue={props.title}></Form.Control>
          <img
            src={deletePNG}
            width="30"
            height="30"
            alt=""
            style={{ marginLeft: "10px" }}
          />
        </Card.Header>
        <Card.Body style={{ textAlign: "center" }}>
          {/* <Button>Select Image</Button> */}
          <img src={filePNG} width="120" height="120" alt="" />
        </Card.Body>
      </Card>
    );
  };

  render() {
    return (
      <div>
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
              this.addNewForm("selectImage");
            }}
          >
            사진
          </Button>
          <Button
            size="lg"
            variant="outline-secondary"
            onClick={() => {
              this.addNewForm("selectFile");
            }}
          >
            파일
          </Button>
        </div>
        <hr />
        <div
          style={{ overflowY: "scroll", height: "700px", marginTop: "10px" }}
        >
          <ReactDragList
            handles={false}
            dataSource={this.state.formList}
            onUpdate={e => {
              console.log(this.state.formList);
            }}
            row={(record, index) => {
              switch (record.type) {
                case "shortText":
                  return this.shortText({ ...record, order: index });
                case "longText":
                  return this.longText({ ...record, order: index });
                case "multiChoice":
                  return this.multiChoice({ ...record, order: index });
                case "selectImage":
                  return this.selectImage({ ...record, order: index });
                case "selectFile":
                  return this.selectFile({ ...record, order: index });
                default:
                  return <></>;
              }
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ApplicationFormTab));
