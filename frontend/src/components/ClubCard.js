import React from "react";

import { withRouter } from "react-router";
import { Modal, Button } from "react-bootstrap";

// TODO
// 1. Implement Like Button and save in server
// 2. Get ID for club

class ClubCard extends React.Component {
  state = {
    showModal: false
  };

  close = () => {
    this.setState({ showModal: false });
  };

  open = () => {
    this.setState({ showModal: true });
  };

  render() {
    let id = 0;

    return (
      <div>
        <h2>{this.props.title}</h2>
        {this.props.content}
        <Button onClick={this.open}>Show Detail</Button>

        <Modal
          show={this.state.showModal}
          onHide={this.close}
          animation={false}
          backdrop={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>{this.props.content}</h3>
            <hr />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
            <Button>Like</Button>
            <Button
              onClick={() => this.props.history.push("/club/apply/" + id)}
            >
              Apply
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withRouter(ClubCard);
