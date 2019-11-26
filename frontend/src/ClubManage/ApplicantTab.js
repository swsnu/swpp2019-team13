import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import ReactDragList from "react-drag-list";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import * as actionCreators from "../store/actions/index";

class ApplicantTab extends Component {
  state = {};

  componentDidMount() {
    this.props.getUserList();
    this.props.getApplicationList(this.props.match.params.club_id);
  }

  render() {
    let list = null;
    if (
      this.props.applicationList &&
      this.props.users &&
      this.props.users.length > 0
    ) {
      console.log(this.props.applicationList);
      list = this.props.applicationList.map((item, idx) => {
        let user = this.props.users.filter(
          item_user => item_user.id === item.user
        )[0];
        console.log(user);
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
              <h1>{user.name}</h1>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {user.major}
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
    users: state.user.users,
    applicationList: state.club.applicationList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserList: () => dispatch(actionCreators.getUserList()),
    getApplicationList: id => dispatch(actionCreators.getApplicationList(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ApplicantTab));
