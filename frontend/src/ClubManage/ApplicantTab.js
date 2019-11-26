import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import ReactDragList from "react-drag-list";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import * as actionCreators from "../store/actions/index";

class ApplicantTab extends Component {
  state = {};

  componentDidMount() {
    this.props.getDeptList();
    this.props.getMajorList();
    this.props.getUserList();
    this.props.getApplicationList(this.props.match.params.club_id);
  }

  render() {
    let list = null;
    if (
      this.props.applicationList &&
      this.props.users &&
      this.props.users.length > 0 &&
      this.props.depts &&
      this.props.depts.length > 0 &&
      this.props.majors &&
      this.props.majors.length > 0
    ) {
      list = this.props.applicationList.map((item, idx) => {
        let user = this.props.users.filter(
          item_user => item_user.id === item.user
        )[0];
        console.log(user);
        // return <></>;
        let dept = this.props.depts.filter(
          item_dept => item_dept.id === user.dept
        )[0];
        let major = this.props.majors.filter(
          item_major => item_major.id === user.major
        )[0];

        return (
          <Card
            size="lg"
            key={idx}
            border="primary"
            style={{
              textAlign: "left",
              marginTop: "10px",
              marginBottom: "10px"
            }}
          >
            <Card.Body
              id="list-item-body"
              onClick={e => {
                this.setState({
                  ...this.state,
                  detailShow: true
                });
              }}
            >
              <h1>{user.id}</h1>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {dept.name}
              {major.name}
            </Card.Body>
          </Card>
        );
      });
    }
    return <div>{list}</div>;
  }
}

const mapStateToProps = state => {
  return {
    depts: state.dept.depts,
    majors: state.major.majors,
    users: state.user.users,
    applicationList: state.club.applicationList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDeptList: () => dispatch(actionCreators.getDeptList()),
    getMajorList: () => dispatch(actionCreators.getMajorList()),
    getUserList: () => dispatch(actionCreators.getUserList()),
    getApplicationList: id => dispatch(actionCreators.getApplicationList(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ApplicantTab));
