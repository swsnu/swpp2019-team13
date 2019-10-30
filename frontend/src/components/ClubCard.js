import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import img1 from "../components/1.jpg";
import img2 from "../components/2.png";
import img3 from "../components/3.png";
class ClubCard extends React.Component {
  render() {
    let club = this.props.club;
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
      <Card
        onClick={() => {
          this.props.clickHandler(club.id);
        }}
      >
        <Card.Body>
          <Container>
            <Row>
              <Col xs="5">{image}</Col>
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
          </Container>
        </Card.Body>
      </Card>
    );
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
)(withRouter(ClubCard));
