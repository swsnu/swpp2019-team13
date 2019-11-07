import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button, Card } from "react-bootstrap";
import ClubDetail from "../components/ClubDetail";
import * as userActions from "../store/actions/user";

class LikedClubTab extends Component {
  state = { clubDetailShow: false, selectedClubID: null };

  componentDidMount() {
    if (this.props.loggedUser) {
      this.props.onGetLikedClubs(this.props.loggedUser);
    }
  }

  render() {
    let list = null;
    if (this.props.likedClubs) {
      list = this.props.likedClubs.map((item, idx) => {
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
                    selectedClubID: item.id
                  });
                }
              }}
            >
              <h1>{item.name}</h1>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {item.summary}
              <Button
                onClick={() => {
                  this.props.addLikedClub(item, this.props.loggedUser);
                }}
              >
                Unlike
              </Button>
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
          club={this.props.clubs[this.state.selectedClubID - 1]}
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
    clubs: state.club.clubs,
    likedClubs: state.user.likedClubs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetLikedClubs: user => dispatch(userActions.getLikedClubs(user)),
    addLikedClub: (club, user) => dispatch(userActions.addLikedClub(club, user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LikedClubTab));
