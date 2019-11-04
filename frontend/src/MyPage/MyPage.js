import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Container, Row, Col, Button, Card, Accordion } from "react-bootstrap";

import Header from "../components/Header";
import SelfInfoTab from "./SelfInfoTab";

class MyPage extends Component {
  state = {
    tab: 0
  };

  render() {
    let loggedUserName = null;
    let loggedUserEmail = null;
    let loggedUserPassword = null;
    let loggedUserDeptID = null;
    let loggedUserDeptName = null;
    let loggedUserMajorID = null;
    let loggedUserMajorName = null;
    let loggedUserGrade = null;
    let loggedUserAvailableSemester = null;

    /* 로그인된 user는 this.props.loggedUser에 저장되어 있습니다. */
    // ㄴ Store 중 user Store에, loggedUser 라는 이름으로 저장되어 있는 것을 가져오게 됩니다.
    // ㄴ 로그인 되어 있지 않은 경우, null 이 저장되어 있습니다.
    if (this.props.loggedUser) {
      loggedUserName = this.props.loggedUser.username;
      loggedUserEmail = this.props.loggedUser.email;
      loggedUserPassword = this.props.loggedUser.password;
      loggedUserDeptID = this.props.loggedUser.dept;
      loggedUserMajorID = this.props.loggedUser.major;
      loggedUserGrade = this.props.loggedUser.grade;
      loggedUserAvailableSemester = this.props.loggedUser.availableSemester;

      // this.props.loggedUser.dept에는 ID가 저장되어 있으므로, 다음과 같이 단과대 명을 불러올 수 있습니다 */
      if (this.props.depts) {
        loggedUserDeptName = this.props.depts[loggedUserDeptID].name;
        // const selectedDept = this.props.depts.filter(dept => {
        //   return dept.id === loggedUserDeptID;
        // });
        // if (selectedDept.length !== 0)
        //   loggedUserDeptName = selectedDept[0].name;
      }

      // this.props.loggedUser.major에는 ID가 저장되어 있으므로, 다음과 같이 전공 명을 불러올 수 있습니다 */
      if (this.props.majors) {
        loggedUserMajorName = this.props.majors[loggedUserMajorID].name;
        // const selectedMajor = this.props.majors.filter(major => {
        //   return major.id === loggedUserMajorID;
        // });
        // if (selectedMajor.length !== 0)
        //   loggedUserMajorName = selectedMajor[0].name;
      }
    }

    let tab = null;
    switch (this.state.tab) {
      case 0:
        tab = <SelfInfoTab />;
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
                      지원한 소모임
                    </Button>
                  </div>
                </Accordion.Collapse>
              </Accordion>
            </Col>
            <Col>
              <Card style={{ marginBottom: "5px", marginTop: "13px" }}>
                {tab}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedUser: state.user.loggedUser,
    depts: state.deptname.deptnames,
    majors: state.major.majors
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MyPage));
