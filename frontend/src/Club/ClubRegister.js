import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { ImageSelectPreview } from "react-image-select-pv";

import * as actionCreators from "../store/actions/index";

import "./ClubRegister.css";

class ClubRegister extends React.Component {
  state = {
    name: "",
    clubmanager: "",
    selected_category: 1,
    auth_img_file: null
  };

  UNSAFE_componentWillReceiveProps() {
    this.setState({
      name: "",
      clubmanager: "",
      selected_category: 1,
      auth_img_file: null
    });
  }

  render() {
    return (
      <div className="ClubRegister">
        {/* CSS for React-Bootstrap */}
        <style type="text/css">
          {`
              .btn-dark {
                  font-weight: bold;
                  font-size: 1.4em;
                  background-color: #a456d8;
                  border: 2px solid #a456d8;
              }
              `}
        </style>
        <Modal
          show={this.props.show}
          onHide={this.props.closeHandler}
          style={{ opacity: 1 }}
        >
          <Modal.Header>
            <Modal.Title>
              <h2 className="clubRegisterTitle">동아리 등록 신청</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>
                  <h3>동아리 이름</h3>
                </Form.Label>
                <Form.Control
                  type="clubname"
                  placeholder="Enter club name"
                  id="club-name-input"
                  size="lg"
                  value={this.state.name}
                  onChange={event =>
                    this.setState({ name: event.target.value })
                  }
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>
                      <h3>분야</h3>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      id="club-category-input"
                      size="lg"
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
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formClubManager">
                    <Form.Label>
                      <h3>동아리 관리자</h3>
                    </Form.Label>
                    <Form.Control
                      type="manager"
                      placeholder="Enter Club Manger Name"
                      className="club-manager-input"
                      size="lg"
                      value={this.state.clubmanager}
                      onChange={event =>
                        this.setState({ clubmanager: event.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>
                  <h3>인증 사진 첨부</h3>
                </Form.Label>
                <div>
                  <ImageSelectPreview
                    id="auth-img-input"
                    imageTypes="png|jpg|gif"
                    onChange={data => {
                      this.setState({ auth_img_file: data[0].blob });
                    }}
                    max={1}
                  />
                </div>
              </Form.Group>
              <Button
                variant="dark"
                id="confirm-create-button"
                block
                size="lg"
                onClick={() => {
                  this.props.postPreClub({
                    name: this.state.name,
                    manager: this.state.clubmanager,
                    auth_img: this.state.auth_img_file,
                    category: this.state.selected_category
                  });
                  alert("Create Club Success!");
                  this.props.closeHandler();
                }}
                disabled={
                  this.state.name === "" ||
                  this.state.clubmanager === "" ||
                  this.state.auth_img_file === null
                }
              >
                동아리 등록 신청
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
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
    postPreClub: preclub => dispatch(actionCreators.postPreClub(preclub))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClubRegister));
