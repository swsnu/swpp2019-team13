import React from "react";

import { Modal, Button } from "react-bootstrap";

class ClubModal extends React.Component {
  state = {
    isShow: true
  };
  render() {
    return (
      <Modal show={this.state.isShow} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.content}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Like</Button>
          <Button variant="primary">Apply</Button>
          <Button variant="primary">Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ClubModal;
