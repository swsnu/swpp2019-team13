import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Modal, Button, Form } from "react-bootstrap";

class ClubRegister extends React.Component {
  state = {
    name: "",
    clubmanager: "",
    selected_category: 0,
    auth_img_file: null
  };

  UNSAFE_componentWillReceiveProps() {
    this.setState({
      name: "",
      clubmanager: "",
      selected_category: 0,
      auth_img_file: null
    });
  }

  checkMimeType = event => {
    let files = event.target.files;
    let err = [];
    const types = ["image/png", "image/jpeg", "image/gif"];
    for (let x = 0; x < files.length; x++) {
      if (types.every(type => files[x].type !== type)) {
        err[x] = files[x].type + " is not a supported format\n";
      }
    }
    for (let z = 0; z < err.length; z++) {
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
    for (let x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = files[x].name + " is too large, please pick a smaller file\n";
      }
    }
    for (let z = 0; z < err.length; z++) {
      alert(err[z]);
      event.target.value = null;
    }
    return true;
  };

  onChangeHandler = event => {
    if (
      this.maxSelectFile(event) &&
      this.checkMimeType(event) &&
      this.checkFileSize(event)
    ) {
      let file_urls = [];
      for (let x = 0; x < event.target.files.length; x++) {
        file_urls.push(URL.createObjectURL(event.target.files[x]));
      }
      this.setState({
        auth_img_file: file_urls,
        loaded: 0
      });
    }
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.closeHandler}
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
                id="club-name-input"
                value={this.state.name}
                onChange={event => this.setState({ name: event.target.value })}
              />
            </Form.Group>
            <Form.Label>분야</Form.Label>
            <Form.Control
              as="select"
              id="club-category-input"
              onChange={event =>
                this.setState({
                  selected_category: Number(event.target.value)
                })
              }
            >
              {this.props.categories.map(a => {
                return (
                  <option key={a.id} value={a.name}>
                    {a.name}
                  </option>
                );
              })}
            </Form.Control>
            <Form.Group controlId="formClubManager">
              <Form.Label>Club Manager</Form.Label>
              <Form.Control
                type="manager"
                placeholder="Enter Club Manger Name"
                className="club-manager-input"
                value={this.state.clubmanager}
                onChange={event =>
                  this.setState({ clubmanager: event.target.value })
                }
              />
            </Form.Group>
            <div>
              <label>동아리 인증사진 첨부</label>
              <input
                type="file"
                id="club-auth-file-input"
                multiple
                onChange={this.onChangeHandler}
              />
            </div>
            <Button
              letiant="primary"
              // onClick={() => {
              //   this.props.postClub(
              //     this.state.name,
              //     this.state.clubmanager,
              //     this.state.auth_img_file,
              //     this.state.selected_category
              //   );
              //   alert("Create Club Success!");
              //   this.props.closeHandler();
              // }}
            >
              Register
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // postClub: (name, clubmanager, auth_img_file, selected_category) =>
    //   dispatch(
    //     actionCreaters.postClub({
    //       name: name,
    //       clubmanager: clubmanager,
    //       auth_img_file: auth_img_file,
    //       selected_category: selected_category
    //     })
    //   )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClubRegister));
