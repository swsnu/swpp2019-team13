import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import ReactDragList from "react-drag-list";
import { Card, Form, Button, ButtonToolbar } from "react-bootstrap";
import filePNG from "./file.png";
import imagePNG from "./image.png";
// import * as actionCreators from "../store/actions/index";

class ApplicationFormTab extends Component {
  shortText = props => {
    return (
      <Card style={{ margin: "10px" }}>
        <Card.Header>{props.title}</Card.Header>
        <Card.Body>
          <Form.Control></Form.Control>
        </Card.Body>
      </Card>
    );
  };

  longText = props => {
    return (
      <Card style={{ margin: "10px" }}>
        <Card.Header>{props.title}</Card.Header>
        <Card.Body>
          <Form.Control as="textarea" rows="4"></Form.Control>
        </Card.Body>
      </Card>
    );
  };

  multiChoice = props => {
    let choices = props.choices.map((item, index) => {
      return (
        <Form.Check key={index} id={index} inline type="radio" label={item} />
      );
    });
    return (
      <Card style={{ margin: "10px" }}>
        <Card.Header>{props.title}</Card.Header>
        <Card.Body>
          <Form>{choices}</Form>
        </Card.Body>
      </Card>
    );
  };

  selectImage = props => {
    return (
      <Card style={{ margin: "10px" }}>
        <Card.Header>{props.title}</Card.Header>
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
        <Card.Header>{props.title}</Card.Header>
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
          <Button size="lg" variant="outline-secondary">
            짧은 글
          </Button>
          <Button size="lg" variant="outline-secondary">
            긴 글
          </Button>
          <Button size="lg" variant="outline-secondary">
            객관식 문항
          </Button>
          <Button size="lg" variant="outline-secondary">
            사진
          </Button>
          <Button size="lg" variant="outline-secondary">
            파일
          </Button>
        </div>
        <hr />
        <div
          style={{ overflowY: "scroll", height: "700px", marginTop: "10px" }}
        >
          <ReactDragList
            handles={false}
            dataSource={[
              { type: "shortText", title: "short text" },
              { type: "longText", title: "long text" },
              {
                type: "multiChoice",
                title: "multi choice",
                choices: ["choice1", "choice2", "choice3", "choice4", "choice5"]
              },
              { type: "selectImage", title: "select image" },
              { type: "selectFile", title: "select file" },
              { type: "selectFile", title: "select file" },
              { type: "selectFile", title: "select file" },
              { type: "selectFile", title: "select file" },
              { type: "selectFile", title: "select file" }
            ]}
            onUpdate={e => {
              console.log(e);
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
