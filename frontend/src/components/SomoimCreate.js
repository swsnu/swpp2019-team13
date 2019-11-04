import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";

import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";
import NumericInput from "react-numeric-input";

import * as actionCreaters from "../store/actions/index";

class SomoimCreate extends React.Component {
  state = {
    title: "",
    summary: "",
    description: "",
    goal_number: 1,
    selected_dept: [],
    available_sem: 1
  };

  // componentWillReceiveProps renamed into below name
  UNSAFE_componentWillReceiveProps() {
    this.setState({
      title: "",
      summary: "",
      description: "",
      goal_number: 1,
      selected_dept: [],
      available_sem: 1
    });
  }

  render() {
    return (
      <Modal
        className="SomoimCreate"
        show={this.props.show}
        onHide={this.props.closeHandler}
        animation={false}
        backdrop={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>새로운 소모임 만들기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Form.Label column sm="4">
                이름
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  id="somoim-title-input"
                  value={this.state.title}
                  onChange={event =>
                    this.setState({ title: event.target.value })
                  }
                />
              </Col>
            </Row>
            <Row>
              <Form.Label>Summary</Form.Label>
            </Row>
            <Row>
              <Form.Control
                as="textarea"
                rows="3"
                id="somoim-summary-input"
                value={this.state.summary}
                onChange={event =>
                  this.setState({ summary: event.target.value })
                }
              />
            </Row>
            <Row>
              <Form.Label>구체적인 설명</Form.Label>
            </Row>
            <Row>
              <Form.Control
                as="textarea"
                rows="10"
                id="somoim-description-input"
                value={this.state.description}
                onChange={event =>
                  this.setState({ description: event.target.value })
                }
              />
            </Row>
            <Row>
              <Form.Label column sm="4">
                목표 인원 수
              </Form.Label>
              <Col sm="8">
                <NumericInput
                  id="somoim-goalnumber-input"
                  min={1}
                  max={100}
                  value={this.state.goal_number}
                  onChange={event => {
                    if (event < 1) this.setState({ goal_number: 1 });
                    else if (event > 100) this.setState({ goal_number: 100 });
                    else this.setState({ goal_number: event });
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Form.Label>분야</Form.Label>
              <Form.Control
                as="select"
                id="somoim-category-input"
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
            </Row>
            <Row>
              <Form.Label>가능 단과대학</Form.Label>
            </Row>
            <Row>
              {this.props.depts.map(a => {
                return (
                  <Form.Check
                    key={a.id}
                    id="somoim-dept-checkbox"
                    inline
                    type={"checkbox"}
                    label={a.name}
                    checked={this.state.selected_dept.includes(a.id)}
                    value={a.id}
                    onChange={event => {
                      let new_selected_dept = this.state.selected_dept;
                      // if list have id, pop
                      if (new_selected_dept.includes(a.id)) {
                        new_selected_dept = new_selected_dept.filter(
                          b => b !== a.id
                        );
                      }
                      // if list don't have id, push
                      else {
                        new_selected_dept.push(a.id);
                      }
                      this.setState({ selected_dept: new_selected_dept });
                    }}
                  />
                );
              })}
            </Row>
            <Row>
              <Form.Label column sm="4">
                최소 활동 학기 수
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  id="somoim-available-semester-input"
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
            </Row>
            <Row>
              <Button
                id="confirm-create-somoim-button"
                variant="primary"
                onClick={() => {
                  this.props.postSomoim(
                    this.state.title,
                    this.state.summary,
                    this.state.description,
                    this.state.goal_number,
                    this.state.selected_dept,
                    this.state.available_sem
                  );
                  alert("Create Somoim Success!");
                  this.props.closeHandler();
                }}
              >
                Confirm
              </Button>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    depts: state.dept.depts,
    categories: state.category.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postSomoim: (
      title,
      summary,
      description,
      goal_number,
      selected_dept,
      available_sem
    ) =>
      dispatch(
        actionCreaters.postSomoim({
          title: title,
          summary: summary,
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
