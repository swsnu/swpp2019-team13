import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";

class Login extends Component {
  state = {
    email: "",
    password: "",
    isLoggedIn: false,
    wrongInput: false
  };

  /* 로그인 버튼을 클릭했을 때 동작 */
  onClick_LoginButton_Handler = () => {
    this.setState({ ...this.state, wrongInput: true });
  };

  /* Modal에서 나갔을 때 동작 */
  onExit_LoginModal_Handler = () => {
    this.setState({
      ...this.state,
      email: "",
      password: "",
      wrongInput: false
    });
  };

  /* Render */
  render() {
    return (
      <div className="Login">
        {/* CSS for React-Bootstrap */}
        <style type="text/css">
          {`
              .btn-dark {
                  font-weight: bold;
                  font-size: 0.9em;
                  background-color: #a456d8;
                  border: 2px solid #a456d8;
              }
              .modal-sm {
                  font-size: 13px;
              }
              `}
        </style>

        {/* 로그인 Modal */}
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          onExited={this.onExit_LoginModal_Handler}
          style={{ opacity: 1 }}
          size="sm"
          centered
        >
          {/* 로그인 Modal Header */}
          <Modal.Header variant="login-modal-header">
            <Modal.Title style={{ fontSize: "1.5em" }}>로그인</Modal.Title>
          </Modal.Header>

          {/* 로그인 Modal Body */}
          <Modal.Body>
            <Form>
              {/* 유저 정보를 입력받는다 */}
              {/* 이메일 입력 칸 */}
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  size="lg"
                  type="email"
                  placeholder="Enter email"
                  onChange={event =>
                    this.setState({ email: event.target.value })
                  }
                />
              </Form.Group>
              {/* 비밀번호 입력 칸 */}
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  size="lg"
                  type="password"
                  placeholder="Password"
                  onChange={event =>
                    this.setState({ password: event.target.value })
                  }
                />
              </Form.Group>
            </Form>
            {/* 유저 정보가 잘못되었을 때 오류 메시지를 보여준다. */}
            {this.state.wrongInput ? (
              <div style={{ color: "red" }}>
                Email or Password is wrong, try again
              </div>
            ) : (
              <div></div>
            )}
          </Modal.Body>

          {/* 로그인 Modal Footer */}
          <Modal.Footer>
            <Button
              variant="dark"
              size="lg"
              onClick={this.onClick_LoginButton_Handler}
            >
              로그인 &#x2713;
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Login;
