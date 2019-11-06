import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreators from "../store/actions/index";
import * as userActions from "../store/actions/user";

import { Container, Row, Col, Modal, Button } from "react-bootstrap";

class ClubDetail extends React.Component {
  componentDidMount() {
    this.props.getTagList();
    if (this.props.loggedUser) {
      this.props.onGetLikedClubs(this.props.loggedUser);
    }
  }
  onClickLikeButton = () => {
    let newLikedClub = this.props.club;
    // if (
    //   this.props.likedClubs.filter(item => item.id === this.props.club.id)
    //     .length > 0
    // )
    //   newLikedClub.likes = newLikedClub.likes - 1;
    // else newLikedClub.likes = newLikedClub.likes + 1;

    // this.props.increaseLikesOfClub(newLikedClub);
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
              {this.props.loggedUser && (
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
              )}
            </Container>
          </Modal.Body>
        </Modal>
      );
    } else return <></>;
  }
}

const mapStateToProps = state => {
  return {
    tags: state.tag.tags,
    loggedUser: state.user.loggedUser,
    likedClubs: state.user.likedClubs
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
      dispatch(actionCreators.addAppliedClub(newAppliedClub, user)),

    onGetLikedClubs: user => dispatch(userActions.getLikedClubs(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClubDetail));
