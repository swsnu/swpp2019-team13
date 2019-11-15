import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Modal, Button, Form } from "react-bootstrap";
import { ImageSelectPreview } from "react-image-select-pv";

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

  // onChangeHandler = event => {
  //   if (
  //     // import from utils/CheckUploadedFile
  //     maxSelectFile(event) &&
  //     checkMimeType(event, 3) &&
  //     checkFileSize(event)
  //   ) {
  //     let file_urls = [];
  //     for (let x = 0; x < event.target.files.length; x++) {
  //       file_urls.push(URL.createObjectURL(event.target.files[x]));
  //     }
  //     this.setState({
  //       auth_img_file: file_urls,
  //       loaded: 0
  //     });
  //   }
  // };

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
            <Form.Row>
              <Form.Label>인증 사진 첨부</Form.Label>
            </Form.Row>
            <Form.Row>
              <div>
                <ImageSelectPreview
                  id="auth-img-input"
                  imageTypes="png|jpg|gif"
                  onChange={data => {
                    this.imgUploadHandler(data);
                  }}
                  max={1}
                />
              </div>
            </Form.Row>
            <Button
              letiant="primary"
              onClick={() => {
                //   this.props.postClub(
                //     this.state.name,
                //     this.state.clubmanager,
                //     this.state.auth_img_file,
                //     this.state.selected_category
                //   );
                alert("Create Club Success!");
                this.props.closeHandler();
              }}
              disabled={this.state.name === "" || this.state.clubmanager === ""}
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
