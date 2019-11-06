import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../store/actions/index";

import { Container, Row, Col, Modal, Button } from "react-bootstrap";

import img1 from "../components/1.jpg";
import img2 from "../components/2.png";
import img3 from "../components/3.png";

class ClubDetail extends React.Component {
  componentDidMount() {
    this.props.getTagList();
  }
  onClickLikeButton = () => {
    let newLikedClub = this.props.club;
    newLikedClub.likes = newLikedClub.likes + 1;

    this.props.increaseLikesOfClub(newLikedClub);
    this.props.addLikedClub(newLikedClub, this.props.loggedUser);
  };

  onClickApplyButton = () => {
    let newAppliedClub = this.props.club;
    this.props.addAppliedClub(newAppliedClub, this.props.loggedUser);
  };

  render() {
    let club = this.props.club;
    if (club) {
      let image = (
        <img
          src={"/media/" + club.poster_img}
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

      let tagList;
      if (this.props.tags.length != 0) {
        tagList = club.tags.map(item => (
          <Button key={item} variant="outline-primary">
            {"#" + this.props.tags[item - 1].name}
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
                    <h2>{club.name}</h2>
                    <Col md={{ offset: 1 }}>
                      <h4>
                        <span role="img" aria-label="thumb">
                          👍
                        </span>
                        {club.likes}
                      </h4>
                    </Col>
                  </Row>
                  <Row>{tagList}</Row>
                  <br />
                  <Row>{club.description}</Row>
                </Col>
              </Row>
              <br />
              <br />
              <Row>
                <Col></Col>
                <Col>
                  <Button onClick={this.onClickLikeButton} size="lg">
                    좋아요!{" "}
                    <span role="img" aria-label="thumb">
                      👍
                    </span>
                  </Button>
                </Col>
                <Col></Col>
                <Col>
                  <Button onClick={this.onClickApplyButton} size="lg">
                    지원하기
                  </Button>
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
    loggedUser: state.user.loggedUser,
    tags: state.tag.tags
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTagList: () => dispatch(actionCreators.getTagList()),
    increaseLikesOfClub: newLikedClub =>
      dispatch(actionCreators.increaseLikesOfClub(newLikedClub)),
    addLikedClub: (newLikedClub, user) =>
      dispatch(actionCreators.addLikedClub(newLikedClub, user)),
    addAppliedClub: (newAppliedClub, user) =>
      dispatch(actionCreators.addAppliedClub(newAppliedClub, user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClubDetail));
