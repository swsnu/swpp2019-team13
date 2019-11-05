import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import "react-circular-progressbar/dist/styles.css";
import img1 from "../components/1.jpg";
import img2 from "../components/2.png";
import img3 from "../components/3.png";
import * as actionCreators from "../store/actions/index";
class ClubCard extends React.Component {
  componentDidMount() {
    this.props.getTagList();
  }
  render() {
    let club = this.props.club;
    let image = (
      <img
        src={"/media/" + club.fields.poster_img}
        width="100"
        height="100"
        alt=""
      />
    );
    if (club.auth_img_file === "1")
      image = <img src={img1} width="100" height="100" alt="" />;
    if (club.auth_img_file === "2")
      image = <img src={img2} width="100" height="100" alt="" />;
    if (club.auth_img_file === "3")
      image = <img src={img3} width="100" height="100" alt="" />;

    console.log(club.fields.tags);
    let tagList;
    if (this.props.tags.length != 0) {
      console.log(this.props.tags);
      tagList = club.fields.tags.map(item => (
        <Button key={item} variant="outline-primary">
          {"#" + this.props.tags[item - 1].name}
        </Button>
      ));
    }
    return (
      <Card
        onClick={() => {
          this.props.clickHandler(club.pk);
        }}
      >
        <Card.Body>
          <Container>
            <Row>
              <Col xs="5">{image}</Col>
              <Col>
                <Row>
                  <h2>{club.fields.name}</h2>
                  <Col md={{ offset: 1 }}>
                    <h4>{"👍 " + club.fields.likes}</h4>
                  </Col>
                </Row>
                <Row>{tagList}</Row>
                <br />
                <Row>{club.fields.summary}</Row>
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
  return {
    getTagList: () => dispatch(actionCreators.getTagList())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClubCard));
