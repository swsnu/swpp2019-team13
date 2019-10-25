import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";

class Login extends Component {
  state = {
    email: "",
    password: "",
    isLoggedIn: false,
    wrongInput: false
  };

  onClick_LoginButton_Handler = () => {
    this.setState({ ...this.state, wrongInput: true });
  };

  onExit_LoginModal_Handler = () => {
    this.setState({
      ...this.state,
      email: "",
      password: "",
      wrongInput: false
    });
  };

  render() {
    return (
      <div className="Login">
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
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          onExited={this.onExit_LoginModal_Handler}
          style={{ opacity: 1 }}
          size="sm"
          centered
        >
          <Modal.Header variant="login-modal-header">
            <Modal.Title style={{ fontSize: "1.5em" }}>로그인</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
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
            {this.state.wrongInput ? (
              <div style={{ color: "red" }}>
                Email or Password is wrong, try again
              </div>
            ) : (
              <div></div>
            )}
          </Modal.Body>
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
