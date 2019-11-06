import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button, Card } from "react-bootstrap";
import ClubDetail from "../components/ClubDetail";
import * as userActions from "../store/actions/user";

class ManagingClubTab extends Component {
  state = { clubDetailShow: false, selectedClub: null };

  componentDidMount() {
    if (this.props.loggedUser) {
      this.props.onGetManagingClubs(this.props.loggedUser);
    }
  }

  render() {
    let list = null;
    if (this.props.managingClubs) {
      list = this.props.managingClubs.map((item, idx) => {
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
                    clubDetailShow: true,
                    selectedClub: item
                  });
                }
              }}
            >
              {item.name}
            </Card.Body>
          </Card>
        );
      });
    }
    return (
      <div>
        {list}
        <ClubDetail
          show={this.state.clubDetailShow}
          club={this.state.selectedClub}
          closeHandler={() => {
            this.setState({
              ...this.state,
              clubDetailShow: false
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
    managingClubs: state.user.managingClubs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetManagingClubs: user => dispatch(userActions.getManagingClubs(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ManagingClubTab));
