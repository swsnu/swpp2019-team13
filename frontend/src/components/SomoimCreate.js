import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";

import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import NumericInput from "react-numeric-input";

import * as actionCreaters from "../store/actions/index";

class SomoimCreate extends React.Component {
  state = {
    title: "",
    description: "",
    goal_number: 0,
    selected_dept: [false, false, false, false, false, false, false],
    available_sem: 1
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
                <Form.Control
                  value={this.state.title}
                  onChange={event =>
                    this.setState({ title: event.target.value })
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group>
              <Form.Label>설명</Form.Label>
              <Form.Control
                as="textarea"
                rows="10"
                type="number"
                value={this.state.description}
                onChange={event =>
                  this.setState({ description: event.target.value })
                }
              />
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                목표 인원 수
              </Form.Label>
              <Col sm="8">
                <NumericInput
                  min={0}
                  max={100}
                  value={this.state.goal_number}
                  onChange={event => {
                    if (event < 0) this.setState({ goal_number: 0 });
                    else if (event > 100) this.setState({ goal_number: 100 });
                    else this.setState({ goal_number: event });
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group>
              <Form.Label>가능 단과대학</Form.Label>
              {this.dept_name_list.map((a, i) => {
                return (
                  <Form.Check
                    key={a}
                    inline
                    type={"checkbox"}
                    label={a}
                    checked={this.state.selected_dept[i]}
                    value={a}
                    onChange={event => {
                      let new_selected_dept = this.state.selected_dept;
                      new_selected_dept[i] = event.target.checked;
                      this.setState({ selected_dept: new_selected_dept });
                    }}
                  />
                );
              })}
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                최소 활동 학기 수
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  as="select"
                  onChange={event =>
                    this.setState({
                      available_sem: Number(event.target.value)
                    })
                  }
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(a => {
                    return (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    );
                  })}
                </Form.Control>
              </Col>
            </Form.Group>
            <Button
              variant="primary"
              onClick={this.props.postSomoim(
                this.state.title,
                this.state.description,
                this.state.goal_number,
                this.state.selected_dept,
                this.state.available_sem
              )}
            >
              Confirm
            </Button>
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
    postSomoim: (
      title,
      description,
      goal_number,
      selected_dept,
      available_sem
    ) =>
      dispatch(
        actionCreaters.postSomoim({
          title: title,
          description: description,
          goal_number: goal_number,
          selected_dept: selected_dept,
          available_sem: available_sem
        })
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SomoimCreate));
