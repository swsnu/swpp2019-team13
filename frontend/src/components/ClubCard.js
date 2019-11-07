import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { Card, Button, Container, Row, Col } from "react-bootstrap";
import * as actionCreators from "../store/actions/index";

import like_before_img from "../images/like_before.png";
import like_after_img from "../images/like_after.png";

class ClubCard extends React.Component {
  componentDidMount() {
    this.props.getTagList();
  }
  render() {
    let club = this.props.club;
    let image = (
      <img src={"/media/" + club.poster_img} width="100" height="100" alt="" />
    );

    let tagList;
    if (this.props.tags.length != 0) {
      tagList = club.tags.map(item => (
        <Button key={item} variant="secondary" style={{ marginRight: "5px" }}>
          {"#" + this.props.tags[item - 1].name}
        </Button>
      ));
    }
    return (
      <Card
        style={{ height: "150px", margin: "10px" }}
        onClick={() => {
          this.props.clickHandler(club.id);
        }}
      >
        <Card.Body>
          <Container>
            <Row>
              <Col xs="4" style={{ paddingTop: "2%" }}>
                {image}
              </Col>
              <Col>
                <Row>
                  <div>
                    <h2
                      style={{ display: "inline-block", paddingRight: "30px" }}
                    >
                      {club.name}
                    </h2>
                    <h3 style={{ display: "inline-block" }}>
                      {"👍 " + club.likes}
                    </h3>
                    <img
                      src={like_before_img}
                      width="20px"
                      style={{ display: "inline-block" }}
                    />
                  </div>
                </Row>
                <Row>{tagList}</Row>
                <br />
                <Row>{club.summary}</Row>
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
