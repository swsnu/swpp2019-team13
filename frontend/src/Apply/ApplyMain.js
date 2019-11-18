import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import filePNG from "../images/file.png";
import imagePNG from "../images/image.png";
import savePNG from "../images/save.png";

import Header from "../Header/Header";

import * as actionCreators from "../store/actions/index";

class ApplyMain extends Component {
  state = {
    isUserInfoLoaded: false,
    isFormInfoLoaded: false,
    formList: []
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
      if (this.props.selectedApplication) {
        console.log(this.props.selectedApplication);
        let formList = [];
        let formID = 0;
        formList = formList.concat(
          this.props.selectedApplication.short_texts.map(item =>
            this.newForm("shortText", formID++, item.title, item.order)
          )
        );
        formList = formList.concat(
          this.props.selectedApplication.long_texts.map(item =>
            this.newForm("longText", formID++, item.title, item.order)
          )
        );
        formList = formList.concat(
          this.props.selectedApplication.multi_choices.map(item =>
            this.newForm(
              "multiChoice",
              formID++,
              item.title,
              item.order,
              item.choices.map(choice => ({ ...choice, isDeleted: false }))
            )
          )
        );
        formList = formList.concat(
          this.props.selectedApplication.images.map(item =>
            this.newForm("image", formID++, item.title, item.order)
          )
        );
        formList = formList.concat(
          this.props.selectedApplication.files.map(item =>
            this.newForm("file", formID++, item.title, item.order)
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

    if (!this.props.loggedUser) this.props.history.push("/club");
  };

  newForm = (type, id, title, order, choices = null) => {
    let newForm = {
      id: id,
      type: type,
      title: title,
      choices: choices,
      order: order
    };
    return newForm;
  };

  shortText = props => {
    return (
      <Card style={{ margin: "10px" }} key={props.id}>
        <Card.Header>{props.title}</Card.Header>
        <Card.Body>
          <div style={{ height: "20px" }}></div>
        </Card.Body>
      </Card>
    );
  };

  longText = props => {
    return (
      <Card style={{ margin: "10px" }} key={props.id}>
        <Card.Header>{props.title}</Card.Header>
        <Card.Body>
          <div style={{ height: "100px" }}></div>
        </Card.Body>
      </Card>
    );
  };

  multiChoice = props => {
    let choices = props.choices
      .filter(item => !item.isDeleted)
      .map((item, index) => {
        return (
          <div key={index}>
            {index === 0 ? "" : <hr />}
            <input
              type="checkbox"
              style={{ marginRight: "10px" }}
              checked={item.checked}
              onChange={() => {}}
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
          <img src={imagePNG} width="120" height="120" alt="" />
        </Card.Body>
      </Card>
    );
  };

  file = props => {
    return (
      <Card style={{ margin: "10px" }} key={props.id}>
        <Card.Header>{props.title}</Card.Header>
        <Card.Body style={{ textAlign: "center" }}>
          <img src={filePNG} width="120" height="120" alt="" />
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
          return <></>;
      }
    });

    return (
      <div>
        <Header />
        <Container style={{ marginLeft: "16%" }}>
          <Card>
            <Card.Header>
              <Row>
                <Col>
                  <div className="form-save-button" style={{ margin: "10px" }}>
                    {(this.props.selectedClub
                      ? this.props.selectedClub.name
                      : "") + " 지원하기"}{" "}
                  </div>
                </Col>
                <Col style={{ textAlign: "right" }}>
                  <div
                    className="form-save-button"
                    style={{ margin: "10px" }}
                    onClick={this.saveApplicationFormHandler}
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
                  height: "700px",
                  marginTop: "10px"
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
    selectedApplication: state.club.selectedApplication
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getClubByID: id => dispatch(actionCreators.getClubByID(id)),
    getApplicationByID: id => dispatch(actionCreators.getApplicationByID(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ApplyMain));
