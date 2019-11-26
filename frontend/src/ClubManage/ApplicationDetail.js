import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Container, Row, Col, Card, Form, Modal } from "react-bootstrap";
import filePNG from "../images/file.png";
import imagePNG from "../images/image.png";
import savePNG from "../images/save.png";

import Header from "../Header/Header";

import * as actionCreators from "../store/actions/index";

class ApplicationDetail extends Component {
  state = {
    isFormInfoLoaded: false,
    formList: []
  };

  componentDidMount() {
    this.props.getApplicationByID(this.props.match.params.club_id);
  }

  componentDidUpdate = () => {
    if (!this.state.isFormInfoLoaded) {
      if (this.props.selectedApplication) {
        console.log(this.props.selectedApplication);
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
          isFormInfoLoaded: true,
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
      <Modal
        size="lg"
        show={this.props.show}
        onHide={this.props.closeHandler}
        style={{ opacity: 1 }}
      >
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
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedApplication: state.club.selectedApplication
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getApplicationByID: id => dispatch(actionCreators.getApplicationByID(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ApplicationDetail));
