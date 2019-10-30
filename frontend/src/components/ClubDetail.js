import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Card, Container, Row, Col, Modal, Button } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import img1 from "../components/1.jpg";
import img2 from "../components/2.png";
import img3 from "../components/3.png";
class ClubDetail extends React.Component {
  render() {
    let club = this.props.club;
    if (club) {
      let image = <img src={club.auth_img_file} width="100" height="100" />;
      if (club.auth_img_file == "1")
        image = <img src={img1} width="100" height="100" />;
      if (club.auth_img_file == "2")
        image = <img src={img2} width="100" height="100" />;
      if (club.auth_img_file == "3")
        image = <img src={img3} width="100" height="100" />;
      let tagList = club.tag.map(item => (
        <Button key={item} variant="outline-primary">
          {"#" + this.props.tags[item].name}
        </Button>
      ));
      return (
        <Modal
          show={this.props.show}
          onHide={this.props.closeHandler}
          style={{ opacity: 1 }}
        >
          <Modal.Body>
            <Container>
              <Row>
                <Col>{image}</Col>
                <Col>
                  <Row>
                    <h2>{club.name}</h2>
                    <Col md={{ offset: 1 }}>
                      <h4>{"👍 " + club.likes}</h4>
                    </Col>
                  </Row>
                  <Row>{tagList}</Row>
                  <br />
                  <Row>{club.content}</Row>
                </Col>
              </Row>
              <br />
              <br />
              <Row>
                <Col></Col>
                <Col>
                  <Button size="lg">👍 Like!</Button>
                </Col>
                <Col></Col>
                <Col>
                  <Button size="lg">Join!</Button>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      );
    } else return <></>;
  }
}

const mapStateToProps = state => {
  return {
    tags: state.tag.tags
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClubDetail));
