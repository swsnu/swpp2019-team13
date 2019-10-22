import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";

import { Modal, Button, Form, InputGroup, Col, Row } from "react-bootstrap";

import * as actionCreaters from "../store/actions/index";

class SomoimCreate extends React.Component {
  state = {
    title: "",
    description: "",
    goal_number: 0,
    selected_dept: [],
    available_sem: 0
  };

  dept_name_list = [
    "공대",
    "인문대",
    "사회대",
    "농대",
    "생활대",
    "음대",
    "미대"
  ];

  render() {
    return (
      <Modal
        show={this.props.showSomoimCreateModal}
        onHide={this.props.handleModal}
        animation={false}
        backdrop={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>새로운 소모임 만들기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="formBasicEmail">
              <Form.Label column sm="4">
                이름
              </Form.Label>
              <Col sm="8">
                <Form.Control />
              </Col>
            </Form.Group>
            <Form.Group>
              <Form.Label>설명</Form.Label>
              <Form.Control as="textarea" rows="10" />
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                목표 인원 수
              </Form.Label>
              <Col sm="8">
                <Form.Control />
              </Col>
            </Form.Group>
            <Form.Group>
              <Form.Label>가능 단과대학</Form.Label>
              {this.dept_name_list.map(a => {
                return <Form.Check inline type={"checkbox"} label={a} />;
              })}
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                최소 활동 학기 수
              </Form.Label>
              <Col sm="8">
                <Form.Control />
              </Col>
            </Form.Group>
            <Button variant="primary">Confirm</Button>
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SomoimCreate));
