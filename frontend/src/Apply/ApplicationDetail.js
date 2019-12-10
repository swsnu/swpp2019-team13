import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Card, Modal } from "react-bootstrap";
import filePNG from "../images/file.png";
import imagePNG from "../images/image.png";
import {
  formMaker,
  multiChoiceCardFactory,
  imageCardFactory
} from "./ApplyUtil";

class ApplicationDetail extends Component {
  state = {
    formList: []
  };

  componentDidUpdate = () => {
    if (this.state.forceRender !== this.props.forceRender) {
      if (this.props.selectedApplication) {
        let formList = formMaker(this.props.selectedApplication);
        this.setState({
          ...this.state,
          forceRender: this.props.forceRender,
          formList: formList
        });
      }
    }
  };

  shortText = props => {
    return (
      <Card style={{ margin: "10px" }} key={props.id}>
        <Card.Header>{props.title}</Card.Header>
        <Card.Body>{props.content}</Card.Body>
      </Card>
    );
  };

  longText = props => {
    return (
      <Card style={{ margin: "10px" }} key={props.id}>
        <Card.Header>{props.title}</Card.Header>
        <Card.Body>{props.content}</Card.Body>
      </Card>
    );
  };

  multiChoice = props => {
    let choices = props.choices.map((item, index) => {
      return (
        <div key={index}>
          {index === 0 ? "" : <hr />}
          <input
            readOnly
            type="checkbox"
            style={{ marginRight: "10px" }}
            checked={item.checked ? true : false}
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
      imagePNG
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
      <Modal
        size="lg"
        show={this.props.show}
        onHide={this.props.closeHandler}
        style={{ opacity: 1 }}
      >
        <Card>
          <Card.Header>
            <div style={{ display: "inline" }}>
              <span
                className="application-user-name"
                style={{ fontSize: "25px" }}
              >
                {this.props.user ? this.props.user.user.last_name : ""}
              </span>
              &nbsp;&nbsp;&nbsp;
              <span style={{ fontSize: "15px" }}>
                {this.props.user ? this.props.user.dept.name : ""}
                &nbsp;
                {this.props.user ? this.props.user.major.name : ""}
                &nbsp;
                {this.props.user ? this.props.user.grade + "학년" : ""}
              </span>
            </div>
          </Card.Header>
        </Card>
        <div
          style={{
            marginBottom: "5px",
            marginTop: "13px",
            overflowY: "scroll",
            height: "700px"
          }}
        >
          <div style={{ margin: "10px" }}>{formList}</div>
        </div>
      </Modal>
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
)(withRouter(ApplicationDetail));
