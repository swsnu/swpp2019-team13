import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Container, Row, Col, Button, Card, Accordion } from "react-bootstrap";

import Header from "../components/Header";
import SelfInfoTab from "./SelfInfoTab";
import ManagingClubTab from "./ManagingClubTab";
import LikedClubTab from "./LikedClubTab";
import AppliedClubTab from "./AppliedClubTab";
import ManagingSomoimTab from "./ManagingSomoimTab";
import LikedSomoimTab from "./LikedSomoimTab";
import JoinedSomoimTab from "./JoinedSomoimTab";

import * as actionCreators from "../store/actions/index";

class MyPage extends Component {
  state = {
    tab: 0,
    isUserInfoLoaded: false
  };

  componentDidMount() {
    this.props.getClubList();
    this.props.getSomoimList();

    this.props.getCategoryList();
    this.props.getTagList();
    this.props.getDeptList();
    this.props.getMajorList();
  }

  componentDidUpdate = () => {
    if (this.props.loggedUser && !this.state.isUserInfoLoaded) {
      this.setState({ ...this.state, isUserInfoLoaded: true });

      this.props.onGetManagingClubs(this.props.loggedUser);
      this.props.onGetLikedClubs(this.props.loggedUser);
      this.props.onGetAppliedClubs(this.props.loggedUser);
      this.props.onGetManagingSomoims(this.props.loggedUser);
      this.props.onGetLikedSomoims(this.props.loggedUser);
      this.props.onGetJoinedSomoims(this.props.loggedUser);
    }
  };

  render() {
    let tab = null;
    switch (this.state.tab) {
      case 0:
        tab = <SelfInfoTab />;
        break;
      case 1:
        tab = <ManagingClubTab />;
        break;
      case 2:
        tab = <LikedClubTab />;
        break;
      case 3:
        tab = <AppliedClubTab />;
        break;
      case 4:
        tab = <ManagingSomoimTab />;
        break;
      case 5:
        tab = <LikedSomoimTab />;
        break;
      case 6:
        tab = <JoinedSomoimTab />;
        break;
      default:
        tab = null;
    }

    return (
      <div>
        <Header />
        <Container style={{ marginLeft: "16%" }}>
          <Row>
            <Col sm="2">
              <Accordion>
                <Accordion.Toggle
                  style={{ marginBottom: "5px", marginTop: "13px" }}
                  as={Button}
                  variant="outline-dark"
                  size="lg"
                  block
                  eventKey="0"
                  onClick={() => {
                    this.setState({ ...this.state, tab: 0 });
                  }}
                >
                  내 정보
                </Accordion.Toggle>
                {/* <Accordion.Collapse eventKey="0">
                  <Button></Button>
                </Accordion.Collapse> */}

                <Accordion.Toggle
                  style={{ marginBottom: "5px", marginTop: "13px" }}
                  as={Button}
                  variant="outline-dark"
                  size="lg"
                  block
                  eventKey="1"
                >
                  내 동아리
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <div>
                    <Button
                      style={{
                        width: "95%",
                        marginLeft: "5px"
                      }}
                      variant="outline-secondary"
                      size="md"
                      block
                      onClick={() => {
                        this.setState({ ...this.state, tab: 1 });
                      }}
                    >
                      동아리 관리
                    </Button>
                    <Button
                      style={{
                        width: "95%",
                        marginLeft: "5px"
                      }}
                      variant="outline-secondary"
                      size="md"
                      block
                      onClick={() => {
                        this.setState({ ...this.state, tab: 2 });
                      }}
                    >
                      좋아요한 동아리
                    </Button>

                    <Button
                      style={{
                        width: "95%",
                        marginLeft: "5px"
                      }}
                      variant="outline-secondary"
                      size="md"
                      block
                      onClick={() => {
                        this.setState({ ...this.state, tab: 3 });
                      }}
                    >
                      지원한 동아리
                    </Button>
                  </div>
                </Accordion.Collapse>

                <Accordion.Toggle
                  style={{ marginBottom: "5px", marginTop: "13px" }}
                  as={Button}
                  variant="outline-dark"
                  size="lg"
                  block
                  eventKey="2"
                >
                  내 소모임
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <div>
                    <Button
                      style={{
                        width: "95%",
                        marginLeft: "5px"
                      }}
                      variant="outline-secondary"
                      size="md"
                      block
                      onClick={() => {
                        this.setState({ ...this.state, tab: 4 });
                      }}
                    >
                      소모임 관리
                    </Button>
                    <Button
                      style={{
                        width: "95%",
                        marginLeft: "5px"
                      }}
                      variant="outline-secondary"
                      size="md"
                      block
                      onClick={() => {
                        this.setState({ ...this.state, tab: 5 });
                      }}
                    >
                      좋아요한 소모임
                    </Button>

                    <Button
                      style={{
                        width: "95%",
                        marginLeft: "5px"
                      }}
                      variant="outline-secondary"
                      size="md"
                      block
                      onClick={() => {
                        this.setState({ ...this.state, tab: 6 });
                      }}
                    >
                      참여한 소모임
                    </Button>
                  </div>
                </Accordion.Collapse>
              </Accordion>
            </Col>
            <Col>
              <Card style={{ marginBottom: "5px", marginTop: "13px" }}>
                <div style={{ margin: "10px" }}>{tab}</div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { loggedUser: state.user.loggedUser };
};

const mapDispatchToProps = dispatch => {
  return {
    getClubList: () => dispatch(actionCreators.getClubList()),
    getSomoimList: () => dispatch(actionCreators.getSomoimList()),

    getCategoryList: () => dispatch(actionCreators.getCategoryList()),
    getTagList: () => dispatch(actionCreators.getTagList()),
    getDeptList: () => dispatch(actionCreators.getDeptList()),
    getMajorList: () => dispatch(actionCreators.getMajorList()),

    onGetManagingClubs: user => dispatch(actionCreators.getManagingClubs(user)),
    onGetLikedClubs: user => dispatch(actionCreators.getLikedClubs(user)),
    onGetAppliedClubs: user => dispatch(actionCreators.getAppliedClubs(user)),
    onGetManagingSomoims: user =>
      dispatch(actionCreators.getManagingSomoims(user)),
    onGetLikedSomoims: user => dispatch(actionCreators.getLikedSomoims(user)),
    onGetJoinedSomoims: user => dispatch(actionCreators.getJoinedSomoims(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MyPage));
