import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import "react-circular-progressbar/dist/styles.css";

import img1 from "../components/1.jpg";
import img2 from "../components/2.png";
import img3 from "../components/3.png";
import axios from "axios";
class ClubDetail extends React.Component {
  state = {
    tagnameList: []
  };
  componentDidMount() {
    axios.get("/api/tag/list/").then(
      response => {
        console.log(response.data);
        this.setState({
          ...this.state,
          tagnameList: response.data
        });
      },
      error => {
        console.log(error);
      }
    );
  }
  render() {
    let club = this.props.club;
    if (club) {
      let image = (
        <img
          src={"/media/" + club.fields.poster_img}
          width="100"
          height="100"
          alt=""
        />
      );
      console.log(club.fields.tags);
      /*
      if (club.auth_img_file === "1")
        image = <img src={img1} width="100" height="100" alt="" />;
      if (club.auth_img_file === "2")
        image = <img src={img2} width="100" height="100" alt="" />;
      if (club.auth_img_file === "3")
        image = <img src={img3} width="100" height="100" alt="" />;
        */
      let tagList;
      if (this.state.tagnameList) {
        tagList = club.fields.tags.map(item => (
          <Button key={item} variant="outline-primary">
            {"#" + this.state.tagnameList[item - 1].name}
          </Button>
        ));
      }
      return (
        <Modal
          show={this.props.show}
          onHide={this.props.closeHandler}
          style={{ opacity: 1 }}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col>{image}</Col>
                <Col>
                  <Row>
                    <h2>{club.fields.name}</h2>
                    <Col md={{ offset: 1 }}>
                      <h4>
                        <span role="img" aria-label="thumb">
                          👍
                        </span>
                        {club.fields.likes}
                      </h4>
                    </Col>
                  </Row>
                  <Row>{tagList}</Row>
                  <br />
                  <Row>{club.fields.description}</Row>
                </Col>
              </Row>
              <br />
              <br />
              <Row>
                <Col></Col>
                <Col>
                  <Button size="lg">
                    <span role="img" aria-label="thumb">
                      👍
                    </span>
                    Like!
                  </Button>
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
