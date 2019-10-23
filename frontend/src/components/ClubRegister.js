import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";

import { Modal, Button, Form } from "react-bootstrap";

import * as actionCreaters from "../store/actions/index";

class ClubRegister extends React.Component {
  state = {
    name: "",
    clubmanager: "",
    selected_category: 0,
    auth_img_file: null
  };

  category_list = [
    "학술매체분과",
    "취미교양분과",
    "연행예술분과",
    "인권봉사분과",
    "무예운동분과",
    "종교분과",
    "운동부"
  ];

  checkMimeType = event => {
    let files = event.target.files;
    let err = [];
    const types = ["image/png", "image/jpeg", "image/gif"];
    for (var x = 0; x < files.length; x++) {
      if (types.every(type => files[x].type !== type)) {
        err[x] = files[x].type + " is not a supported format\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      alert(err[z]);
      event.target.value = null;
    }
    return true;
  };
  maxSelectFile = event => {
    let files = event.target.files;
    if (files.length > 3) {
      const msg = "Only 3 images can be uploaded at a time";
      event.target.value = null;
      alert(msg);
      return false;
    }
    return true;
  };
  checkFileSize = event => {
    let files = event.target.files;
    let size = 2000000;
    let err = [];
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = files[x].type + "is too large, please pick a smaller file\n";
      }
    }
    for (var z = 0; z < err.length; z++) {
      alert(err[z]);
      event.target.value = null;
    }
    return true;
  };

  onChangeHandler = event => {
    var files = event.target.files;
    if (
      this.maxSelectFile(event) &&
      this.checkMimeType(event) &&
      this.checkFileSize(event)
    ) {
      this.setState({
        auth_img_file: files,
        loaded: 0
      });
    }
  };

  render() {
    return (
      <Modal
        show={this.props.showClubRegisterModal}
        onHide={this.props.handleModal}
        animation={false}
        backdrop={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Register Club</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Club Name</Form.Label>
              <Form.Control
                type="clubname"
                placeholder="Enter club name"
                value={this.state.name}
                onChange={event => this.setState({ name: event.target.value })}
              />
            </Form.Group>
            <Form.Label>분야</Form.Label>
            <Form.Control
              as="select"
              onChange={event =>
                this.setState({
                  selected_category: Number(event.target.value)
                })
              }
            >
              {this.category_list.map((a, i) => {
                return (
                  <option key={a} value={i}>
                    {a}
                  </option>
                );
              })}
            </Form.Control>
            <Form.Group controlId="formClubManager">
              <Form.Label>Club Manager</Form.Label>
              <Form.Control
                type="manager"
                placeholder="Enter Club Manger Name"
                value={this.state.clubmanager}
                onChange={event =>
                  this.setState({ clubmanager: event.target.value })
                }
              />
            </Form.Group>
            <div className="form-group files">
              <label>동아리 인증사진 첨부</label>
              <input
                type="file"
                className="form-control"
                multiple
                onChange={this.onChangeHandler}
              />
            </div>
            <Button variant="primary">Register</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    postClub: (title, content, tag) =>
      dispatch(
        actionCreaters.postClub({
          title: title,
          content: content,
          tag: tag
        })
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClubRegister));
