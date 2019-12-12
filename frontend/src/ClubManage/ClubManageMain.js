import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Container, Row, Col, Button, Card, Accordion } from "react-bootstrap";

import Header from "../Header/Header";

import * as actionCreators from "../store/actions/index";
import ClubInfoTab from "./ClubInfoTab";
import ApplicationFormTab from "./ApplicationFormTab";
import ApplicantTab from "./ApplicantTab";

import "./ClubManageMain.css";

class ClubManageMain extends Component {
  state = {
    tab: 1,
    isUserInfoLoaded: false
  };

  componentDidMount() {
    this.props.getCategoryList();
    this.props.getTagList();
    this.props.getDeptList();
    this.props.getMajorList();
    this.props.getClubByID(this.props.match.params.club_id);
  }

  componentDidUpdate = () => {};

  render() {
    let tab = null;
    switch (this.state.tab) {
      case 0:
        tab = <ClubInfoTab />;
        break;
      case 1:
        tab = <ApplicationFormTab />;
        break;
      case 2:
        tab = <ApplicantTab />;
        break;
      default:
        tab = null;
    }

    return (
      <div className="clubManageMain">
        <Header />
        <Container>
          <Row>
            <Col sm="2">
              <div className="ClubManageSideBar">
                <Accordion>
                  {this.state.tab === 0 ? (
                    <Accordion.Toggle
                      style={{ marginBottom: "5px", marginTop: "13px" }}
                      as={Button}
                      id="clubmanage-main-clubinfo-button"
                      variant="secondary"
                      size="lg"
                      block
                      eventKey="0"
                      onClick={() => {
                        this.setState({ ...this.state, tab: 0 });
                      }}
                    >
                      동아리 정보
                    </Accordion.Toggle>
                  ) : (
                    <Accordion.Toggle
                      style={{ marginBottom: "5px", marginTop: "13px" }}
                      as={Button}
                      id="clubmanage-main-clubinfo-button"
                      variant="outline-secondary"
                      size="lg"
                      block
                      eventKey="0"
                      onClick={() => {
                        this.setState({ ...this.state, tab: 0 });
                      }}
                    >
                      동아리 정보
                    </Accordion.Toggle>
                  )}
                  {this.state.tab === 1 ? (
                    <Accordion.Toggle
                      style={{ marginBottom: "5px", marginTop: "13px" }}
                      as={Button}
                      id="clubmanage-main-applicationform-button"
                      variant="secondary"
                      size="lg"
                      block
                      eventKey="1"
                      onClick={() => {
                        this.setState({ ...this.state, tab: 1 });
                      }}
                    >
                      지원서 양식 수정
                    </Accordion.Toggle>
                  ) : (
                    <Accordion.Toggle
                      style={{ marginBottom: "5px", marginTop: "13px" }}
                      as={Button}
                      id="clubmanage-main-applicationform-button"
                      variant="outline-secondary"
                      size="lg"
                      block
                      eventKey="1"
                      onClick={() => {
                        this.setState({ ...this.state, tab: 1 });
                      }}
                    >
                      지원서 양식 수정
                    </Accordion.Toggle>
                  )}
                  {this.state.tab === 2 ? (
                    <Accordion.Toggle
                      style={{ marginBottom: "5px", marginTop: "13px" }}
                      as={Button}
                      id="clubmanage-main-applicantstatus-button"
                      variant="secondary"
                      size="lg"
                      block
                      eventKey="2"
                      onClick={() => {
                        this.setState({ ...this.state, tab: 2 });
                      }}
                    >
                      지원자 목록
                    </Accordion.Toggle>
                  ) : (
                    <Accordion.Toggle
                      style={{ marginBottom: "5px", marginTop: "13px" }}
                      as={Button}
                      id="clubmanage-main-applicantstatus-button"
                      variant="outline-secondary"
                      size="lg"
                      block
                      eventKey="2"
                      onClick={() => {
                        this.setState({ ...this.state, tab: 2 });
                      }}
                    >
                      지원자 목록
                    </Accordion.Toggle>
                  )}
                </Accordion>
              </div>
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
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    getCategoryList: () => dispatch(actionCreators.getCategoryList()),
    getTagList: () => dispatch(actionCreators.getTagList()),
    getDeptList: () => dispatch(actionCreators.getDeptList()),
    getMajorList: () => dispatch(actionCreators.getMajorList()),
    getClubByID: id => dispatch(actionCreators.getClubByID(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ClubManageMain));
