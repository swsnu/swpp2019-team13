import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button, Card } from "react-bootstrap";
import SomoimDetail from "../components/SomoimDetail";
import * as userActions from "../store/actions/user";

class JoinedSomoimTab extends Component {
  state = { somoimDetailShow: false, selectedSomoimID: null };

  componentDidMount() {
    if (this.props.loggedUser) {
      this.props.onGetJoinedSomoims(this.props.loggedUser);
    }
  }

  render() {
    let list = null;
    if (this.props.joinedSomoims) {
      list = this.props.joinedSomoims.map((item, idx) => {
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
              onClick={e => {
                if (e.target.className === "card-body") {
                  this.setState({
                    ...this.state,
                    somoimDetailShow: true,
                    selectedSomoimID: item.id
                  });
                }
              }}
            >
              {item.title}
            </Card.Body>
          </Card>
        );
      });
    }
    return (
      <div>
        {list}
        <SomoimDetail
          show={this.state.somoimDetailShow}
          somoim={
            this.props.somoims.filter(
              a => a.id === this.state.selectedClubID
            )[0]
          }
          closeHandler={() => {
            this.setState({
              ...this.state,
              somoimDetailShow: false
            });
          }}
          forceRender={Math.random()}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    somoims: state.somoim.somoims,
    joinedSomoims: state.user.joinedSomoims
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetJoinedSomoims: user => dispatch(userActions.getJoinedSomoims(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(JoinedSomoimTab));
