import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Card, Modal } from "react-bootstrap";
import filePNG from "../images/file.png";
import imagePNG from "../images/image.png";

class ApplicationDetail extends Component {
  state = {
    formList: []
  };

  componentDidUpdate = () => {
    if (this.state.forceRender !== this.props.forceRender) {
      if (this.props.selectedApplication) {
        let formList = [];
        let formID = 0;
        formList = formList.concat(
          this.props.selectedApplication.short_texts.map(item =>
            this.newForm("shortText", formID++, item)
          )
        );
        formList = formList.concat(
          this.props.selectedApplication.long_texts.map(item =>
            this.newForm("longText", formID++, item)
          )
        );
        formList = formList.concat(
          this.props.selectedApplication.multi_choices.map(item =>
            this.newForm("multiChoice", formID++, item)
          )
        );
        formList = formList.concat(
          this.props.selectedApplication.images.map(item =>
            this.newForm("image", formID++, item)
          )
        );
        formList = formList.concat(
          this.props.selectedApplication.files.map(item =>
            this.newForm("file", formID++, item)
          )
        );
        formList.sort((a, b) => (a.order > b.order ? 1 : -1));
        this.setState({
          ...this.state,
          forceRender: this.props.forceRender,
          formList: formList
        });
      }
    }
  };

  newForm = (type, id, item) => {
    let newForm = {
      ...item,
      id: id,
      type: type
    };
    if (item.content && (type === "image" || type === "file")) {
      newForm = {
        ...newForm,
        fileName: item.content.substr(7, item.content.length)
      };
    }
    return newForm;
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
    return (
      <Card style={{ margin: "10px" }} key={props.id}>
        <Card.Header>{props.title}</Card.Header>
        <div
          style={{
            marginTop: "15px",
            marginBottom: "15px",
            marginLeft: "20px",
            marginRight: "20px"
          }}
        >
          {choices}
        </div>
      </Card>
    );
  };

  image = props => {
    return (
      <Card style={{ margin: "10px" }} key={props.id}>
        <Card.Header>{props.title}</Card.Header>
        <Card.Body style={{ textAlign: "center" }}>
          {props.content ? (
            <div>
              <img src={props.content} alt="" />
              <div style={{ fontSize: 11, marginBottom: "10px" }}>
                {props.fileName}
              </div>
            </div>
          ) : (
            <div>
              <img src={imagePNG} width="100" height="100" alt="" />
            </div>
          )}
        </Card.Body>
      </Card>
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
